"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tempoLocalnet = void 0;
const chainConfig_js_1 = require("../../tempo/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.tempoLocalnet = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 1337,
    name: 'Tempo',
    nativeCurrency: {
        name: 'USD',
        symbol: 'USD',
        decimals: 6,
    },
    rpcUrls: {
        default: { http: ['http://localhost:8545'] },
    },
});
//# sourceMappingURL=tempoLocalnet.js.map