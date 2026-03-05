/**
 * Log market order prices (realtime from WebSocket) to log/market-prices.log and to terminal. Throttled.
 */

import { existsSync, mkdirSync, appendFileSync } from "fs";
import { resolve } from "path";
import { logger, shortId } from "../logger";

const LOG_DIR = resolve(process.cwd(), "log");
const PRICE_LOG_FILE = resolve(LOG_DIR, "market-prices.log");
const THROTTLE_MS = 2000;

let lastLogTs = 0;

function ensureLogDir(): void {
  if (!existsSync(LOG_DIR)) mkdirSync(LOG_DIR, { recursive: true });
}

export function logMarketPrices(
  conditionId: string,
  upTokenId: string,
  downTokenId: string,
  upPrice: number,
  downPrice: number
): void {
  const now = Date.now();
  if (now - lastLogTs < THROTTLE_MS) return;
  lastLogTs = now;
  logger.price(`market order price  Up=${upPrice.toFixed(2)}  Down=${downPrice.toFixed(2)}`);
  try {
    ensureLogDir();
    const line = `[${new Date().toISOString()}] conditionId=${shortId(conditionId)} up_ask=${upPrice.toFixed(4)} down_ask=${downPrice.toFixed(4)}\n`;
    appendFileSync(PRICE_LOG_FILE, line);
  } catch (_) {}
}
