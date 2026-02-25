"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.henesys = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.henesys = (0, defineChain_js_1.defineChain)({
    id: 68414,
    name: 'Henesys',
    nativeCurrency: { name: 'NEXPACE', symbol: 'NXPC', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://henesys-rpc.msu.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Avalanche Explorer',
            url: 'https://subnets.avax.network/henesys',
        },
    },
});
//# sourceMappingURL=henesys.js.map