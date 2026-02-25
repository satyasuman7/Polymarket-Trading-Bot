export declare const mantaTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Manta Testnet Explorer";
            readonly url: "https://pacific-explorer.testnet.manta.network";
            readonly apiUrl: "https://pacific-explorer.testnet.manta.network/api";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts: {
        readonly multicall3: {
            readonly address: "0x211B1643b95Fe76f11eD8880EE810ABD9A4cf56C";
            readonly blockCreated: 419915;
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 3441005;
    name: "Manta Pacific Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "ETH";
        readonly symbol: "ETH";
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://manta-testnet.calderachain.xyz/http"];
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
    readonly network: "manta-testnet";
};
//# sourceMappingURL=mantaTestnet.d.ts.map