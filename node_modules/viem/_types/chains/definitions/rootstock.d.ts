export declare const rootstock: {
    blockExplorers: {
        readonly default: {
            readonly name: "RSK Explorer";
            readonly url: "https://explorer.rsk.co";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 4249540;
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 30;
    name: "Rootstock Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Rootstock Bitcoin";
        readonly symbol: "RBTC";
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://public-node.rsk.co"];
        };
    };
    sourceId?: number | undefined | undefined;
    testnet?: boolean | undefined | undefined;
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
    readonly network: "rootstock";
};
//# sourceMappingURL=rootstock.d.ts.map