"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jasmyChainTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.jasmyChainTestnet = (0, defineChain_js_1.defineChain)({
    id: 681,
    name: 'Jasmy Chain Testnet',
    network: 'jasmyChainTestnet',
    nativeCurrency: { name: 'JasmyCoin', symbol: 'JASMY', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc_testnet.jasmychain.io'],
            webSocket: ['wss://rpc_testnet.jasmychain.io'],
        },
    },
    testnet: true,
});
//# sourceMappingURL=jasmyChainTestnet.js.map