/**
 * Config for Polymarket BTC 15m high-price bot.
 * Load with dotenv (see btc-15m-high-price-bot.ts).
 */
/** Buy when best ask <= this (we pay up to TARGET_PRICE). */
export const TARGET_PRICE = parseFloat(process.env.BOT_TARGET_PRICE ?? "0.95");
/** Optional: only buy when best ask >= this (avoid buying at 0.01 when other side is winning). Set e.g. 0.90 to buy only when price is "high". */
export const MIN_PRICE = process.env.BOT_MIN_PRICE ? parseFloat(process.env.BOT_MIN_PRICE) : null;
export const BUY_SIZE = Math.max(1, parseInt(process.env.BOT_BUY_SIZE ?? "5", 10));
export const DRY_RUN = process.env.BOT_DRY_RUN === "true" || process.env.BOT_DRY_RUN === "1";

export const POLYMARKET_PRIVATE_KEY = process.env.POLYMARKET_PRIVATE_KEY ?? "";
/** Proxy/funder address: POLYMARKET_PROXY or PROXY_WALLET_ADDRESS */
export const POLYMARKET_PROXY = process.env.POLYMARKET_PROXY ?? process.env.PROXY_WALLET_ADDRESS ?? "";
export const POLYMARKET_CLOB_URL = process.env.POLYMARKET_CLOB_URL ?? "https://clob.polymarket.com";
export const POLYMARKET_CHAIN_ID = parseInt(process.env.POLYMARKET_CHAIN_ID ?? "137", 10);
export const POLYMARKET_TICK_SIZE = (process.env.POLYMARKET_TICK_SIZE ?? "0.01") as "0.01" | "0.001" | "0.0001";
export const POLYMARKET_NEG_RISK = process.env.POLYMARKET_NEG_RISK === "true";
export const POLYMARKET_CREDENTIAL_PATH = process.env.POLYMARKET_CREDENTIAL_PATH ?? "";
export const POLYMARKET_SIGNATURE_TYPE = (() => {
  const raw = process.env.POLYMARKET_SIGNATURE_TYPE ?? "";
  if (raw === "0" || raw === "1" || raw === "2") return parseInt(raw, 10);
  return POLYMARKET_PROXY ? 2 : 1;
})();

export const WS_MARKET_URL = "wss://ws-subscriptions-clob.polymarket.com/ws/market";
export const PING_INTERVAL_MS = 10_000;

/** Log current Up/Down prices every N ms (0 = every WebSocket update). Default 1000. */
export const PRICE_LOG_INTERVAL_MS = parseInt(process.env.BOT_PRICE_LOG_INTERVAL_MS ?? "1000", 10);
