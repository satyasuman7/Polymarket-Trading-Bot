/**
 * Win bot trading: market buy when winning token > X; market sell at profit lock (0.99) or stop loss (Y).
 * Handles credential refresh on 401. Logs only (no MongoDB).
 */

import { OrderType, Side } from "@polymarket/clob-client";
import { getClobClient, invalidateClobClient, isCredentialError } from "../providers/clobclient";
import { createCredential, updateCredential } from "../security/createCredential";
import { addHoldings, reduceHoldings } from "../utils/holdings";
import { validateBuyOrderBalance } from "../utils/balance";
import { tradingEnv } from "../config/env";
import { logger, shortId } from "../logger";
import type { MarketInfo } from "../types";
import { existsSync, mkdirSync, appendFileSync } from "fs";
import { resolve } from "path";

const TICK_SIZE = tradingEnv.TICK_SIZE;
const NEG_RISK = tradingEnv.NEG_RISK;
const LOG_DIR = resolve(process.cwd(), "log");
const TRADE_LOG_FILE = resolve(LOG_DIR, "trades.log");

function ensureLogDir(): void {
  if (!existsSync(LOG_DIR)) mkdirSync(LOG_DIR, { recursive: true });
}

function logTrade(line: string): void {
  try {
    ensureLogDir();
    appendFileSync(TRADE_LOG_FILE, `[${new Date().toISOString()}] ${line}\n`);
  } catch (_) {}
}

function clampPrice(price: number): number {
  const t = parseFloat(TICK_SIZE);
  return Math.max(t, Math.min(1 - t, price));
}

/** Run a CLOB call without logging the library's "[CLOB Client] request error" to console. */
async function runWithoutClobRequestLog<T>(fn: () => Promise<T>): Promise<T> {
  const orig = console.error;
  console.error = (...args: unknown[]) => {
    const str = args.map((a) => String(a)).join(" ");
    if (/\[CLOB Client\]|request error/i.test(str)) return;
    orig.apply(console, args);
  };
  try {
    return await fn();
  } finally {
    console.error = orig;
  }
}

async function withCredentialRetry<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (isCredentialError(err)) {
      logger.warn("Credential error, refreshing…");
      invalidateClobClient();
      await updateCredential();
      if (!existsSync(resolve(process.cwd(), "src/data/credential.json"))) {
        await createCredential();
      }
      return fn();
    }
    throw err;
  }
}

export async function buyToken(
  tokenId: string,
  side: "Up" | "Down",
  amountUsd: number,
  marketInfo: MarketInfo
): Promise<boolean> {
  const privateKey = tradingEnv.PRIVATE_KEY;
  const proxyWallet = tradingEnv.PROXY_WALLET_ADDRESS;
  if (!privateKey || !proxyWallet) {
    logger.skip("Buy: PRIVATE_KEY or PROXY_WALLET_ADDRESS not set");
    return false;
  }

  return withCredentialRetry(async () => {
    try {
      const client = await getClobClient();
      let currentPrice: number;
      try {
        const priceResp = await client.getPrice(tokenId, "BUY");
        if (typeof priceResp === "number" && Number.isFinite(priceResp)) {
          currentPrice = priceResp;
        } else if (typeof priceResp === "string") {
          currentPrice = parseFloat(priceResp) || 0.5;
        } else if (priceResp && typeof priceResp === "object") {
          const o = priceResp as Record<string, unknown>;
          const p = o.mid ?? o.price ?? o.BUY;
          currentPrice = typeof p === "number" ? p : parseFloat(String(p || "0.5")) || 0.5;
        } else {
          currentPrice = 0.5;
        }
      } catch {
        currentPrice = 0.5;
      }
      if (currentPrice <= 0 || currentPrice >= 1) {
        logger.error("Buy: invalid price");
        return false;
      }
      const buffer = tradingEnv.BUY_PRICE_BUFFER;
      const orderPrice = clampPrice(Math.min(0.99, currentPrice * (1 + buffer)));
      const shares = amountUsd / currentPrice;
      const { valid } = await validateBuyOrderBalance(client, amountUsd);
      if (!valid) {
        logger.skip("Buy: insufficient balance/allowance");
        return false;
      }
      const order = {
        tokenID: tokenId,
        side: Side.BUY,
        amount: amountUsd,
        price: orderPrice,
      };
      logger.buy(`BUY ${side}: $${amountUsd.toFixed(2)} @ ${orderPrice.toFixed(3)} (ref ${currentPrice.toFixed(3)} +${(buffer * 100).toFixed(0)}%)`);
      logTrade(`BUY conditionId=${shortId(marketInfo.conditionId)} eventSlug=${marketInfo.eventSlug} side=${side} tokenId=${shortId(tokenId)} amountUsd=${amountUsd} price=${orderPrice.toFixed(4)}`);
      let result: { status?: string; makingAmount?: string; takingAmount?: string };
      try {
        result = await runWithoutClobRequestLog(() =>
          (client.createAndPostMarketOrder as (o: unknown, opt: unknown, t: string) => Promise<unknown>)(
            order,
            { tickSize: TICK_SIZE, negRisk: NEG_RISK },
            "FAK"
          )
        ) as { status?: string; makingAmount?: string; takingAmount?: string };
      } catch (fakErr: unknown) {
        const msg = fakErr instanceof Error ? fakErr.message : String(fakErr);
        const dataError = (fakErr as { response?: { data?: { error?: string } } })?.response?.data?.error ?? "";
        const isFakNoMatch = /no orders found to match|FAK order.*killed|FAK.*partially filled or killed/i.test(msg) || /no orders found|FAK.*killed/i.test(String(dataError));
        if (isFakNoMatch) {
          logger.skip(`BUY: no liquidity at price (FAK killed). Will retry next cycle.`);
          logTrade(`BUY_FAK_KILLED conditionId=${shortId(marketInfo.conditionId)} side=${side} orderPrice=${orderPrice.toFixed(4)}`);
          return false;
        }
        logger.error("BUY: order not filled");
        logTrade(`BUY_FAIL conditionId=${shortId(marketInfo.conditionId)} side=${side}`);
        return false;
      }
      const isSuccess =
        result &&
        (result.status === "FILLED" ||
          result.status === "PARTIALLY_FILLED" ||
          result.status === "matched" ||
          result.status === "MATCHED" ||
          !result.status);
      if (isSuccess) {
        let tokensReceived = result.takingAmount ? parseFloat(result.takingAmount) : shares;
        if (tokensReceived >= 1e6) tokensReceived = tokensReceived / 1e6;
        addHoldings(marketInfo.conditionId, tokenId, tokensReceived);
        logTrade(`BUY_FILLED conditionId=${shortId(marketInfo.conditionId)} side=${side} shares=${tokensReceived.toFixed(4)}`);
        logger.ok(`BUY ${side}: ${tokensReceived.toFixed(2)} shares`);
        return true;
      }
      logger.error("BUY: order not filled");
      return false;
    } catch {
      logger.error("BUY: order not filled");
      logTrade(`BUY_FAIL conditionId=${shortId(marketInfo.conditionId)} side=${side}`);
      return false;
    }
  });
}

