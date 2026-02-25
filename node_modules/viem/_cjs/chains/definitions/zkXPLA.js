"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zkXPLA = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.zkXPLA = (0, defineChain_js_1.defineChain)({
    id: 375,
    name: 'zkXPLA Mainnet',
    network: 'zkxpla',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.zkxpla.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'zkXPLA Mainnet Explorer',
            url: 'https://explorer.zkxpla.io',
            apiUrl: 'https://explorer.zkxpla.io/api',
        },
    },
    testnet: false,
});
//# sourceMappingURL=zkXPLA.js.map