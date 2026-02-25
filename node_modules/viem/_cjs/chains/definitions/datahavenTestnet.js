"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datahavenTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.datahavenTestnet = (0, defineChain_js_1.defineChain)({
    id: 55931,
    name: 'Datahaven Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'MOCK',
        symbol: 'MOCK',
    },
    rpcUrls: {
        default: {
            http: ['https://services.datahaven-testnet.network/testnet'],
            webSocket: ['wss://services.datahaven-testnet.network/testnet'],
        },
    },
    blockExplorers: {
        default: {
            name: 'DhScan',
            url: 'https://testnet.dhscan.io/',
            apiUrl: 'https://testnet.dhscan.io/api-docs',
        },
    },
    contracts: {},
    testnet: true,
});
//# sourceMappingURL=datahavenTestnet.js.map