export declare const mantaSepoliaTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Manta Sepolia Testnet Explorer";
            readonly url: "https://pacific-explorer.sepolia-testnet.manta.network";
            readonly apiUrl: "https://pacific-explorer.sepolia-testnet.manta.network/api";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts: {
        readonly multicall3: {
            readonly address: "0xca54918f7B525C8df894668846506767412b53E3";
            readonly blockCreated: 479584;
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 3441006;
    name: "Manta Pacific Sepolia Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "ETH";
        readonly symbol: "ETH";
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://pacific-rpc.sepolia-testnet.manta.network/http"];
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
    readonly network: "manta-sepolia";
};
//# sourceMappingURL=mantaSepoliaTestnet.d.ts.map