import { BigNumber } from "@ethersproject/bignumber";
import { hexZeroPad } from "@ethersproject/bytes";
import { Wallet } from "@ethersproject/wallet";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { Chain, getContractConfig } from "@polymarket/clob-client";
import Safe from "@safe-global/protocol-kit";
import { MetaTransactionData, OperationType } from "@safe-global/types-kit";
import { tradingEnv, getRpcUrl } from "../config/env";
import { resolve } from "path";
import { existsSync, mkdirSync, appendFileSync } from "fs";

const PROXY_WALLET_ADDRESS = tradingEnv.PROXY_WALLET_ADDRESS;
const LOG_DIR = resolve(process.cwd(), "log");
const REDEEM_LOG_FILE = resolve(LOG_DIR, "holdings-redeem.log");

function redeemLog(line: string): void {
  try {
    if (!existsSync(LOG_DIR)) mkdirSync(LOG_DIR, { recursive: true });
    appendFileSync(REDEEM_LOG_FILE, `[${new Date().toISOString()}] ${line}\n`);
  } catch (_) {}
}

const CTF_ABI = [
  { constant: false, inputs: [{ name: "collateralToken", type: "address" }, { name: "parentCollectionId", type: "bytes32" }, { name: "conditionId", type: "bytes32" }, { name: "indexSets", type: "uint256[]" }], name: "redeemPositions", outputs: [], payable: false, stateMutability: "nonpayable", type: "function" },
  { constant: true, inputs: [{ name: "", type: "bytes32" }, { name: "", type: "uint256" }], name: "payoutNumerators", outputs: [{ name: "", type: "uint256" }], payable: false, stateMutability: "view", type: "function" },
  { constant: true, inputs: [{ name: "", type: "bytes32" }], name: "payoutDenominator", outputs: [{ name: "", type: "uint256" }], payable: false, stateMutability: "view", type: "function" },
  { constant: true, inputs: [{ name: "conditionId", type: "bytes32" }], name: "getOutcomeSlotCount", outputs: [{ name: "", type: "uint256" }], payable: false, stateMutability: "view", type: "function" },
  { constant: true, inputs: [{ name: "owner", type: "address" }, { name: "id", type: "uint256" }], name: "balanceOf", outputs: [{ name: "", type: "uint256" }], payable: false, stateMutability: "view", type: "function" },
  { constant: true, inputs: [{ name: "parentCollectionId", type: "bytes32" }, { name: "conditionId", type: "bytes32" }, { name: "indexSet", type: "uint256" }], name: "getCollectionId", outputs: [{ name: "", type: "bytes32" }], payable: false, stateMutability: "view", type: "function" },
  { constant: true, inputs: [{ name: "collateralToken", type: "address" }, { name: "collectionId", type: "bytes32" }], name: "getPositionId", outputs: [{ name: "", type: "uint256" }], payable: false, stateMutability: "pure", type: "function" },
];

export interface RedeemOptions {
  conditionId: string;
  indexSets?: number[];
  chainId?: Chain;
}

export async function redeemPositions(options: RedeemOptions): Promise<unknown> {
  const privateKey = tradingEnv.PRIVATE_KEY;
  if (!privateKey) throw new Error("PRIVATE_KEY not found");

  const chainId = options.chainId ?? (tradingEnv.CHAIN_ID as Chain);
  const config = getContractConfig(chainId);
  const rpcUrl = getRpcUrl(chainId);
  const provider = new JsonRpcProvider(rpcUrl);
  const wallet = new Wallet(privateKey, provider);

  const indexSets = options.indexSets ?? [1, 2];
  const parentId = "0x0000000000000000000000000000000000000000000000000000000000000000";

  let conditionIdBytes32: string;
  if (options.conditionId.startsWith("0x")) {
    conditionIdBytes32 = hexZeroPad(options.conditionId, 32);
  } else {
    conditionIdBytes32 = hexZeroPad(BigNumber.from(options.conditionId).toHexString(), 32);
  }

  const ctf = new Contract(config.conditionalTokens, CTF_ABI, wallet);
  let gasOpts: { gasPrice?: BigNumber; gasLimit?: number } = {};
  try {
    const gp = await provider.getGasPrice();
    gasOpts = { gasPrice: gp.mul(120).div(100), gasLimit: 500_000 };
  } catch {
    gasOpts = { gasPrice: BigNumber.from("100000000000"), gasLimit: 500_000 };
  }

  const tx = await ctf.redeemPositions(config.collateral, parentId, conditionIdBytes32, indexSets, gasOpts);
  await tx.wait(1);
  return tx;
}

