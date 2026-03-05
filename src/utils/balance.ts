import { ClobClient, AssetType } from "@polymarket/clob-client";
import { Contract } from "@ethersproject/contracts";
import { JsonRpcProvider } from "@ethersproject/providers";
import { getContractConfig } from "@polymarket/clob-client";
import { tradingEnv, getRpcUrl } from "../config/env";
import { logger } from "../logger";

const CLOB_DECIMALS = 6;
const USDC_DECIMALS = 6;
const USDC_ABI = [
  "function balanceOf(address account) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
];

function parseClobAmount(value: string | undefined, decimals: number = CLOB_DECIMALS): number {
  if (!value) return 0;
  const n = parseFloat(value.trim());
  if (Number.isNaN(n)) return 0;
  if (value.includes(".")) return n;
  return n / Math.pow(10, decimals);
}

async function getProxyOnChainBalanceAllowance(proxyAddress: string): Promise<{
  balanceUsd: number;
  allowanceUsd: number;
} | null> {
  try {
    const chainId = tradingEnv.CHAIN_ID ?? 137;
    const config = getContractConfig(chainId);
    const provider = new JsonRpcProvider(getRpcUrl(chainId));
    const usdc = new Contract(config.collateral, USDC_ABI, provider);
    const [balanceWei, allowanceWei] = await Promise.all([
      usdc.balanceOf(proxyAddress),
      usdc.allowance(proxyAddress, config.exchange),
    ]);
    const balanceUsd = Number(balanceWei.toString()) / Math.pow(10, USDC_DECIMALS);
    const allowanceUsd = Number(allowanceWei.toString()) / Math.pow(10, USDC_DECIMALS);
    return { balanceUsd, allowanceUsd };
  } catch {
    return null;
  }
}

export async function getProxyWalletBalanceUsd(client: ClobClient): Promise<{
  balanceUsd: number;
  allowanceUsd: number;
  availableUsd: number;
}> {
  try {
    const balanceResponse = await client.getBalanceAllowance({
      asset_type: AssetType.COLLATERAL,
    });
    const balanceUsd = parseClobAmount(balanceResponse.balance);
    let allowanceUsd = parseClobAmount(balanceResponse.allowance);
    const proxyAddress = (tradingEnv.PROXY_WALLET_ADDRESS ?? "").trim();
    if (proxyAddress && balanceUsd > 0 && allowanceUsd === 0) {
      const onChain = await getProxyOnChainBalanceAllowance(proxyAddress);
      if (onChain) allowanceUsd = onChain.allowanceUsd;
    }
    const availableUsd = Math.min(balanceUsd, allowanceUsd);
    return {
      balanceUsd: Math.max(0, balanceUsd),
      allowanceUsd: Math.max(0, allowanceUsd),
      availableUsd: Math.max(0, availableUsd),
    };
  } catch {
    return { balanceUsd: 0, allowanceUsd: 0, availableUsd: 0 };
  }
}

export async function validateBuyOrderBalance(
  client: ClobClient,
  requiredAmount: number
): Promise<{ valid: boolean; available: number; required: number }> {
  try {
    const { balanceUsd, allowanceUsd, availableUsd } = await getProxyWalletBalanceUsd(client);
    const valid = availableUsd >= requiredAmount;
    if (!valid) {
      logger.skip(`Balance: need $${requiredAmount.toFixed(2)}, have $${availableUsd.toFixed(2)}`);
    }
    return { valid, available: availableUsd, required: requiredAmount };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    logger.error(`Balance check: ${msg}`);
    return { valid: false, available: 0, required: requiredAmount };
  }
}
