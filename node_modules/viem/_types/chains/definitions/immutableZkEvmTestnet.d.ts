export declare const immutableZkEvmTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Immutable Testnet Explorer";
            readonly url: "https://explorer.testnet.immutable.com/";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts: {
        readonly multicall3: {
            readonly address: "0x2CC787Ed364600B0222361C4188308Fa8E68bA60";
            readonly blockCreated: 5977391;
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 13473;
    name: "Immutable zkEVM Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Immutable Coin";
        readonly symbol: "IMX";
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.testnet.immutable.com"];
        };
    };
    sourceId?: number | undefined | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    extendSchema?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    prepareTransactionRequest?: ((args: import("../../index.js").PrepareTransactionRequestParameters, options: {
        phase: "beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters";
    }) => Promise<import("../../index.js").PrepareTransactionRequestParameters>) | [fn: ((args: import("../../index.js").PrepareTransactionRequestParameters, options: {
        phase: "beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters";
    }) => Promise<import("../../index.js").PrepareTransactionRequestParameters>) | undefined, options: {
        runAt: readonly ("beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters")[];
    }] | undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    verifyHash?: ((client: import("../../index.js").Client, parameters: import("../../index.js").VerifyHashActionParameters) => Promise<import("../../index.js").VerifyHashActionReturnType>) | undefined;
};
//# sourceMappingURL=immutableZkEvmTestnet.d.ts.map