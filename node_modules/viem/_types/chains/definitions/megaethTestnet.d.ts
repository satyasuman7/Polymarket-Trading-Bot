export declare const megaethTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Etherscan";
            readonly url: "https://testnet-mega.etherscan.io";
            readonly apiUrl: "https://api.etherscan.io/v2/api";
        };
        readonly blockscout: {
            readonly name: "Blockscout";
            readonly url: "https://megaeth-testnet-v2.blockscout.com";
            readonly apiUrl: "https://megaeth-testnet-v2.blockscout.com/api";
        };
    };
    blockTime: 1000;
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 0;
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 6343;
    name: "MegaETH Testnet";
    nativeCurrency: {
        readonly name: "MegaETH Testnet Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://carrot.megaeth.com/rpc"];
            readonly webSocket: readonly ["wss://carrot.megaeth.com/ws"];
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
//# sourceMappingURL=megaethTestnet.d.ts.map