"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tempo = void 0;
const chainConfig_js_1 = require("../../tempo/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.tempo = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 4217,
    blockExplorers: {
        default: {
            name: 'Tempo Explorer',
            url: 'https://explore.mainnet.tempo.xyz',
        },
    },
    name: 'Tempo Mainnet',
    nativeCurrency: {
        name: 'USD',
        symbol: 'USD',
        decimals: 6,
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.presto.tempo.xyz'],
            webSocket: ['wss://rpc.presto.tempo.xyz'],
        },
    },
});
//# sourceMappingURL=tempo.js.map