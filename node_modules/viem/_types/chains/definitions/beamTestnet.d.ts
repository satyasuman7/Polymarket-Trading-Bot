export declare const beamTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Beam Explorer";
            readonly url: "https://subnets-test.avax.network/beam";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts: {
        readonly multicall3: {
            readonly address: "0x9bf49b704ee2a095b95c1f2d4eb9010510c41c9e";
            readonly blockCreated: 3;
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 13337;
    name: "Beam Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Beam";
        readonly symbol: "BEAM";
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://build.onbeam.com/rpc/testnet"];
            readonly webSocket: readonly ["wss://build.onbeam.com/ws/testnet"];
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
    readonly network: "beam";
};
//# sourceMappingURL=beamTestnet.d.ts.map