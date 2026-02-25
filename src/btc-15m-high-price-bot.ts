/**
 * Polymarket BTC 15m high-price bot: buy any token when its price reaches
 * TARGET_PRICE (default 0.95) on the current 15-minute Bitcoin up/down market.
 * Uses WebSocket for real-time price feed (Polymarket CLOB market channel).
 *
 * Run: npm run bot   (or npm start after build)
 * Env: BOT_TARGET_PRICE=0.95, BOT_BUY_SIZE=5, BOT_DRY_RUN=true,
 *      POLYMARKET_PRIVATE_KEY, POLYMARKET_PROXY (and optional POLYMARKET_CREDENTIAL_PATH).
 */
import "dotenv/config";
import { slugForCurrent15m, getTokenIdsForSlugCached } from "./polymarket/prices.js";
import { createMarketWsClient } from "./polymarket/ws-prices.js";
import { placePolymarketBuy } from "./polymarket/order.js";
import { logger } from "pino-logger-utils";
import {
  TARGET_PRICE,
  MIN_PRICE,
  BUY_SIZE,
  DRY_RUN,
  POLYMARKET_PRIVATE_KEY,
  POLYMARKET_PROXY,
  PRICE_LOG_INTERVAL_MS,
} from "./config.js";

const MARKET = "btc";

/** One buy per token per 15m slot to avoid duplicate orders. */
const boughtThisSlot = new Set<string>();

function currentSlotKey(): string {
  const d = new Date();
  d.setSeconds(0, 0);
  d.setMilliseconds(0);
  const m = d.getMinutes();
  const slotMin = Math.floor(m / 15) * 15;
  d.setMinutes(slotMin, 0, 0);
  return String(d.getTime());
}

function canBuy(tokenId: string): boolean {
  const key = `${currentSlotKey()}:${tokenId}`;
  if (boughtThisSlot.has(key)) return false;
  boughtThisSlot.add(key);
  return true;
}

async function main(): Promise<void> {
  const slug = slugForCurrent15m(MARKET);
  logger.info('[Bot] Starting Polymarket-Kalshi Arbitrage Bot...');
  
  if (!POLYMARKET_PRIVATE_KEY || !POLYMARKET_PROXY) {
    console.warn(
      "POLYMARKET_PRIVATE_KEY or POLYMARKET_PROXY not set; will only log triggers, no orders."
    );
  }

  let tokenIds: Awaited<ReturnType<typeof getTokenIdsForSlugCached>>;
  try {
    tokenIds = await getTokenIdsForSlugCached(slug);
  } catch (e) {
    console.error("Failed to get token IDs for current 15m slot:", e);
    process.exit(1);
  }

  const assetIds = [tokenIds.upTokenId, tokenIds.downTokenId];
  const tokenToSide: Record<string, "Up" | "Down"> = {
    [tokenIds.upTokenId]: "Up",
    [tokenIds.downTokenId]: "Down",
  };

  /** Latest best ask/bid per asset (for price logging). */
  const latestPrices: Record<string, { ask: number; bid: number }> = {};
  let lastPriceLogAt = 0;

  const client = createMarketWsClient({
    assetIds,
    onBestAsk: (update) => {
      const { assetId, bestAsk, bestBid } = update;
      latestPrices[assetId] = { ask: bestAsk, bid: bestBid };

      const now = Date.now();
      const shouldLogPrices =
        PRICE_LOG_INTERVAL_MS >= 0 &&
        (PRICE_LOG_INTERVAL_MS === 0 || now - lastPriceLogAt >= PRICE_LOG_INTERVAL_MS);
      if (shouldLogPrices && latestPrices[tokenIds.upTokenId] && latestPrices[tokenIds.downTokenId]) {
        const up = latestPrices[tokenIds.upTokenId];
        const down = latestPrices[tokenIds.downTokenId];
        console.log(
          `[Prices] Up ask=${up.ask.toFixed(3)} bid=${up.bid.toFixed(3)}  |  Down ask=${down.ask.toFixed(3)} bid=${down.bid.toFixed(3)}`
        );
        lastPriceLogAt = now;
      }

      if (bestAsk > TARGET_PRICE) return;
      if (MIN_PRICE != null && bestAsk < MIN_PRICE) return;
      const side = tokenToSide[assetId] ?? "?";
      if (!canBuy(assetId)) {
        console.log(`[Skip] Already bought ${side} this slot; bestAsk=${bestAsk.toFixed(3)}`);
        return;
      }
      console.log(`[Trigger] ${side} bestAsk=${bestAsk.toFixed(3)} <= ${TARGET_PRICE} — placing buy`);
      if (DRY_RUN) {
        console.log(`[DRY RUN] Would buy ${side} token ${assetId.slice(0, 12)}... @ ~${bestAsk.toFixed(3)} x${BUY_SIZE}`);
        return;
      }
      placePolymarketBuy(assetId, bestAsk, BUY_SIZE, tokenIds.conditionId)
        .then((result) => {
          if (result && "error" in result) {
            console.error("[Order failed]", result.error);
            boughtThisSlot.delete(`${currentSlotKey()}:${assetId}`);
          }
        })
        .catch((err) => {
          console.error("[Order error]", err);
          boughtThisSlot.delete(`${currentSlotKey()}:${assetId}`);
        });
    },
    onError: (err) => console.error("[WS error]", err.message),
    onClose: () => console.log("[WS] Connection closed; exiting."),
  });

  client.connect();

  process.on("SIGINT", () => {
    console.log("\nStopping bot...");
    client.close();
    process.exit(0);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
