"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zkXPLATestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.zkXPLATestnet = (0, defineChain_js_1.defineChain)({
    id: 475,
    name: 'zkXPLA Testnet',
    network: 'zkxpla-testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['https://testnet-rpc.zkxpla.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'zkXPLA Testnet Explorer',
            url: 'https://testnet-explorer.zkxpla.io',
            apiUrl: 'https://testnet-explorer.zkxpla.io/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=zkXPLATestnet.js.map