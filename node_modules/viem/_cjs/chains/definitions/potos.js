"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.potos = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.potos = (0, defineChain_js_1.defineChain)({
    id: 60603,
    name: 'POTOS Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'POTOS Token',
        symbol: 'POT',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.potos.hk'],
        },
    },
    blockExplorers: {
        default: {
            name: 'POTOS Mainnet explorer',
            url: 'https://scan.potos.hk',
        },
    },
    testnet: false,
});
//# sourceMappingURL=potos.js.map