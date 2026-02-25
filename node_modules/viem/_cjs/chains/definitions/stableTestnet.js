"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stableTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.stableTestnet = (0, defineChain_js_1.defineChain)({
    id: 2201,
    name: 'Stable Testnet',
    blockTime: 700,
    nativeCurrency: {
        name: 'USDT0',
        symbol: 'USDT0',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.testnet.stable.xyz'],
            webSocket: ['wss://rpc.testnet.stable.xyz'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Stablescan',
            url: 'https://testnet.stablescan.xyz',
            apiUrl: 'https://api.etherscan.io/v2/api?chainid=2201',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 22364430,
        },
    },
    testnet: true,
});
//# sourceMappingURL=stableTestnet.js.map