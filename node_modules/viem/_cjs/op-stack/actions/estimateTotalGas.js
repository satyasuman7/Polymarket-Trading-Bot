"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateTotalGas = estimateTotalGas;
const estimateGas_js_1 = require("../../actions/public/estimateGas.js");
const estimateL1Gas_js_1 = require("./estimateL1Gas.js");
async function estimateTotalGas(client, args) {
    const [l1Gas, l2Gas] = await Promise.all([
        (0, estimateL1Gas_js_1.estimateL1Gas)(client, args),
        (0, estimateGas_js_1.estimateGas)(client, args),
    ]);
    return l1Gas + l2Gas;
}
//# sourceMappingURL=estimateTotalGas.js.map