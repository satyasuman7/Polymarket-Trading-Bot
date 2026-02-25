"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromRpcType = exports.toRpcType = void 0;
exports.fromRpc = fromRpc;
exports.toRpc = toRpc;
const Hex = require("../core/Hex.js");
const Signature = require("../core/Signature.js");
const ox_Transaction = require("../core/Transaction.js");
const AuthorizationTempo = require("./AuthorizationTempo.js");
const KeyAuthorization = require("./KeyAuthorization.js");
const SignatureEnvelope = require("./SignatureEnvelope.js");
exports.toRpcType = {
    ...ox_Transaction.toRpcType,
    tempo: '0x76',
};
exports.fromRpcType = {
    ...ox_Transaction.fromRpcType,
    '0x76': 'tempo',
};
function fromRpc(transaction, _options = {}) {
    if (!transaction)
        return null;
    const transaction_ = ox_Transaction.fromRpc(transaction);
    transaction_.type = exports.fromRpcType[transaction.type];
    if (transaction.aaAuthorizationList) {
        transaction_.authorizationList = AuthorizationTempo.fromRpcList(transaction.aaAuthorizationList);
        delete transaction_.aaAuthorizationList;
    }
    if (transaction.calls)
        transaction_.calls = transaction.calls.map((call) => ({
            to: call.to,
            value: call.value && call.value !== '0x' ? BigInt(call.value) : undefined,
            data: call.input || call.data || '0x',
        }));
    if (transaction.feeToken)
        transaction_.feeToken = transaction.feeToken;
    if (transaction.nonceKey)
        transaction_.nonceKey = BigInt(transaction.nonceKey);
    if (transaction.signature)
        transaction_.signature = SignatureEnvelope.fromRpc(transaction.signature);
    if (transaction.validAfter)
        transaction_.validAfter = Number(transaction.validAfter);
    if (transaction.validBefore)
        transaction_.validBefore = Number(transaction.validBefore);
    if (transaction.keyAuthorization)
        transaction_.keyAuthorization = KeyAuthorization.fromRpc(transaction.keyAuthorization);
    if (transaction.feePayerSignature) {
        transaction_.feePayerSignature = Signature.fromRpc(transaction.feePayerSignature);
        transaction_.feePayerSignature.v = Signature.yParityToV(transaction_.feePayerSignature.yParity);
    }
    return transaction_;
}
function toRpc(transaction, _options) {
    const rpc = ox_Transaction.toRpc(transaction);
    rpc.type = exports.toRpcType[transaction.type];
    if (transaction.authorizationList)
        rpc.aaAuthorizationList = AuthorizationTempo.toRpcList(transaction.authorizationList);
    if (transaction.calls)
        rpc.calls = transaction.calls.map((call) => ({
            to: call.to,
            value: call.value ? Hex.fromNumber(call.value) : undefined,
            data: call.data,
        }));
    if (transaction.feeToken)
        rpc.feeToken = transaction.feeToken;
    if (transaction.keyAuthorization)
        rpc.keyAuthorization = KeyAuthorization.toRpc(transaction.keyAuthorization);
    if (transaction.feePayerSignature) {
        rpc.feePayerSignature = Signature.toRpc(transaction.feePayerSignature);
        rpc.feePayerSignature.v = Hex.fromNumber(Signature.yParityToV(transaction.feePayerSignature?.yParity));
    }
    if (transaction.signature)
        rpc.signature = SignatureEnvelope.toRpc(transaction.signature);
    if (typeof transaction.validAfter === 'number')
        rpc.validAfter = Hex.fromNumber(transaction.validAfter);
    if (typeof transaction.validBefore === 'number')
        rpc.validBefore = Hex.fromNumber(transaction.validBefore);
    return rpc;
}
//# sourceMappingURL=Transaction.js.map