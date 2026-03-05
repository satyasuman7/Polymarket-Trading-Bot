/**
 * Auto-redeem resolved markets for win-bot holdings. Logs to file only (no MongoDB).
 */

import { redeemMarket, isMarketResolved } from "../utils/redeem";
import { getAllHoldings, clearMarketHoldings } from "../utils/holdings";
import { tradingEnv } from "../config/env";
import { logger, shortId } from "../logger";
import { getEventSlug } from "../utils/file-store";
import { existsSync, mkdirSync, appendFileSync } from "fs";
import { resolve } from "path";

const REDEEM_INTERVAL_MS = 160 * 1000;
const LOG_DIR = resolve(process.cwd(), "log");
const REDEEMS_LOG_FILE = resolve(LOG_DIR, "redeems.log");

function logRedeem(line: string): void {
  try {
    if (!existsSync(LOG_DIR)) mkdirSync(LOG_DIR, { recursive: true });
    appendFileSync(REDEEMS_LOG_FILE, `[${new Date().toISOString()}] ${line}\n`);
  } catch (_) {}
}

async function checkAndRedeemPositions(): Promise<void> {
  if (!tradingEnv.ENABLE_AUTO_REDEEM) return;
  if (!tradingEnv.PRIVATE_KEY || !tradingEnv.PROXY_WALLET_ADDRESS) return;

  const holdings = getAllHoldings();
  const marketIds = Object.keys(holdings);
  if (marketIds.length === 0) return;

  for (const conditionId of marketIds) {
    const tokens = holdings[conditionId];
    const totalAmount = Object.values(tokens).reduce((sum, amt) => sum + amt, 0);

    try {
      const { isResolved, winningIndexSets } = await isMarketResolved(conditionId);
      if (!isResolved) continue;

      logger.redeem(`${shortId(conditionId)} resolved, winning: ${winningIndexSets?.join(", ")}`);

      try {
        await redeemMarket(conditionId);
        const eventSlug = await getEventSlug(conditionId);
        logRedeem(`REDEEM conditionId=${shortId(conditionId)} eventSlug=${eventSlug ?? ""} tokensRedeemed=${totalAmount} payoutUsd=${totalAmount}`);
        clearMarketHoldings(conditionId);
        logger.ok(`Redeemed ${shortId(conditionId)}`);
      } catch (redeemError) {
        const errorMsg = redeemError instanceof Error ? redeemError.message : String(redeemError);
        if (
          errorMsg.includes("don't hold any winning tokens") ||
          errorMsg.includes("You don't have any tokens")
        ) {
          clearMarketHoldings(conditionId);
        } else {
          logger.error(`Redemption failed: ${errorMsg}`);
        }
      }
    } catch (error) {
      logger.error(error instanceof Error ? error.message : String(error));
    }
  }
}

export function startAutoRedeemService(): void {
  if (!tradingEnv.ENABLE_AUTO_REDEEM) return;
  if (!tradingEnv.PRIVATE_KEY || !tradingEnv.PROXY_WALLET_ADDRESS) {
    logger.skip("Auto-redeem: trading credentials not set");
    return;
  }
  logger.ok(`Auto-redeem started (${REDEEM_INTERVAL_MS / 1000}s)`);
  checkAndRedeemPositions();
  setInterval(() => {
    checkAndRedeemPositions().catch((err) => logger.error("Auto-redeem error", err));
  }, REDEEM_INTERVAL_MS);
}
