"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTransaction = formatTransaction;
exports.formatTransactionReceipt = formatTransactionReceipt;
exports.formatTransactionRequest = formatTransactionRequest;
const Hex = require("ox/Hex");
const tempo_1 = require("ox/tempo");
const parseAccount_js_1 = require("../accounts/utils/parseAccount.js");
const transaction_js_1 = require("../utils/formatters/transaction.js");
const transactionReceipt_js_1 = require("../utils/formatters/transactionReceipt.js");
const transactionRequest_js_1 = require("../utils/formatters/transactionRequest.js");
const Transaction_js_1 = require("./Transaction.js");
function formatTransaction(transaction) {
    if (!(0, Transaction_js_1.isTempo)(transaction))
        return (0, transaction_js_1.formatTransaction)(transaction);
    const { feePayerSignature, gasPrice: _, nonce, ...tx } = tempo_1.Transaction.fromRpc(transaction);
    return {
        ...tx,
        accessList: tx.accessList,
        feePayerSignature: feePayerSignature
            ? {
                r: Hex.fromNumber(feePayerSignature.r, { size: 32 }),
                s: Hex.fromNumber(feePayerSignature.s, { size: 32 }),
                v: BigInt(feePayerSignature.v ?? 27),
                yParity: feePayerSignature.yParity,
            }
            : undefined,
        nonce: Number(nonce),
        typeHex: tempo_1.Transaction.toRpcType[tx.type],
        type: tx.type,
    };
}
function formatTransactionReceipt(receipt) {
    return (0, transactionReceipt_js_1.formatTransactionReceipt)(receipt);
}
function formatTransactionRequest(r, action) {
    const request = r;
    const account = request.account
        ? (0, parseAccount_js_1.parseAccount)(request.account)
        : undefined;
    if (!(0, Transaction_js_1.isTempo)(request))
        return (0, transactionRequest_js_1.formatTransactionRequest)(r, action);
    if (action)
        request.calls = request.calls ?? [
            {
                to: r.to ||
                    (!r.data || r.data === '0x'
                        ? '0x0000000000000000000000000000000000000000'
                        : undefined),
                value: r.value,
                data: r.data,
            },
        ];
    if (request.feePayer === true)
        delete request.feeToken;
    const rpc = tempo_1.TransactionRequest.toRpc({
        ...request,
        type: 'tempo',
    });
    if (action === 'estimateGas') {
        rpc.maxFeePerGas = undefined;
        rpc.maxPriorityFeePerGas = undefined;
    }
    rpc.to = undefined;
    rpc.data = undefined;
    rpc.value = undefined;
    const [keyType, keyData] = (() => {
        const type = account && 'keyType' in account ? account.keyType : account?.source;
        if (!type)
            return [undefined, undefined];
        if (type === 'webAuthn')
            return ['webAuthn', `0x${'ff'.repeat(1400)}`];
        if (['p256', 'secp256k1'].includes(type))
            return [type, undefined];
        return [undefined, undefined];
    })();
    const keyId = account && 'accessKeyAddress' in account
        ? account.accessKeyAddress
        : undefined;
    return {
        ...rpc,
        ...(keyData ? { keyData } : {}),
        ...(keyId ? { keyId } : {}),
        ...(keyType ? { keyType } : {}),
        ...(request.feePayer
            ? {
                feePayer: typeof request.feePayer === 'object'
                    ? (0, parseAccount_js_1.parseAccount)(request.feePayer)
                    : request.feePayer,
            }
            : {}),
    };
}
//# sourceMappingURL=Formatters.js.map