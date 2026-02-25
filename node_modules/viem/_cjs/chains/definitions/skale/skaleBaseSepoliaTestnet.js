"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skaleBaseSepoliaTestnet = void 0;
const defineChain_js_1 = require("../../../utils/chain/defineChain.js");
exports.skaleBaseSepoliaTestnet = (0, defineChain_js_1.defineChain)({
    id: 324705682,
    name: 'SKALE Base Sepolia Testnet',
    nativeCurrency: { name: 'Credits', symbol: 'CREDIT', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://base-sepolia-testnet.skalenodes.com/v1/base-testnet'],
            webSocket: [
                'wss://base-sepolia-testnet.skalenodes.com/v1/ws/base-testnet',
            ],
        },
    },
    blockExplorers: {
        default: {
            name: 'SKALE Explorer',
            url: 'https://base-sepolia-testnet-explorer.skalenodes.com/',
        },
    },
    testnet: true,
});
//# sourceMappingURL=skaleBaseSepoliaTestnet.js.map