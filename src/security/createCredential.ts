import { ApiKeyCreds, ClobClient, Chain } from "@polymarket/clob-client";
import { writeFileSync, readFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";
import { Wallet } from "@ethersproject/wallet";
import { tradingEnv, maskAddress } from "../config/env";
import { logger } from "../logger";
import { CREDENTIAL_PATH } from "../config/paths";

function loadFromFile(): ApiKeyCreds | null {
  if (!existsSync(CREDENTIAL_PATH)) return null;
  try {
    const cred = JSON.parse(readFileSync(CREDENTIAL_PATH, "utf-8")) as ApiKeyCreds;
    return cred?.key ? cred : null;
  } catch {
    return null;
  }
}

/**
 * Create or derive API key from PRIVATE_KEY and save to credential.json.
 * Tries deriveApiKey() first (restore existing key). createApiKey() returns 400 when
 * a key already exists for this wallet. See https://github.com/Polymarket/clob-client/issues/202
 */
export async function createCredential(): Promise<ApiKeyCreds | null> {
  const privateKey = tradingEnv.PRIVATE_KEY;
  if (!privateKey) {
    logger.skip("Credential: PRIVATE_KEY not set");
    return null;
  }

  const existing = loadFromFile();
  if (existing) {
    logger.info("Using credential from credential.json");
    return existing;
  }

  try {
    const wallet = new Wallet(privateKey);
    const chainId = tradingEnv.CHAIN_ID as Chain;
    const host = tradingEnv.CLOB_API_URL;

    const clobClient = new ClobClient(host, chainId, wallet);
    let credential: ApiKeyCreds;
    try {
      credential = await clobClient.deriveApiKey();
    } catch {
      credential = await clobClient.createApiKey();
    }
    if (!credential?.key) {
      throw new Error("No API key returned (derive or create)");
    }
    const toSave = {
      key: credential.key,
      secret: credential.secret,
      passphrase: credential.passphrase,
    };

    const dir = resolve(process.cwd(), "src/data");
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(CREDENTIAL_PATH, JSON.stringify(toSave, null, 2));

    logger.ok(`Credential saved for ${maskAddress(wallet.address)}`);
    return toSave;
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    logger.error(`Credential: ${msg}`);
    return null;
  }
}

/** Force refresh credential (e.g. after 401). Derive first, then create if needed. */
export async function updateCredential(): Promise<ApiKeyCreds | null> {
  const privateKey = tradingEnv.PRIVATE_KEY;
  if (!privateKey) return null;
  try {
    const wallet = new Wallet(privateKey);
    const chainId = tradingEnv.CHAIN_ID as Chain;
    const host = tradingEnv.CLOB_API_URL;
    const clobClient = new ClobClient(host, chainId, wallet);
    let credential: ApiKeyCreds;
    try {
      credential = await clobClient.deriveApiKey();
    } catch {
      credential = await clobClient.createApiKey();
    }
    if (!credential?.key) throw new Error("No API key returned");
    const toSave = {
      key: credential.key,
      secret: credential.secret,
      passphrase: credential.passphrase,
    };
    const dir = resolve(process.cwd(), "src/data");
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(CREDENTIAL_PATH, JSON.stringify(toSave, null, 2));
    logger.ok("Credential updated");
    return toSave;
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    logger.error(`Credential update failed: ${msg}`);
    return null;
  }
}
