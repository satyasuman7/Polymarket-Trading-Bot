"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adi = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.adi = (0, defineChain_js_1.defineChain)({
    id: 36900,
    name: 'ADI_Chain',
    nativeCurrency: {
        decimals: 18,
        name: 'ADI',
        symbol: 'ADI',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.adifoundation.ai'],
        },
    },
    blockExplorers: {
        default: {
            name: 'ADI Explorer',
            url: 'https://explorer.adifoundation.ai',
        },
    },
    testnet: false,
});
//# sourceMappingURL=adi.js.map