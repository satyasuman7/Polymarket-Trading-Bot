"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skaleBase = void 0;
const defineChain_js_1 = require("../../../utils/chain/defineChain.js");
exports.skaleBase = (0, defineChain_js_1.defineChain)({
    id: 1187947933,
    name: 'SKALE Base',
    nativeCurrency: { name: 'Credits', symbol: 'CREDIT', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://skale-base.skalenodes.com/v1/base'],
            webSocket: ['wss://skale-base.skalenodes.com/v1/ws/base'],
        },
    },
    blockExplorers: {
        default: {
            name: 'SKALE Explorer',
            url: 'https://skale-base-explorer.skalenodes.com/',
        },
    },
    testnet: true,
});
//# sourceMappingURL=skaleBase.js.map