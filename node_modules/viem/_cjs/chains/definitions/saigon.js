"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saigon = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.saigon = (0, defineChain_js_1.defineChain)({
    id: 202601,
    name: 'Ronin Saigon Testnet',
    nativeCurrency: { name: 'RON', symbol: 'RON', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://saigon-testnet.roninchain.com/rpc'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Saigon Explorer',
            url: 'https://saigon-explorer.roninchain.com',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 18736871,
        },
    },
    testnet: true,
});
//# sourceMappingURL=saigon.js.map