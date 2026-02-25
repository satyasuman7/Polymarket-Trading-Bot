export declare const datahavenTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "DhScan";
            readonly url: "https://testnet.dhscan.io/";
            readonly apiUrl: "https://testnet.dhscan.io/api-docs";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts: {};
    ensTlds?: readonly string[] | undefined;
    id: 55931;
    name: "Datahaven Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "MOCK";
        readonly symbol: "MOCK";
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://services.datahaven-testnet.network/testnet"];
            readonly webSocket: readonly ["wss://services.datahaven-testnet.network/testnet"];
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
//# sourceMappingURL=datahavenTestnet.d.ts.map