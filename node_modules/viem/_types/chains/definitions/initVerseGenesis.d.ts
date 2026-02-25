export declare const initVerseGenesis: {
    blockExplorers: {
        readonly default: {
            readonly name: "InitVerseGenesisScan";
            readonly url: "https://genesis-testnet.iniscan.com";
            readonly apiUrl: "https://explorer-testnet-api.inichain.com/api";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts: {
        readonly multicall3: {
            readonly address: "0x0cF32CBDd6c437331EA4f85ed2d881A5379B5a6F";
            readonly blockCreated: 16361;
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 7234;
    name: "InitVerse Genesis Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "InitVerse";
        readonly symbol: "INI";
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc-testnet.inichain.com"];
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
//# sourceMappingURL=initVerseGenesis.d.ts.map