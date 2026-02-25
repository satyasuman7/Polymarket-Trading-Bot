"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateTotalFee = estimateTotalFee;
const estimateGas_js_1 = require("../../actions/public/estimateGas.js");
const getGasPrice_js_1 = require("../../actions/public/getGasPrice.js");
const prepareTransactionRequest_js_1 = require("../../actions/wallet/prepareTransactionRequest.js");
const estimateL1Fee_js_1 = require("./estimateL1Fee.js");
const estimateOperatorFee_js_1 = require("./estimateOperatorFee.js");
async function estimateTotalFee(client, args) {
    const request = await (0, prepareTransactionRequest_js_1.prepareTransactionRequest)(client, args);
    const [l1Fee, operatorFee, l2Gas, l2GasPrice] = await Promise.all([
        (0, estimateL1Fee_js_1.estimateL1Fee)(client, request),
        (0, estimateOperatorFee_js_1.estimateOperatorFee)(client, request),
        (0, estimateGas_js_1.estimateGas)(client, request),
        (0, getGasPrice_js_1.getGasPrice)(client),
    ]);
    return l1Fee + operatorFee + l2Gas * l2GasPrice;
}
//# sourceMappingURL=estimateTotalFee.js.map