import { MaxUint256 } from "@ethersproject/constants";
import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "@ethersproject/units";
import { Wallet } from "@ethersproject/wallet";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { AssetType, ClobClient } from "@polymarket/clob-client";
import { getContractConfig } from "@polymarket/clob-client";
import Safe from "@safe-global/protocol-kit";
import { MetaTransactionData, OperationType } from "@safe-global/types-kit";
import { tradingEnv, getRpcUrl } from "../config/env";
import { logger } from "../logger";

const USDC_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
];

async function approveUsdcOnChainFromSafe(
  chainId: number,
  exchangeAddress: string,
  collateralAddress: string,
  privateKey: string,
  proxyAddress: string
): Promise<boolean> {
  if (!exchangeAddress || !collateralAddress) return false;
  try {
    const rpcUrl = getRpcUrl(chainId);
    const provider = new JsonRpcProvider(rpcUrl);
    const usdc = new Contract(collateralAddress, USDC_ABI, provider);
    const current = await usdc.allowance(proxyAddress, exchangeAddress);
    if (current.gte(MaxUint256)) return true;
    const data = usdc.interface.encodeFunctionData("approve", [exchangeAddress, MaxUint256]);
    const safeSdk = await Safe.init({
      provider: rpcUrl,
      signer: privateKey.startsWith("0x") ? privateKey : "0x" + privateKey,
      safeAddress: proxyAddress,
    });
    const safeTx = await safeSdk.createTransaction({
      transactions: [
        { to: collateralAddress, value: "0", data, operation: OperationType.Call },
      ],
    });
    const signed = await safeSdk.signTransaction(safeTx);
    const result = await safeSdk.executeTransaction(signed);
    logger.info(`Approve: proxy (Safe) USDC approve tx: ${result.hash}`);
    await provider.waitForTransaction(result.hash, 1, 90_000).catch(() => {});
    return true;
  } catch (e: unknown) {
    logger.error(`Approve: proxy failed: ${e instanceof Error ? e.message : String(e)}`);
    return false;
  }
}

async function approveUsdcOnChain(
  chainId: number,
  exchangeAddress: string,
  collateralAddress: string,
  privateKey: string
): Promise<boolean> {
  if (!exchangeAddress || !collateralAddress) return false;
  try {
    const rpcUrl = getRpcUrl(chainId);
    const provider = new JsonRpcProvider(rpcUrl);
    const key = privateKey.startsWith("0x") ? privateKey : "0x" + privateKey;
    const wallet = new Wallet(key, provider);
    let gasPrice: BigNumber;
    try {
      const networkGas = await provider.getGasPrice();
      gasPrice = networkGas.mul(120).div(100);
      if (gasPrice.lt(parseUnits("30", "gwei"))) gasPrice = parseUnits("30", "gwei");
    } catch {
      gasPrice = parseUnits("30", "gwei");
    }
    const usdc = new Contract(collateralAddress, USDC_ABI, wallet);
    const tx = await usdc.approve(exchangeAddress, MaxUint256, {
      gasLimit: 100_000,
      gasPrice,
    });
    await tx.wait(1);
    return true;
  } catch (e: unknown) {
    const msg = String(e);
    if (msg.toLowerCase().includes("allowance") || msg.toLowerCase().includes("revert")) return true;
    logger.error(`Approve: on-chain failed: ${msg}`);
    return false;
  }
}

export async function runApprove(client: ClobClient | null): Promise<boolean> {
  if (client == null) return false;
  let key = (tradingEnv.PRIVATE_KEY ?? "").trim();
  if (!key) return false;
  if (!key.startsWith("0x")) key = "0x" + key;
  const chainId = tradingEnv.CHAIN_ID ?? 137;
  const proxyAddress = (tradingEnv.PROXY_WALLET_ADDRESS ?? "").trim();
  try {
    const config = getContractConfig(chainId);
    if (proxyAddress) {
      await approveUsdcOnChainFromSafe(chainId, config.exchange, config.collateral, key, proxyAddress);
    }
    await approveUsdcOnChain(chainId, config.exchange, config.collateral, key);
  } catch (e) {
    logger.error(`Approve: ${e instanceof Error ? e.message : String(e)}`);
  }
  try {
    if (typeof client.updateBalanceAllowance === "function") {
      await client.updateBalanceAllowance({ asset_type: AssetType.COLLATERAL });
      await new Promise((r) => setTimeout(r, 2000));
      await client.updateBalanceAllowance({ asset_type: AssetType.COLLATERAL });
    }
  } catch (_) {}
  return true;
}
