"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.silentData = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.silentData = (0, defineChain_js_1.defineChain)({
    id: 380_929,
    name: 'Silent Data Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://mainnet.silentdata.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Silent Data Mainnet Explorer',
            url: 'https://explorer-mainnet.rollup.silentdata.com',
        },
    },
    testnet: false,
});
//# sourceMappingURL=silentdata.js.map