async function redeemPositionsViaSafe(conditionId: string, indexSets: number[], chainIdValue: Chain): Promise<unknown> {
  const privateKey = tradingEnv.PRIVATE_KEY;
  if (!privateKey) throw new Error("PRIVATE_KEY not found");

  const config = getContractConfig(chainIdValue);
  const rpcUrl = getRpcUrl(chainIdValue);
  const parentId = "0x0000000000000000000000000000000000000000000000000000000000000000";

  let conditionIdBytes32: string;
  if (conditionId.startsWith("0x")) {
    conditionIdBytes32 = hexZeroPad(conditionId, 32);
  } else {
    conditionIdBytes32 = hexZeroPad(BigNumber.from(conditionId).toHexString(), 32);
  }

  const ctf = new Contract(config.conditionalTokens, CTF_ABI);
  const data = ctf.interface.encodeFunctionData("redeemPositions", [
    config.collateral,
    parentId,
    conditionIdBytes32,
    indexSets,
  ]);

  const metaTx: MetaTransactionData = { to: config.conditionalTokens, value: "0", data, operation: OperationType.Call };
  const safeSdk = await Safe.init({
    provider: rpcUrl,
    signer: privateKey.startsWith("0x") ? privateKey : "0x" + privateKey,
    safeAddress: PROXY_WALLET_ADDRESS,
  });

  const safeTx = await safeSdk.createTransaction({ transactions: [metaTx] });
  const signed = await safeSdk.signTransaction(safeTx);
  return safeSdk.executeTransaction(signed);
}

async function retryWithBackoff<T>(fn: () => Promise<T>, maxRetries = 3, delayMs = 1000): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const msg = error instanceof Error ? error.message : String(error);
      const retryable = /network|timeout|ECONNREFUSED|ETIMEDOUT|RPC|rate limit|nonce|503|502|504|connection|socket|ECONNRESET/i.test(msg);
      if (!retryable || attempt === maxRetries) throw error;
      await new Promise((r) => setTimeout(r, delayMs * Math.pow(2, attempt - 1)));
    }
  }
  throw lastError;
}

export async function redeemMarket(conditionId: string, chainId?: Chain, maxRetries = 3): Promise<unknown> {
  const privateKey = tradingEnv.PRIVATE_KEY;
  if (!privateKey) throw new Error("PRIVATE_KEY not found");

  const chainIdValue = chainId ?? (tradingEnv.CHAIN_ID as Chain);
  const provider = new JsonRpcProvider(getRpcUrl(chainIdValue));
  const wallet = new Wallet(privateKey, provider);
  const walletAddress = await wallet.getAddress();

  redeemLog(`REDEEM_ATTEMPT conditionId=${conditionId}`);
  const resolution = await checkConditionResolution(conditionId, chainIdValue);

  if (!resolution.isResolved) throw new Error(`Market not resolved. ${resolution.reason}`);
  if (resolution.winningIndexSets.length === 0) throw new Error("No winning outcomes");

  const userBalances = await getUserTokenBalances(conditionId, PROXY_WALLET_ADDRESS, chainIdValue);
  if (userBalances.size === 0) throw new Error("No tokens to redeem");

  const redeemableIndexSets = resolution.winningIndexSets.filter((i) => {
    const b = userBalances.get(i);
    return b && !b.isZero();
  });
  if (redeemableIndexSets.length === 0) {
    throw new Error(`No winning tokens. Hold: ${[...userBalances.keys()].join(",")}, Winners: ${resolution.winningIndexSets.join(",")}`);
  }

  const useProxy = walletAddress.toLowerCase() !== PROXY_WALLET_ADDRESS.toLowerCase();

  return retryWithBackoff(
    async () => {
      if (useProxy) return redeemPositionsViaSafe(conditionId, redeemableIndexSets, chainIdValue);
      return redeemPositions({ conditionId, indexSets: redeemableIndexSets, chainId: chainIdValue });
    },
    maxRetries,
    2000
  );
}