/**
 * Market sell (e.g. profit lock at 0.99 or stop loss at Y). Sell price uses best bid.
 */
export async function sellToken(
  tokenId: string,
  shares: number,
  conditionId: string,
  eventSlug: string,
  side: "Up" | "Down",
  reason: "profit_lock" | "stop_loss",
  getBestBid: (tid: string) => number | null
): Promise<boolean> {
  const privateKey = tradingEnv.PRIVATE_KEY;
  if (!privateKey) {
    logger.skip("Sell: PRIVATE_KEY not set");
    return false;
  }
  if (shares <= 0) return false;

  return withCredentialRetry(async () => {
    try {
      const client = await getClobClient();
      let bestBid: number | null = getBestBid(tokenId);
      if (bestBid == null || bestBid <= 0) {
        try {
          const priceResp = await client.getPrice(tokenId, "SELL");
          if (typeof priceResp === "number" && !Number.isNaN(priceResp)) bestBid = priceResp;
          else if (priceResp && typeof priceResp === "object") {
            const o = priceResp as Record<string, unknown>;
            const p = o.mid ?? o.price ?? o.SELL ?? o.bestBid;
            if (typeof p === "number" && !Number.isNaN(p)) bestBid = p;
          }
        } catch {
          //
        }
      }
      if (bestBid == null || bestBid <= 0) {
        logger.error("Sell: could not get bid for token");
        return false;
      }
      const sellPrice = clampPrice(Math.max(bestBid * 0.98, parseFloat(TICK_SIZE)));
      const amount = Math.floor(shares * 100) / 100;
      if (amount <= 0) return false;
      const marketOrder = {
        tokenID: tokenId,
        side: Side.SELL,
        amount,
        price: sellPrice,
      };
      logger.sell(`SELL ${side} ${reason}: ${amount.toFixed(2)} shares @ ${sellPrice.toFixed(3)} (bid ${bestBid.toFixed(3)})`);
      logTrade(`SELL conditionId=${shortId(conditionId)} eventSlug=${eventSlug} side=${side} reason=${reason} shares=${amount} price=${sellPrice.toFixed(4)} bid=${bestBid.toFixed(4)}`);
      const result = await runWithoutClobRequestLog(() =>
        (client.createAndPostMarketOrder as (o: unknown, opt: unknown, t: string) => Promise<unknown>)(
          marketOrder,
          { tickSize: TICK_SIZE, negRisk: NEG_RISK },
          OrderType.FAK
        )
      ) as { status?: string; makingAmount?: string };
      const isSuccess =
        result &&
        (result.status === "FILLED" ||
          result.status === "PARTIALLY_FILLED" ||
          result.status === "matched" ||
          result.status === "MATCHED" ||
          !result.status);
      if (isSuccess) {
        let soldAmount = result.makingAmount ? parseFloat(result.makingAmount) : amount;
        if (soldAmount >= 1e6) soldAmount = soldAmount / 1e6;
        const reduced = reduceHoldings(conditionId, tokenId, soldAmount);
        logTrade(`SELL_FILLED conditionId=${shortId(conditionId)} side=${side} reason=${reason} sold=${reduced.toFixed(4)}`);
        logger.ok(`SELL ${side} (${reason}): ${reduced.toFixed(2)} tokens`);
        return true;
      }
      logger.error("SELL: order not filled");
      return false;
    } catch {
      logger.error("SELL: order not filled");
      logTrade(`SELL_FAIL conditionId=${shortId(conditionId)} side=${side} reason=${reason}`);
      return false;
    }
  });
}
