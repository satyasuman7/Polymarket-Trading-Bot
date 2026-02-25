"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xoneTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.xoneTestnet = (0, defineChain_js_1.defineChain)({
    id: 33772211,
    name: 'Xone Chain Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'XOC',
        symbol: 'XOC',
    },
    rpcUrls: {
        default: {
            http: [
                'https://rpc-testnet.xone.org',
                'https://rpc-testnet.xone.plus',
                'https://rpc-testnet.knight.center',
            ],
        },
    },
    blockExplorers: {
        default: {
            name: 'Xone Testnet Explorer',
            url: 'https://testnet.xonescan.com',
            apiUrl: 'http://api.testnet.xonescan.com/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=xoneTestnet.js.map