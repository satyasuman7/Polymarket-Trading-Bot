"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.potosTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.potosTestnet = (0, defineChain_js_1.defineChain)({
    id: 60600,
    name: 'POTOS Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'POTOS Token',
        symbol: 'POT',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc-testnet.potos.hk'],
        },
    },
    blockExplorers: {
        default: {
            name: 'POTOS Testnet explorer',
            url: 'https://scan-testnet.potos.hk',
        },
    },
    testnet: true,
});
//# sourceMappingURL=potosTestnet.js.map