"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heliosTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.heliosTestnet = (0, defineChain_js_1.defineChain)({
    id: 42000,
    name: 'Helios Testnet',
    network: 'helios-testnet',
    nativeCurrency: {
        symbol: 'HLS',
        name: 'Helios',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://testnet1.helioschainlabs.org'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Helios Testnet Explorer',
            url: 'https://explorer.helioschainlabs.org/',
        },
    },
    testnet: true,
});
//# sourceMappingURL=heliosTestnet.js.map