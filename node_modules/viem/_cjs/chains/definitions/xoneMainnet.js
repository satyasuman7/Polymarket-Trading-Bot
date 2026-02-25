"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xoneMainnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.xoneMainnet = (0, defineChain_js_1.defineChain)({
    id: 3721,
    name: 'Xone Chain Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'XOC',
        symbol: 'XOC',
    },
    rpcUrls: {
        default: { http: ['https://rpc.xone.org'] },
    },
    blockExplorers: {
        default: {
            name: 'Xone Mainnet Explorer',
            url: 'https://xonescan.com',
            apiUrl: 'http://api.xonescan.com/api',
        },
    },
    testnet: false,
});
//# sourceMappingURL=xoneMainnet.js.map