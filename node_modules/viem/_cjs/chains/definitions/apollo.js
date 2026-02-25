"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apollo = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.apollo = (0, defineChain_js_1.defineChain)({
    id: 62606,
    name: 'Apollo',
    nativeCurrency: {
        decimals: 18,
        name: 'Apollo',
        symbol: 'APOLLO',
    },
    rpcUrls: {
        default: {
            http: ['https://mainnet-rpc.apolloscan.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Apollo Explorer',
            url: 'https://apolloscan.io',
        },
    },
});
//# sourceMappingURL=apollo.js.map