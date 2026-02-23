#!/usr/bin/env bun
/**
 * Automated redemption script for resolved Polymarket markets
 * 
 * This script:
 * 1. Checks all markets in your holdings
 * 2. Identifies which markets are resolved
 * 3. Automatically redeems resolved markets
 * 
 * Usage:
 *   bun src/auto-redeem.ts                    # Check and redeem all resolved markets (from holdings file)
 *   bun src/auto-redeem.ts --api               # Fetch all markets from API and redeem winning positions
 *   bun src/auto-redeem.ts --dry-run          # Check but don't redeem (preview only)
 *   bun src/auto-redeem.ts --clear-holdings   # Clear holdings after successful redemption
 *   bun src/auto-redeem.ts --check <conditionId>  # Check if a specific market is resolved
 */

import { 
    autoRedeemResolvedMarkets, 
    isMarketResolved, 
    redeemMarket, 
    getUserTokenBalances,
    redeemAllWinningMarketsFromAPI 
} from "./utils/redeem";
import { getAllHoldings } from "./utils/holdings";
import { config } from "./config";

async function main() {
    const args = process.argv.slice(2);
    
    // Check for specific condition ID
    const checkIndex = args.indexOf("--check");
    if (checkIndex !== -1 && args[checkIndex + 1]) {
        const conditionId = args[checkIndex + 1];
        console.log(`[INFO] \n=== Checking Market Status ===`);
        console.log(`[INFO] Condition ID: ${conditionId}`);
        
        const { isResolved, market, reason, winningIndexSets } = await isMarketResolved(conditionId);
        
        if (isResolved) {
            console.log(`[SUCCESS] ✅ Market is RESOLVED and ready for redemption!`);
            console.log(`[INFO] Outcome: ${market?.outcome || "N/A"}`);
            if (winningIndexSets && winningIndexSets.length > 0) {
                console.log(`[INFO] Winning outcomes: ${winningIndexSets.join(", ")}`);
            }
            console.log(`[INFO] Reason: ${reason}`);
            
            // Check user's holdings
            try {
                const privateKey = config.privateKey;
                if (privateKey) {
                    const { Wallet } = await import("@ethersproject/wallet");
                    const wallet = new Wallet(privateKey);
                    const balances = await getUserTokenBalances(conditionId, await wallet.getAddress());
                    
                    if (balances.size > 0) {
                        console.log(`[INFO] \nYour token holdings:`);
                        for (const [indexSet, balance] of balances.entries()) {
                            const isWinner = winningIndexSets?.includes(indexSet);
                            const status = isWinner ? "✅ WINNER" : "❌ Loser";
                            console.log(`[INFO]   IndexSet ${indexSet}: ${balance.toString()} tokens ${status}`);
                        }
                        
                        const winningHeld = Array.from(balances.keys()).filter(idx => 
                            winningIndexSets?.includes(idx)
                        );
                        if (winningHeld.length > 0) {
                            console.log(`[SUCCESS] \nYou hold winning tokens! (IndexSets: ${winningHeld.join(", ")})`);
                        } else {
                            console.log(`[WARNING] \n⚠️  You don't hold any winning tokens for this market.`);
                        }
                    }
                }
            } catch (error) {
                // Ignore balance check errors
            }
            
            // Ask if user wants to redeem
            const shouldRedeem = args.includes("--redeem");
            if (shouldRedeem) {
                console.log(`[INFO] \nRedeeming market...`);
                try {
                    const receipt = await redeemMarket(conditionId);
                    console.log(`[SUCCESS] ✅ Successfully redeemed!`);
                    console.log(`[INFO] Transaction: ${receipt.transactionHash}`);
                } catch (error) {
                    console.log(`[ERROR] Failed to redeem: ${error instanceof Error ? error.message : String(error)}`);
                    process.exit(1);
                }
            } else {
                console.log(`[INFO] \nTo redeem this market, run:`);
                console.log(`[INFO]   bun src/auto-redeem.ts --check ${conditionId} --redeem`);
            }
        } else {
            console.log(`[WARNING] ❌ Market is NOT resolved`);
            console.log(`[INFO] Reason: ${reason}`);
        }
        return;
    }
    
    // Check for flags
    const dryRun = args.includes("--dry-run");
    const clearHoldings = args.includes("--clear-holdings");
    const useAPI = args.includes("--api");
    
    if (dryRun) {
        console.log(`[INFO] \n=== DRY RUN MODE: No actual redemptions will be performed ===\n`);
    }
    
    // Use API method if --api flag is set
    if (useAPI) {
        console.log(`[INFO] \n=== USING POLYMARKET API METHOD ===`);
        console.log(`[INFO] Fetching all markets from API and checking for winning positions...\n`);
        
        const maxMarkets = args.includes("--max") 
            ? parseInt(args[args.indexOf("--max") + 1]) || 1000
            : 1000;
        
        const result = await redeemAllWinningMarketsFromAPI({
            maxMarkets,
            dryRun,
        });
        
        // Print summary
        console.log(`[INFO] \n${"=".repeat(50)}`);
        console.log(`[INFO] API REDEMPTION SUMMARY`);
        console.log(`[INFO] ${"=".repeat(50)}`);
        console.log(`[INFO] Total markets checked: ${result.totalMarketsChecked}`);
        console.log(`[INFO] Markets where you have positions: ${result.marketsWithPositions}`);
        console.log(`[INFO] Resolved markets: ${result.resolved}`);
        console.log(`[INFO] Markets with winning tokens: ${result.withWinningTokens}`);
        
        if (dryRun) {
            console.log(`[INFO] Would redeem: ${result.withWinningTokens} market(s)`);
        } else {
            console.log(`[SUCCESS] Successfully redeemed: ${result.redeemed} market(s)`);
            if (result.failed > 0) {
                console.log(`[WARNING] Failed: ${result.failed} market(s)`);
            }
        }
        
        // Show detailed results for markets with winning tokens
        if (result.withWinningTokens > 0) {
            console.log(`[INFO] \nDetailed Results (Markets with Winning Tokens):`);
            for (const res of result.results) {
                if (res.hasWinningTokens) {
                    const title = res.marketTitle ? `"${res.marketTitle.substring(0, 50)}..."` : res.conditionId.substring(0, 20) + "...";
                    if (res.redeemed) {
                        console.log(`[SUCCESS]   ✅ ${title} - Redeemed`);
                    } else {
                        console.log(`[ERROR]   ❌ ${title} - Failed: ${res.error || "Unknown error"}`);
                    }
                }
            }
        }
        
        if (result.withWinningTokens === 0 && !dryRun) {
            console.log(`[INFO] \nNo resolved markets with winning tokens found.`);
        }
        
        return;
    }
    
    // Default: Use holdings file method
    console.log(`[INFO] \n=== USING HOLDINGS FILE METHOD ===`);
    
    // Get all holdings
    const holdings = getAllHoldings();
    const marketCount = Object.keys(holdings).length;
    
    if (marketCount === 0) {
        console.log(`[WARNING] No holdings found in token-holding.json. Nothing to redeem.`);
        console.log(`[INFO] \nOptions:`);
        console.log(`[INFO]   1. Holdings are tracked automatically when you place orders`);
        console.log(`[INFO]   2. Use --api flag to fetch all markets from Polymarket API instead`);
        console.log(`[INFO]      Example: bun src/auto-redeem.ts --api`);
        process.exit(0);
    }
    
    console.log(`[INFO] \nFound ${marketCount} market(s) in holdings`);
    console.log(`[INFO] Checking which markets are resolved...\n`);
    
    // Run auto-redemption
    const result = await autoRedeemResolvedMarkets({
        dryRun,
        clearHoldingsAfterRedeem: clearHoldings,
    });
    
    // Print summary
    console.log(`[INFO] \n${"=".repeat(50)}`);
    console.log(`[INFO] REDEMPTION SUMMARY`);
    console.log(`[INFO] ${"=".repeat(50)}`);
    console.log(`[INFO] Total markets checked: ${result.total}`);
    console.log(`[INFO] Resolved markets: ${result.resolved}`);
    
    if (dryRun) {
        console.log(`[INFO] Would redeem: ${result.resolved} market(s)`);
    } else {
        console.log(`[SUCCESS] Successfully redeemed: ${result.redeemed} market(s)`);
        if (result.failed > 0) {
            console.log(`[WARNING] Failed: ${result.failed} market(s)`);
        }
    }
    
    // Show detailed results
    if (result.resolved > 0 || result.failed > 0) {
        console.log(`[INFO] \nDetailed Results:`);
        for (const res of result.results) {
            if (res.isResolved) {
                if (res.redeemed) {
                    console.log(`[SUCCESS]   ✅ ${res.conditionId.substring(0, 20)}... - Redeemed`);
                } else {
                    console.log(`[ERROR]   ❌ ${res.conditionId.substring(0, 20)}... - Failed: ${res.error || "Unknown error"}`);
                }
            }
        }
    }
    
    if (result.resolved === 0 && !dryRun) {
        console.log(`[INFO] \nNo resolved markets found. All markets are either still active or not yet reported.`);
    }
}

main().catch((error) => {
    console.log(`[ERROR] Fatal error`, error);
    process.exit(1);
});

