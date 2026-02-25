"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paseoPassetHub = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.paseoPassetHub = (0, defineChain_js_1.defineChain)({
    id: 420_420_422,
    name: 'Paseo PassetHub',
    nativeCurrency: {
        name: 'PAS',
        symbol: 'PAS',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://testnet-passet-hub-eth-rpc.polkadot.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://blockscout-passet-hub.parity-testnet.parity.io',
        },
    },
    testnet: true,
});
//# sourceMappingURL=paseoPassetHub.js.map