/**
 * Polymarket Win Bot (lightweight — no Redis/MongoDB)
 * BTC/ETH/SOL/XRP 5m, 15m, 1h — switch via POLYMARKET_SLUG_PREFIX in .env.
 * Buy when winning token price > X; profit lock sell at 0.99; stop loss at Y; auto redeem; auto approve.
 * State in src/data/win-bot-state.json, logs in log/.
 */

import "dotenv/config";
import { PolymarketClient } from "./clients/polymarket";
import { WinMonitor } from "./services/win-monitor";
import { RealtimePriceService } from "./services/realtime-price-service";
import { startAutoRedeemService } from "./services/auto-redeem-service";
import { logMarketPrices } from "./services/price-logger";
import { createCredential } from "./security/createCredential";
import { runApprove } from "./security/allowance";
import { getClobClient } from "./providers/clobclient";
import { getProxyWalletBalanceUsd } from "./utils/balance";
import * as store from "./utils/file-store";
import { tradingEnv, getWindowSecondsFromSlug, maskAddress } from "./config/env";
import { logger as log } from "./logger";

const POLL_INTERVAL_MS = tradingEnv.POLL_INTERVAL_MS;
const APPROVE_INTERVAL_MS = tradingEnv.APPROVE_INTERVAL_MINUTES * 60 * 1000;

async function main(): Promise<void> {
  log.start("Polymarket Win Bot (light)");

  const polymarket = new PolymarketClient();
  let realtimePriceService: RealtimePriceService | null = null;

  try {
    const slugPrefix = tradingEnv.POLYMARKET_SLUG_PREFIX?.trim() || "";
    if (!slugPrefix) {
      log.warn("POLYMARKET_SLUG_PREFIX not set. Set in .env (e.g. btc-updown-5m, eth-updown-15m, xrp-updown-1h).");
    } else {
      const windowSec = getWindowSecondsFromSlug(slugPrefix);
      log.info(`Slug: ${slugPrefix}, window: ${windowSec}s`);
    }

    if (tradingEnv.PRIVATE_KEY) {
      await createCredential();
      try {
        log.info("Approving USDC allowance…");
        const clob = await getClobClient();
        await runApprove(clob);
        const { balanceUsd, allowanceUsd } = await getProxyWalletBalanceUsd(clob);
        const allowStr = allowanceUsd >= 1e20 ? "max" : allowanceUsd.toFixed(2);
        log.ok(`Balance $${balanceUsd.toFixed(2)}, allowance $${allowStr}`);
        const proxy = (tradingEnv.PROXY_WALLET_ADDRESS ?? "").trim();
        log.info(proxy ? `Trading: proxy ${maskAddress(proxy)}` : "Trading: EOA");
      } catch (err) {
        log.error("Trading init failed", err);
      }
    }

    realtimePriceService = new RealtimePriceService();
    realtimePriceService.setOnPriceUpdate(async (upTokenId, downTokenId, upPrice, downPrice) => {
      try {
        const state = await store.getWinState();
        await store.setWinState({
          ...(state || {}),
          upPrice,
          downPrice,
          upTokenId,
          downTokenId,
        });
        const conditionId = (state?.conditionId as string) || "";
        if (conditionId) logMarketPrices(conditionId, upTokenId, downTokenId, upPrice, downPrice);
      } catch (_) {}
    });

    const monitor = new WinMonitor(polymarket, realtimePriceService);
    startAutoRedeemService();

    const runCycle = async () => {
      try {
        await monitor.processCycle();
      } catch (err) {
        log.error("Cycle error", err);
      }
    };

    await runCycle();
    setInterval(runCycle, POLL_INTERVAL_MS);

    if (tradingEnv.PRIVATE_KEY && APPROVE_INTERVAL_MS > 0) {
      setInterval(async () => {
        try {
          const clob = await getClobClient();
          await runApprove(clob);
          log.info("Auto-approve: USDC allowance refreshed");
        } catch (err) {
          log.error("Auto-approve failed", err);
        }
      }, APPROVE_INTERVAL_MS);
    }

    log.ok(`Win bot running (poll ${POLL_INTERVAL_MS}ms, approve every ${tradingEnv.APPROVE_INTERVAL_MINUTES}min)`);
  } catch (err) {
    log.error("Failed to start", err);
    process.exit(1);
  }

  process.on("SIGINT", async () => {
    log.stop("Shutting down…");
    realtimePriceService?.shutdown();
    process.exit(0);
  });
}

main().catch((err) => {
  log.error("Fatal error", err);
  process.exit(1);
});
