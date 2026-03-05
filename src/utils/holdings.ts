import { readFileSync, writeFileSync, existsSync, mkdirSync, appendFileSync } from "fs";
import { resolve } from "path";

export interface TokenHoldings {
  [marketId: string]: { [tokenId: string]: number };
}

const HOLDINGS_FILE = resolve(process.cwd(), "src/data/token-holding.json");
const LOG_DIR = resolve(process.cwd(), "log");
const HOLDINGS_LOG_FILE = resolve(LOG_DIR, "holdings-redeem.log");

function ensureLogDir(): void {
  if (!existsSync(LOG_DIR)) mkdirSync(LOG_DIR, { recursive: true });
}

function logToHoldingsFile(line: string): void {
  try {
    ensureLogDir();
    appendFileSync(HOLDINGS_LOG_FILE, `[${new Date().toISOString()}] ${line}\n`);
  } catch (_) {}
}

export function loadHoldings(): TokenHoldings {
  if (!existsSync(HOLDINGS_FILE)) return {};
  try {
    return JSON.parse(readFileSync(HOLDINGS_FILE, "utf-8")) as TokenHoldings;
  } catch {
    return {};
  }
}

export function saveHoldings(holdings: TokenHoldings): void {
  const dir = resolve(process.cwd(), "src/data");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(HOLDINGS_FILE, JSON.stringify(holdings, null, 2));
}

export function addHoldings(marketId: string, tokenId: string, amount: number): void {
  const holdings = loadHoldings();
  if (!holdings[marketId]) holdings[marketId] = {};
  if (!holdings[marketId][tokenId]) holdings[marketId][tokenId] = 0;
  holdings[marketId][tokenId] += amount;
  saveHoldings(holdings);
  logToHoldingsFile(`HOLDINGS_ADD conditionId=${marketId} tokenId=${tokenId} amount=${amount}`);
}

/** Reduce holdings (e.g. after sell). Returns actual amount reduced. */
export function reduceHoldings(marketId: string, tokenId: string, amount: number): number {
  const holdings = loadHoldings();
  if (!holdings[marketId]?.[tokenId]) return 0;
  const current = holdings[marketId][tokenId];
  const reduce = Math.min(amount, current);
  if (reduce <= 0) return 0;
  holdings[marketId][tokenId] = current - reduce;
  if (holdings[marketId][tokenId] === 0) delete holdings[marketId][tokenId];
  if (Object.keys(holdings[marketId]).length === 0) delete holdings[marketId];
  saveHoldings(holdings);
  logToHoldingsFile(`HOLDINGS_REDUCE conditionId=${marketId} tokenId=${tokenId} amount=${reduce}`);
  return reduce;
}

export function getAllHoldings(): TokenHoldings {
  return loadHoldings();
}

export function clearMarketHoldings(marketId: string): void {
  const holdings = loadHoldings();
  if (holdings[marketId]) {
    delete holdings[marketId];
    saveHoldings(holdings);
    logToHoldingsFile(`HOLDINGS_CLEAR conditionId=${marketId}`);
  }
}

export function getHoldings(marketId: string, tokenId: string): number {
  const holdings = loadHoldings();
  return holdings[marketId]?.[tokenId] ?? 0;
}
