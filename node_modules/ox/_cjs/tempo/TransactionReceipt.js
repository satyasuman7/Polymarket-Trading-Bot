"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRpcType = exports.fromRpcType = void 0;
exports.fromRpc = fromRpc;
exports.toRpc = toRpc;
const ox_TransactionReceipt = require("../core/TransactionReceipt.js");
exports.fromRpcType = {
    ...ox_TransactionReceipt.fromRpcType,
    '0x76': 'tempo',
};
exports.toRpcType = {
    ...ox_TransactionReceipt.toRpcType,
    tempo: '0x76',
};
function fromRpc(receipt) {
    return ox_TransactionReceipt.fromRpc(receipt);
}
function toRpc(receipt) {
    const rpc = ox_TransactionReceipt.toRpc(receipt);
    return {
        ...rpc,
        feePayer: receipt.feePayer,
        feeToken: receipt.feeToken,
    };
}
//# sourceMappingURL=TransactionReceipt.js.map