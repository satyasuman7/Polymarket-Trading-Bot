export declare const confluxESpaceTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "ConfluxScan";
            readonly url: "https://evmtestnet.confluxscan.org";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts: {
        readonly multicall3: {
            readonly address: "0xEFf0078910f638cd81996cc117bccD3eDf2B072F";
            readonly blockCreated: 117499050;
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 71;
    name: "Conflux eSpace Testnet";
    nativeCurrency: {
        readonly name: "Conflux";
        readonly symbol: "CFX";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://evmtestnet.confluxrpc.com"];
            readonly webSocket: readonly ["wss://evmtestnet.confluxrpc.com/ws"];
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
    readonly network: "cfx-espace-testnet";
};
//# sourceMappingURL=confluxESpaceTestnet.d.ts.map