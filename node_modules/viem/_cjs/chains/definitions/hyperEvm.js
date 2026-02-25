"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hyperEvm = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.hyperEvm = (0, defineChain_js_1.defineChain)({
    id: 999,
    name: 'HyperEVM',
    nativeCurrency: { name: 'HYPE', symbol: 'HYPE', decimals: 18 },
    blockExplorers: {
        default: {
            name: 'HyperEVMScan',
            url: 'https://hyperevmscan.io',
        },
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.hyperliquid.xyz/evm'],
        },
    },
    testnet: false,
});
//# sourceMappingURL=hyperEvm.js.map