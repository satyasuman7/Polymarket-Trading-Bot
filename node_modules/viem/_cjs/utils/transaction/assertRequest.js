"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertRequest = assertRequest;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const number_js_1 = require("../../constants/number.js");
const address_js_1 = require("../../errors/address.js");
const node_js_1 = require("../../errors/node.js");
const isAddress_js_1 = require("../address/isAddress.js");
function assertRequest(args) {
    const { account: account_, maxFeePerGas, maxPriorityFeePerGas, to } = args;
    const account = account_ ? (0, parseAccount_js_1.parseAccount)(account_) : undefined;
    if (account && !(0, isAddress_js_1.isAddress)(account.address))
        throw new address_js_1.InvalidAddressError({ address: account.address });
    if (to && !(0, isAddress_js_1.isAddress)(to))
        throw new address_js_1.InvalidAddressError({ address: to });
    if (maxFeePerGas && maxFeePerGas > number_js_1.maxUint256)
        throw new node_js_1.FeeCapTooHighError({ maxFeePerGas });
    if (maxPriorityFeePerGas &&
        maxFeePerGas &&
        maxPriorityFeePerGas > maxFeePerGas)
        throw new node_js_1.TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
}
//# sourceMappingURL=assertRequest.js.map