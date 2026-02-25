import type { JsonRpcSigner } from "@ethersproject/providers";
import type { Wallet } from "@ethersproject/wallet";
import type { ApiKeyCreds, Chain, L1PolyHeader, L2HeaderArgs, L2PolyHeader, L2WithBuilderHeader } from "../types.ts";
import type { BuilderHeaderPayload } from "@polymarket/builder-signing-sdk";
export declare const createL1Headers: (signer: Wallet | JsonRpcSigner, chainId: Chain, nonce?: number, timestamp?: number) => Promise<L1PolyHeader>;
export declare const createL2Headers: (signer: Wallet | JsonRpcSigner, creds: ApiKeyCreds, l2HeaderArgs: L2HeaderArgs, timestamp?: number) => Promise<L2PolyHeader>;
export declare const injectBuilderHeaders: (l2Header: L2PolyHeader, builderHeaders: BuilderHeaderPayload) => L2WithBuilderHeader;
