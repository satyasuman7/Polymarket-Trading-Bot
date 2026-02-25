"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hppSepolia = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.hppSepolia = (0, defineChain_js_1.defineChain)({
    id: 181228,
    name: 'HPP Sepolia',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://testnet.hpp.io'],
            webSocket: ['wss://testnet.hpp.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'HPP Sepolia Explorer',
            url: 'https://sepolia-explorer.hpp.io',
        },
    },
    testnet: true,
});
//# sourceMappingURL=hppSepolia.js.map