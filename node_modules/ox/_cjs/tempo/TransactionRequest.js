"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRpc = toRpc;
const Hex = require("../core/Hex.js");
const ox_TransactionRequest = require("../core/TransactionRequest.js");
const AuthorizationTempo = require("./AuthorizationTempo.js");
const KeyAuthorization = require("./KeyAuthorization.js");
const TokenId = require("./TokenId.js");
const Transaction = require("./Transaction.js");
function toRpc(request) {
    const request_rpc = ox_TransactionRequest.toRpc({
        ...request,
        authorizationList: undefined,
    });
    if (request.authorizationList)
        request_rpc.authorizationList = AuthorizationTempo.toRpcList(request.authorizationList);
    if (request.calls)
        request_rpc.calls = request.calls.map((call) => ({
            to: call.to,
            value: call.value ? Hex.fromNumber(call.value) : '0x',
            data: call.data ?? '0x',
        }));
    if (typeof request.feeToken !== 'undefined')
        request_rpc.feeToken = TokenId.toAddress(request.feeToken);
    if (request.keyAuthorization)
        request_rpc.keyAuthorization = KeyAuthorization.toRpc(request.keyAuthorization);
    if (typeof request.validBefore !== 'undefined')
        request_rpc.validBefore = Hex.fromNumber(request.validBefore);
    if (typeof request.validAfter !== 'undefined')
        request_rpc.validAfter = Hex.fromNumber(request.validAfter);
    const nonceKey = (() => {
        if (request.nonceKey === 'random')
            return Hex.random(6);
        if (typeof request.nonceKey === 'bigint')
            return Hex.fromNumber(request.nonceKey);
        return undefined;
    })();
    if (nonceKey)
        request_rpc.nonceKey = nonceKey;
    if (typeof request.calls !== 'undefined' ||
        typeof request.feeToken !== 'undefined' ||
        typeof request.keyAuthorization !== 'undefined' ||
        typeof request.nonceKey !== 'undefined' ||
        typeof request.validBefore !== 'undefined' ||
        typeof request.validAfter !== 'undefined' ||
        request.type === 'tempo') {
        request_rpc.type = Transaction.toRpcType.tempo;
        delete request_rpc.data;
        delete request_rpc.input;
        delete request_rpc.to;
        delete request_rpc.value;
    }
    return request_rpc;
}
//# sourceMappingURL=TransactionRequest.js.map