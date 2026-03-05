import { resolve } from "path";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: resolve(process.cwd(), ".env") });

function parseNum(value: string | undefined, defaultVal: number): number {
  if (value === undefined || value === "") return defaultVal;
  const n = parseFloat(value);
  return Number.isNaN(n) ? defaultVal : n;
}

/** Parse window seconds from slug suffix: -5m -> 300, -15m -> 900, -1h -> 3600 */
export function getWindowSecondsFromSlug(slugPrefix: string): number {
  const s = (slugPrefix || "").trim().toLowerCase();
  if (s.endsWith("-5m")) return 300;
  if (s.endsWith("-15m")) return 900;
  if (s.endsWith("-1h")) return 3600;
  return parseNum(process.env.POLYMARKET_WINDOW_SECONDS, 900);
}

export function maskAddress(addr: string): string {
  if (!addr || addr.length < 12) return "***";
  return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
}

export const tradingEnv = {
  get PRIVATE_KEY(): string | undefined {
    return process.env.PRIVATE_KEY;
  },
  get CHAIN_ID(): number {
    return parseNum(process.env.CHAIN_ID, 137);
  },
  get CLOB_API_URL(): string {
    return process.env.CLOB_API_URL || "https://clob.polymarket.com";
  },
  get PROXY_WALLET_ADDRESS(): string {
    return process.env.PROXY_WALLET_ADDRESS || "";
  },
  get RPC_URL(): string | undefined {
    return process.env.RPC_URL;
  },
  get RPC_TOKEN(): string | undefined {
    return process.env.RPC_TOKEN;
  },
  get TICK_SIZE(): "0.01" | "0.1" {
    const v = process.env.TICK_SIZE;
    return v === "0.1" ? "0.1" : "0.01";
  },
  get NEG_RISK(): boolean {
    return process.env.NEG_RISK === "true";
  },
  get ENABLE_WIN_BOT(): boolean {
    return process.env.ENABLE_WIN_BOT !== "false";
  },
  get ENABLE_AUTO_REDEEM(): boolean {
    return process.env.ENABLE_AUTO_REDEEM !== "false";
  },
  get POLYMARKET_SLUG_PREFIX(): string {
    return process.env.POLYMARKET_SLUG_PREFIX || process.env.POLYMARKET_EVENT_SLUG || "";
  },
  get BUY_TRIGGER_PRICE(): number {
    return parseNum(process.env.BUY_TRIGGER_PRICE, 0.55);
  },
  /** Don't buy if price is above this (e.g. 0.95). */
  get MAX_BUY_PRICE(): number {
    return parseNum(process.env.MAX_BUY_PRICE, 0.95);
  },
  get STOP_LOSS_PRICE(): number {
    return parseNum(process.env.STOP_LOSS_PRICE, 0.35);
  },
  get PROFIT_LOCK_PRICE(): number {
    return parseNum(process.env.PROFIT_LOCK_PRICE, 0.99);
  },
  get BUY_AMOUNT_USD(): number {
    return parseNum(process.env.BUY_AMOUNT_USD, 5);
  },
  /** Extra % above reported price for buy (so FAK crosses spread). e.g. 0.03 = 3% */
  get BUY_PRICE_BUFFER(): number {
    return parseNum(process.env.BUY_PRICE_BUFFER, 0.03);
  },
  get POLL_INTERVAL_MS(): number {
    return parseNum(process.env.POLL_INTERVAL_MS, 2000);
  },
  get APPROVE_INTERVAL_MINUTES(): number {
    return parseNum(process.env.APPROVE_INTERVAL_MINUTES, 5);
  },
};

export function getRpcUrl(chainId: number): string {
  if (tradingEnv.RPC_URL) {
    const url = tradingEnv.RPC_URL.trim();
    if (url.startsWith("wss://")) return url.replace(/^wss:\/\//, "https://");
    if (url.startsWith("ws://")) return url.replace(/^ws:\/\//, "http://");
    return url;
  }
  if (chainId === 137) {
    if (tradingEnv.RPC_TOKEN) return `https://polygon-mainnet.g.alchemy.com/v2/${tradingEnv.RPC_TOKEN}`;
    return "https://polygon-mainnet.g.alchemy.com/v2/Ag-cC4rPDzO7TbKw3Uaqj";
  }
  if (chainId === 80002) {
    if (tradingEnv.RPC_TOKEN) return `https://polygon-amoy.g.alchemy.com/v2/${tradingEnv.RPC_TOKEN}`;
    return "https://rpc-amoy.polygon.technology";
  }
  throw new Error(`Unsupported chain ID: ${chainId}`);
}
