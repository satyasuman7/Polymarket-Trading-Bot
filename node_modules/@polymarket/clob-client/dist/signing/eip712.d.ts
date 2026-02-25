import type { Wallet } from "@ethersproject/wallet";
import type { JsonRpcSigner } from "@ethersproject/providers";
import type { Chain } from "../types.ts";
/**
 * Builds the canonical Polymarket CLOB EIP712 signature
 * @param signer
 * @param ts
 * @returns string
 */
export declare const buildClobEip712Signature: (signer: Wallet | JsonRpcSigner, chainId: Chain, timestamp: number, nonce: number) => Promise<string>;
