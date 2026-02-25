"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cpchain = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.cpchain = (0, defineChain_js_1.defineChain)({
    id: 86608,
    name: 'CpChain',
    nativeCurrency: {
        decimals: 18,
        name: 'CpChain',
        symbol: 'CP',
    },
    rpcUrls: {
        default: { http: ['https://rpc.cpchain.com'] },
    },
    blockExplorers: {
        default: {
            name: 'CpChain Explorer',
            url: 'https://explorer.cpchain.com',
        },
    },
    testnet: false,
});
//# sourceMappingURL=cpchain.js.map