export declare const skaleEuropaTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "SKALE Explorer";
            readonly url: "https://juicy-low-small-testnet.explorer.testnet.skalenodes.com";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 110858;
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 1444673419;
    name: "SKALE Europa Testnet";
    nativeCurrency: {
        readonly name: "sFUEL";
        readonly symbol: "sFUEL";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://testnet.skalenodes.com/v1/juicy-low-small-testnet"];
            readonly webSocket: readonly ["wss://testnet.skalenodes.com/v1/ws/juicy-low-small-testnet"];
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
//# sourceMappingURL=europaTestnet.d.ts.map