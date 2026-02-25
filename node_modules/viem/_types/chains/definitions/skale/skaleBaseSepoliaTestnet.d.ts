export declare const skaleBaseSepoliaTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "SKALE Explorer";
            readonly url: "https://base-sepolia-testnet-explorer.skalenodes.com/";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts?: {
        [x: string]: import("../../../index.js").ChainContract | {
            [sourceId: number]: import("../../../index.js").ChainContract | undefined;
        } | undefined;
        ensRegistry?: import("../../../index.js").ChainContract | undefined;
        ensUniversalResolver?: import("../../../index.js").ChainContract | undefined;
        multicall3?: import("../../../index.js").ChainContract | undefined;
        erc6492Verifier?: import("../../../index.js").ChainContract | undefined;
    } | undefined;
    ensTlds?: readonly string[] | undefined;
    id: 324705682;
    name: "SKALE Base Sepolia Testnet";
    nativeCurrency: {
        readonly name: "Credits";
        readonly symbol: "CREDIT";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://base-sepolia-testnet.skalenodes.com/v1/base-testnet"];
            readonly webSocket: readonly ["wss://base-sepolia-testnet.skalenodes.com/v1/ws/base-testnet"];
        };
    };
    sourceId?: number | undefined | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    extendSchema?: Record<string, unknown> | undefined;
    fees?: import("../../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    prepareTransactionRequest?: ((args: import("../../../index.js").PrepareTransactionRequestParameters, options: {
        phase: "beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters";
    }) => Promise<import("../../../index.js").PrepareTransactionRequestParameters>) | [fn: ((args: import("../../../index.js").PrepareTransactionRequestParameters, options: {
        phase: "beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters";
    }) => Promise<import("../../../index.js").PrepareTransactionRequestParameters>) | undefined, options: {
        runAt: readonly ("beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters")[];
    }] | undefined;
    serializers?: import("../../../index.js").ChainSerializers<undefined, import("../../../index.js").TransactionSerializable> | undefined;
    verifyHash?: ((client: import("../../../index.js").Client, parameters: import("../../../index.js").VerifyHashActionParameters) => Promise<import("../../../index.js").VerifyHashActionReturnType>) | undefined;
};
//# sourceMappingURL=skaleBaseSepoliaTestnet.d.ts.map