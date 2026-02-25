"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactiveTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.reactiveTestnet = (0, defineChain_js_1.defineChain)({
    id: 5_318_007,
    name: 'Reactive Lasna Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Lasna React',
        symbol: 'lREACT',
    },
    rpcUrls: {
        default: { http: ['https://lasna-rpc.rnk.dev'] },
    },
    blockExplorers: {
        default: {
            name: 'Reactscan',
            url: 'https://lasna.reactscan.net',
        },
    },
    testnet: true,
});
//# sourceMappingURL=reactiveTestnet.js.map