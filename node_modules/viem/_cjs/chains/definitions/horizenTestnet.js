"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.horizenTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.horizenTestnet = (0, defineChain_js_1.defineChain)({
    id: 2651420,
    name: 'Horizen Testnet',
    network: 'horizen-testnet',
    nativeCurrency: {
        symbol: 'Sepolia Ether',
        name: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://horizen-testnet.rpc.caldera.xyz/http'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Horizen Testnet Caldera Explorer',
            url: 'https://horizen-testnet.explorer.caldera.xyz',
        },
    },
    testnet: true,
});
//# sourceMappingURL=horizenTestnet.js.map