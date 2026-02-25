"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNonce = getNonce;
exports.watchNonceIncremented = watchNonceIncremented;
const readContract_js_1 = require("../../actions/public/readContract.js");
const watchContractEvent_js_1 = require("../../actions/public/watchContractEvent.js");
const Abis = require("../Abis.js");
const Addresses = require("../Addresses.js");
const utils_js_1 = require("../internal/utils.js");
async function getNonce(client, parameters) {
    const { account, nonceKey, ...rest } = parameters;
    return (0, readContract_js_1.readContract)(client, {
        ...rest,
        ...getNonce.call({ account, nonceKey }),
    });
}
(function (getNonce) {
    function call(args) {
        const { account, nonceKey } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.nonceManager,
            abi: Abis.nonce,
            args: [account, nonceKey],
            functionName: 'getNonce',
        });
    }
    getNonce.call = call;
})(getNonce || (exports.getNonce = getNonce = {}));
function watchNonceIncremented(client, parameters) {
    const { onNonceIncremented, ...rest } = parameters;
    return (0, watchContractEvent_js_1.watchContractEvent)(client, {
        ...rest,
        address: Addresses.nonceManager,
        abi: Abis.nonce,
        eventName: 'NonceIncremented',
        onLogs: (logs) => {
            for (const log of logs)
                onNonceIncremented(log.args, log);
        },
        strict: true,
    });
}
//# sourceMappingURL=nonce.js.map