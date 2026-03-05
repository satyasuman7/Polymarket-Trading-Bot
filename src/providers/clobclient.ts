import { readFileSync, existsSync, copyFileSync, mkdirSync, unlinkSync } from "fs";
import { resolve, dirname } from "path";
import { Chain, ClobClient } from "@polymarket/clob-client";
import type { ApiKeyCreds } from "@polymarket/clob-client";
import { Wallet } from "@ethersproject/wallet";
import { tradingEnv } from "../config/env";
import { CREDENTIAL_PATH } from "../config/paths";

let cachedClient: ClobClient | null = null;
let cachedConfig: { chainId: number; host: string } | null = null;

const FALLBACK_PATHS = [
  resolve(process.cwd(), "../polymarket-impulse-bot/src/data/credential.json"),
  resolve(process.cwd(), "../polymarket-btc15-tracker/src/data/credential.json"),
  resolve(process.cwd(), "../polymarket-btc5-tracker/src/data/credential.json"),
];

async function ensureCredential(): Promise<void> {
  if (existsSync(CREDENTIAL_PATH)) return;

  for (const p of FALLBACK_PATHS) {
    if (existsSync(p)) {
      const dir = dirname(CREDENTIAL_PATH);
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
      copyFileSync(p, CREDENTIAL_PATH);
      return;
    }
  }

  if (tradingEnv.PRIVATE_KEY) {
    const { createCredential } = await import("../security/createCredential");
    await createCredential();
  }
}

/** Call after 401/credential error to force re-create API key and new client on next getClobClient. */
export function invalidateClobClient(): void {
  cachedClient = null;
  cachedConfig = null;
  try {
    if (existsSync(CREDENTIAL_PATH)) unlinkSync(CREDENTIAL_PATH);
  } catch {
    //
  }
}

export async function getClobClient(): Promise<ClobClient> {
  await ensureCredential();

  if (!existsSync(CREDENTIAL_PATH)) {
    throw new Error(
      "Credential file not found. Set PRIVATE_KEY in .env to create from Polymarket, " +
        "or copy credential.json from another bot."
    );
  }

  const creds: ApiKeyCreds = JSON.parse(readFileSync(CREDENTIAL_PATH, "utf-8"));
  const chainId = tradingEnv.CHAIN_ID as Chain;
  const host = tradingEnv.CLOB_API_URL;

  if (cachedClient && cachedConfig && cachedConfig.chainId === chainId && cachedConfig.host === host) {
    return cachedClient;
  }

  const privateKey = tradingEnv.PRIVATE_KEY;
  if (!privateKey) throw new Error("PRIVATE_KEY not found in .env");

  const wallet = new Wallet(privateKey);
  const secretBase64 = creds.secret.replace(/-/g, "+").replace(/_/g, "/");
  const apiKeyCreds: ApiKeyCreds = {
    key: creds.key,
    secret: secretBase64,
    passphrase: creds.passphrase,
  };

  const proxyWalletAddress = tradingEnv.PROXY_WALLET_ADDRESS;
  cachedClient = new ClobClient(host, chainId, wallet, apiKeyCreds, 2, proxyWalletAddress || undefined);
  cachedConfig = { chainId, host };
  return cachedClient;
}

/** Returns true if error looks like auth/credential failure (401, invalid API key, etc.). */
export function isCredentialError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  const s = msg.toLowerCase();
  return (
    s.includes("401") ||
    s.includes("unauthorized") ||
    s.includes("invalid api") ||
    s.includes("api key") ||
    s.includes("signature") ||
    s.includes("credential")
  );
}
