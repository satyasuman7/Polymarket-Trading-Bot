/**
 * Place limit buy order on Polymarket CLOB (GTC).
 */
import * as fs from "fs";
import * as path from "path";
import { Side, OrderType } from "@polymarket/clob-client";
import {
  POLYMARKET_PRIVATE_KEY,
  POLYMARKET_PROXY,
  POLYMARKET_CLOB_URL,
  POLYMARKET_CHAIN_ID,
  POLYMARKET_TICK_SIZE,
  POLYMARKET_NEG_RISK,
  POLYMARKET_CREDENTIAL_PATH,
  POLYMARKET_SIGNATURE_TYPE,
} from "../config.js";

const BUY_LIMIT_BUFFER = 0.01;
const POLY_PRICE_MAX = 0.99;

export type PlacePolyResult = { orderId: string } | { error: string } | null;

let cachedClient: Awaited<ReturnType<typeof buildClobClient>> | null = null;
let cachedClientKey = "";

async function buildClobClient(): Promise<import("@polymarket/clob-client").ClobClient> {
  const { Wallet } = await import("ethers");
  const { ClobClient } = await import("@polymarket/clob-client");
  const host = POLYMARKET_CLOB_URL;
  const chainId = POLYMARKET_CHAIN_ID;
  const signer = new Wallet(
    POLYMARKET_PRIVATE_KEY.startsWith("0x")
      ? POLYMARKET_PRIVATE_KEY
      : `0x${POLYMARKET_PRIVATE_KEY}`
  );

  let creds: import("@polymarket/clob-client").ApiKeyCreds;
  if (POLYMARKET_CREDENTIAL_PATH && fs.existsSync(POLYMARKET_CREDENTIAL_PATH)) {
    const raw = fs.readFileSync(
      path.resolve(process.cwd(), POLYMARKET_CREDENTIAL_PATH),
      "utf8"
    );
    const parsed = JSON.parse(raw) as { key: string; secret: string; passphrase: string };
    const secretBase64 = (parsed.secret ?? "").replace(/-/g, "+").replace(/_/g, "/");
    creds = {
      key: parsed.key,
      secret: secretBase64,
      passphrase: parsed.passphrase ?? "",
    };
  } else {
    const tempClient = new (await import("@polymarket/clob-client")).ClobClient(
      host,
      chainId,
      signer
    );
    creds = await tempClient.createOrDeriveApiKey();
  }

  return new (await import("@polymarket/clob-client")).ClobClient(
    host,
    chainId,
    signer,
    creds,
    POLYMARKET_SIGNATURE_TYPE,
    POLYMARKET_PROXY
  );
}

function getClientKey(): string {
  return `${POLYMARKET_CLOB_URL}|${POLYMARKET_CHAIN_ID}|${POLYMARKET_CREDENTIAL_PATH || "derive"}|${POLYMARKET_SIGNATURE_TYPE}`;
}

function roundPriceToTickSize(price: number, tickSize: string): number {
  const decimals =
    tickSize === "0.01" ? 2 : tickSize === "0.001" ? 3 : tickSize === "0.0001" ? 4 : 4;
  const mult = 10 ** decimals;
  return Math.round(price * mult) / mult;
}

async function getClobClient(): Promise<import("@polymarket/clob-client").ClobClient> {
  const key = getClientKey();
  if (cachedClient && cachedClientKey === key) return cachedClient;
  cachedClient = await buildClobClient();
  cachedClientKey = key;
  return cachedClient;
}

/**
 * Place a GTC limit buy. limitPrice = min(price + buffer, 0.99).
 */
export async function placePolymarketBuy(
  tokenId: string,
  price: number,
  size: number,
  conditionId?: string
): Promise<PlacePolyResult> {
  if (!POLYMARKET_PRIVATE_KEY || !POLYMARKET_PROXY) {
    const msg = `[Polymarket] Not configured. Would buy token ${tokenId.slice(0, 8)}... @ ${price.toFixed(3)} x${size}`;
    console.log(msg);
    return null;
  }

  const minUsd = 1;
  if (price * size < minUsd) {
    const msg = `Order notional $${(price * size).toFixed(2)} below min $${minUsd}.`;
    console.error(msg);
    return { error: msg };
  }

  try {
    const clobClient = await getClobClient();
    const limitPrice = Math.min(price + BUY_LIMIT_BUFFER, POLY_PRICE_MAX);
    const roundedPrice = roundPriceToTickSize(limitPrice, POLYMARKET_TICK_SIZE);
    const notionalUsd = roundedPrice * size;
    if (roundedPrice * size < minUsd) {
      return { error: `Notional $${(roundedPrice * size).toFixed(2)} below min $${minUsd}.` };
    }

    const resp = await clobClient.createAndPostOrder(
      {
        tokenID: tokenId,
        price: roundedPrice,
        side: Side.BUY,
        size,
      },
      { tickSize: POLYMARKET_TICK_SIZE, negRisk: POLYMARKET_NEG_RISK },
      OrderType.GTC
    );
    const data = resp as {
      orderID?: string;
      orderId?: string;
      error?: string;
      errorMsg?: string;
    };
    const orderId = data.orderID ?? data.orderId;
    const errMsg = data.error ?? data.errorMsg;
    if (errMsg || !orderId) {
      const msg = errMsg ?? "No order ID in response";
      console.error("Polymarket limit buy failed:", msg);
      return { error: msg };
    }
    console.log(
      `Polymarket limit buy placed: ${orderId} token=${tokenId.slice(0, 12)}... notional=$${notionalUsd.toFixed(2)} (limitPrice=${roundedPrice} size=${size})`
    );
    if (conditionId) {
      // optional: persist holding for redeem scripts
    }
    return { orderId: String(orderId) };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    const resp = (err as { response?: { data?: unknown } })?.response?.data;
    const detail = resp != null ? ` ${JSON.stringify(resp)}` : "";
    console.error("Polymarket order failed:", msg + detail);
    return { error: detail ? `${msg}${detail}` : msg };
  }
}
