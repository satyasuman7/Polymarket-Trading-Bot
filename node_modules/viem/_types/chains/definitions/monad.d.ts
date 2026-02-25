export declare const monad: {
    blockExplorers: {
        readonly default: {
            readonly name: "MonadVision";
            readonly url: "https://monadvision.com";
        };
        readonly monadscan: {
            readonly name: "Monadscan";
            readonly url: "https://monadscan.com";
            readonly apiUrl: "https://api.monadscan.com/api";
        };
    };
    blockTime: 400;
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 9248132;
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 143;
    name: "Monad";
    nativeCurrency: {
        readonly name: "Monad";
        readonly symbol: "MON";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.monad.xyz", "https://rpc1.monad.xyz"];
            readonly webSocket: readonly ["wss://rpc.monad.xyz", "wss://rpc1.monad.xyz"];
        };
    };
    sourceId?: number | undefined | undefined;
    testnet: false;
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
//# sourceMappingURL=monad.d.ts.map