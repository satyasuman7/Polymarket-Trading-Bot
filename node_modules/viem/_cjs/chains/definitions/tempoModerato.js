"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tempoModerato = void 0;
const chainConfig_js_1 = require("../../tempo/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.tempoModerato = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 42431,
    blockExplorers: {
        default: {
            name: 'Tempo Explorer',
            url: 'https://explore.moderato.tempo.xyz',
        },
    },
    name: 'Tempo Testnet (Moderato)',
    nativeCurrency: {
        name: 'USD',
        symbol: 'USD',
        decimals: 6,
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.moderato.tempo.xyz'],
            webSocket: ['wss://rpc.moderato.tempo.xyz'],
        },
    },
});
//# sourceMappingURL=tempoModerato.js.map