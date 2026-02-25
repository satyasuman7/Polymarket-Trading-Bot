"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xrplevm = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.xrplevm = (0, defineChain_js_1.defineChain)({
    id: 1440000,
    name: 'XRPL EVM',
    nativeCurrency: {
        name: 'XRP',
        symbol: 'XRP',
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ['https://rpc.xrplevm.org'] },
    },
    blockExplorers: {
        default: {
            name: 'blockscout',
            url: 'https://explorer.xrplevm.org',
            apiUrl: 'https://explorer.xrplevm.org/api/v2',
        },
    },
    testnet: false,
});
//# sourceMappingURL=xrplevm.js.map