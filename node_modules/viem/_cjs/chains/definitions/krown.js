"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.krown = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.krown = (0, defineChain_js_1.defineChain)({
    id: 1983,
    name: 'Krown',
    nativeCurrency: {
        decimals: 18,
        name: 'Krown',
        symbol: 'KROWN',
    },
    rpcUrls: {
        default: {
            http: ['https://mainnet.krown.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Krown Explorer',
            url: 'https://explorer.krown.network',
        },
    },
    testnet: false,
});
//# sourceMappingURL=krown.js.map