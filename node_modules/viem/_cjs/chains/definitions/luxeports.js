"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.luxeports = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.luxeports = (0, defineChain_js_1.defineChain)({
    id: 1122,
    name: 'LuxePorts',
    network: 'luxeports',
    nativeCurrency: {
        name: 'LuxePorts',
        symbol: 'LXP',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.luxeports.com', 'https://erpc.luxeports.com'],
            webSocket: ['wss://rpc.luxeports.com/ws', 'wss://erpc.luxeports.com/ws'],
        },
    },
    blockExplorers: {
        default: {
            name: 'LXPScan',
            url: 'https://lxpscan.com',
        },
    },
    testnet: false,
});
//# sourceMappingURL=luxeports.js.map