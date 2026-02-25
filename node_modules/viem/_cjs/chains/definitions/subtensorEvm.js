"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subtensorEvm = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.subtensorEvm = (0, defineChain_js_1.defineChain)({
    id: 964,
    name: 'Subtensor EVM',
    nativeCurrency: {
        decimals: 18,
        name: 'TAO',
        symbol: 'TAO',
    },
    rpcUrls: {
        default: {
            http: ['https://lite.chain.opentensor.ai'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Taostats EVM Explorer',
            url: 'https://evm.taostats.io',
            apiUrl: 'https://evm.taostats.io/api',
        },
    },
    testnet: false,
});
//# sourceMappingURL=subtensorEvm.js.map