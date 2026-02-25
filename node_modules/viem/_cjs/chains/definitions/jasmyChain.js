"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jasmyChain = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.jasmyChain = (0, defineChain_js_1.defineChain)({
    id: 680,
    name: 'Jasmy Chain',
    network: 'jasmyChain',
    nativeCurrency: { name: 'JasmyCoin', symbol: 'JASMY', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.jasmychain.io'],
            webSocket: ['wss://rpc.jasmychain.io'],
        },
    },
    testnet: false,
});
//# sourceMappingURL=jasmyChain.js.map