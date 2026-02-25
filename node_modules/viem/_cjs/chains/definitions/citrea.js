"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.citrea = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.citrea = (0, defineChain_js_1.defineChain)({
    id: 4114,
    name: 'Citrea Mainnet',
    nativeCurrency: { name: 'Citrea Bitcoin', symbol: 'cBTC', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.mainnet.citrea.xyz'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Citrea Explorer',
            url: 'https://explorer.mainnet.citrea.xyz',
            apiUrl: 'https://explorer.mainnet.citrea.xyz/api',
        },
    },
    testnet: false,
});
//# sourceMappingURL=citrea.js.map