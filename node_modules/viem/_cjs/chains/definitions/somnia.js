"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.somnia = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.somnia = (0, defineChain_js_1.defineChain)({
    id: 5031,
    name: 'Somnia',
    nativeCurrency: { name: 'Somnia', symbol: 'SOMI', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://api.infra.mainnet.somnia.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Somnia Explorer',
            url: 'https://explorer.somnia.network',
            apiUrl: 'https://explorer.somnia.network/api',
        },
    },
    testnet: false,
});
//# sourceMappingURL=somnia.js.map