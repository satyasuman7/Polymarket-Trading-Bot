"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kii = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.kii = (0, defineChain_js_1.defineChain)({
    id: 1783,
    name: 'KiiChain',
    network: 'kii-chain',
    nativeCurrency: {
        name: 'Kii',
        symbol: 'KII',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://json-rpc.kiivalidator.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'KiiExplorer',
            url: 'https://explorer.kiichain.io',
        },
    },
});
//# sourceMappingURL=kii.js.map