export async function checkConditionResolution(
  conditionId: string,
  chainId?: Chain
): Promise<{
  isResolved: boolean;
  winningIndexSets: number[];
  payoutDenominator: BigNumber;
  payoutNumerators: BigNumber[];
  outcomeSlotCount: number;
  reason?: string;
}> {
  const chainIdValue = chainId ?? (tradingEnv.CHAIN_ID as Chain);
  const config = getContractConfig(chainIdValue);
  const provider = new JsonRpcProvider(getRpcUrl(chainIdValue));
  const wallet = new Wallet(tradingEnv.PRIVATE_KEY!, provider);

  let conditionIdBytes32: string;
  if (conditionId.startsWith("0x")) {
    conditionIdBytes32 = hexZeroPad(conditionId, 32);
  } else {
    conditionIdBytes32 = hexZeroPad(BigNumber.from(conditionId).toHexString(), 32);
  }

  const ctf = new Contract(config.conditionalTokens, CTF_ABI, wallet);
  try {
    const outcomeSlotCount = (await ctf.getOutcomeSlotCount(conditionIdBytes32)).toNumber();
    const payoutDenominator = await ctf.payoutDenominator(conditionIdBytes32);
    const isResolved = !payoutDenominator.isZero();

    let winningIndexSets: number[] = [];
    const payoutNumerators: BigNumber[] = [];
    if (isResolved) {
      for (let i = 0; i < outcomeSlotCount; i++) {
        const n = await ctf.payoutNumerators(conditionIdBytes32, i);
        payoutNumerators.push(n);
        if (!n.isZero()) winningIndexSets.push(i + 1);
      }
    }

    return {
      isResolved,
      winningIndexSets,
      payoutDenominator,
      payoutNumerators,
      outcomeSlotCount,
      reason: isResolved ? `Winning: ${winningIndexSets.join(", ")}` : "Not resolved",
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return {
      isResolved: false,
      winningIndexSets: [],
      payoutDenominator: BigNumber.from(0),
      payoutNumerators: [],
      outcomeSlotCount: 0,
      reason: msg,
    };
  }
}

export async function getUserTokenBalances(
  conditionId: string,
  walletAddress: string,
  chainId?: Chain
): Promise<Map<number, BigNumber>> {
  const chainIdValue = chainId ?? (tradingEnv.CHAIN_ID as Chain);
  const config = getContractConfig(chainIdValue);
  const provider = new JsonRpcProvider(getRpcUrl(chainIdValue));
  const wallet = new Wallet(tradingEnv.PRIVATE_KEY!, provider);

  let conditionIdBytes32: string;
  if (conditionId.startsWith("0x")) {
    conditionIdBytes32 = hexZeroPad(conditionId, 32);
  } else {
    conditionIdBytes32 = hexZeroPad(BigNumber.from(conditionId).toHexString(), 32);
  }

  const ctf = new Contract(config.conditionalTokens, CTF_ABI, wallet);
  const balances = new Map<number, BigNumber>();
  const parentId = "0x0000000000000000000000000000000000000000000000000000000000000000";

  try {
    const outcomeSlotCount = (await ctf.getOutcomeSlotCount(conditionIdBytes32)).toNumber();
    for (let i = 1; i <= outcomeSlotCount; i++) {
      try {
        const collectionId = await ctf.getCollectionId(parentId, conditionIdBytes32, i);
        const positionId = await ctf.getPositionId(config.collateral, collectionId);
        const balance = await ctf.balanceOf(walletAddress, positionId);
        if (!balance.isZero()) balances.set(i, balance);
      } catch {
        //
      }
    }
  } catch {
    //
  }
  return balances;
}

export async function isMarketResolved(conditionId: string): Promise<{
  isResolved: boolean;
  winningIndexSets?: number[];
  reason?: string;
}> {
  try {
    const resolution = await checkConditionResolution(conditionId);
    if (resolution.isResolved) {
      return {
        isResolved: true,
        winningIndexSets: resolution.winningIndexSets,
        reason: `Winning: ${resolution.winningIndexSets.join(", ")}`,
      };
    }
    return { isResolved: false, reason: resolution.reason };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return { isResolved: false, reason: msg };
  }
}
