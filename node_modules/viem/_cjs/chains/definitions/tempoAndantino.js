"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tempoAndantino = void 0;
const chainConfig_js_1 = require("../../tempo/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.tempoAndantino = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 42429,
    blockExplorers: {
        default: {
            name: 'Tempo Explorer',
            url: 'https://explore.testnet.tempo.xyz',
        },
    },
    name: 'Tempo Testnet (Andantino)',
    nativeCurrency: {
        name: 'USD',
        symbol: 'USD',
        decimals: 6,
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.testnet.tempo.xyz'],
            webSocket: ['wss://rpc.testnet.tempo.xyz'],
        },
    },
});
//# sourceMappingURL=tempoAndantino.js.map