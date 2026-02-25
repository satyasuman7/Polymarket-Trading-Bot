"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z_TxEnvelopeTempo = exports.z_SignatureEnvelope = exports.z_KeyAuthorization = void 0;
exports.getType = getType;
exports.isTempo = isTempo;
exports.deserialize = deserialize;
exports.serialize = serialize;
const Hex = require("ox/Hex");
const Secp256k1 = require("ox/Secp256k1");
const Signature = require("ox/Signature");
const tempo_1 = require("ox/tempo");
const getTransactionType_js_1 = require("../utils/transaction/getTransactionType.js");
const parseTransaction_js_1 = require("../utils/transaction/parseTransaction.js");
const serializeTransaction_js_1 = require("../utils/transaction/serializeTransaction.js");
function getType(transaction) {
    const account = transaction.account;
    if ((account?.keyType && account.keyType !== 'secp256k1') ||
        typeof transaction.calls !== 'undefined' ||
        typeof transaction.feePayer !== 'undefined' ||
        typeof transaction.feeToken !== 'undefined' ||
        typeof transaction.keyAuthorization !== 'undefined' ||
        typeof transaction.nonceKey !== 'undefined' ||
        typeof transaction.signature !== 'undefined' ||
        typeof transaction.validBefore !== 'undefined' ||
        typeof transaction.validAfter !== 'undefined')
        return 'tempo';
    if (transaction.type)
        return transaction.type;
    return (0, getTransactionType_js_1.getTransactionType)(transaction);
}
function isTempo(transaction) {
    try {
        const type = getType(transaction);
        return type === 'tempo';
    }
    catch {
        return false;
    }
}
function deserialize(serializedTransaction) {
    const type = Hex.slice(serializedTransaction, 0, 1);
    if (type === '0x76' || type === '0x78')
        return deserializeTempo(serializedTransaction);
    return (0, parseTransaction_js_1.parseTransaction)(serializedTransaction);
}
async function serialize(transaction, signature) {
    if (!isTempo(transaction)) {
        if (signature && 'type' in signature && signature.type !== 'secp256k1')
            throw new Error('Unsupported signature type. Expected `secp256k1` but got `' +
                signature.type +
                '`.');
        if (signature && 'type' in signature) {
            const { r, s, yParity } = signature?.signature;
            return (0, serializeTransaction_js_1.serializeTransaction)(transaction, {
                r: Hex.fromNumber(r, { size: 32 }),
                s: Hex.fromNumber(s, { size: 32 }),
                yParity,
            });
        }
        return (0, serializeTransaction_js_1.serializeTransaction)(transaction, signature);
    }
    const type = getType(transaction);
    if (type === 'tempo')
        return serializeTempo(transaction, signature);
    throw new Error('Unsupported transaction type');
}
function deserializeTempo(serializedTransaction) {
    const { feePayerSignature, nonce, ...tx } = tempo_1.TxEnvelopeTempo.deserialize(serializedTransaction);
    return {
        ...tx,
        nonce: Number(nonce ?? 0n),
        feePayerSignature: feePayerSignature
            ? {
                r: Hex.fromNumber(feePayerSignature.r, { size: 32 }),
                s: Hex.fromNumber(feePayerSignature.s, { size: 32 }),
                yParity: feePayerSignature.yParity,
            }
            : feePayerSignature,
    };
}
async function serializeTempo(transaction, sig) {
    const signature = (() => {
        if (transaction.signature)
            return transaction.signature;
        if (sig && 'type' in sig)
            return sig;
        if (sig)
            return tempo_1.SignatureEnvelope.from({
                r: BigInt(sig.r),
                s: BigInt(sig.s),
                yParity: Number(sig.yParity),
            });
        return undefined;
    })();
    const { chainId, feePayer, feePayerSignature, nonce, ...rest } = transaction;
    const transaction_ox = {
        ...rest,
        calls: rest.calls?.length
            ? rest.calls
            : [
                {
                    to: rest.to ||
                        (!rest.data || rest.data === '0x'
                            ? '0x0000000000000000000000000000000000000000'
                            : undefined),
                    value: rest.value,
                    data: rest.data,
                },
            ],
        chainId: Number(chainId),
        feePayerSignature: feePayerSignature
            ? {
                r: BigInt(feePayerSignature.r),
                s: BigInt(feePayerSignature.s),
                yParity: Number(feePayerSignature.yParity),
            }
            : feePayer
                ? null
                : undefined,
        type: 'tempo',
        ...(nonce ? { nonce: BigInt(nonce) } : {}),
    };
    if (feePayer === true)
        delete transaction_ox.feeToken;
    if (signature && typeof transaction.feePayer === 'object') {
        const tx = tempo_1.TxEnvelopeTempo.from(transaction_ox, {
            signature,
        });
        const sender = (() => {
            if (transaction.from)
                return transaction.from;
            if (signature.type === 'secp256k1')
                return Secp256k1.recoverAddress({
                    payload: tempo_1.TxEnvelopeTempo.getSignPayload(tx),
                    signature: signature.signature,
                });
            throw new Error('Unable to extract sender from transaction or signature.');
        })();
        const hash = tempo_1.TxEnvelopeTempo.getFeePayerSignPayload(tx, {
            sender,
        });
        const feePayerSignature = await transaction.feePayer.sign({
            hash,
        });
        return tempo_1.TxEnvelopeTempo.serialize(tx, {
            feePayerSignature: Signature.from(feePayerSignature),
        });
    }
    if (feePayer === true) {
        if (signature)
            return tempo_1.TxEnvelopeTempo.serialize(transaction_ox, {
                format: 'feePayer',
                sender: transaction.from,
                signature,
            });
        return tempo_1.TxEnvelopeTempo.serialize(transaction_ox, {
            feePayerSignature: null,
        });
    }
    return tempo_1.TxEnvelopeTempo.serialize({ ...transaction_ox, ...(feePayer ? { feeToken: undefined } : {}) }, {
        feePayerSignature: undefined,
        signature,
    });
}
var tempo_2 = require("ox/tempo");
Object.defineProperty(exports, "z_KeyAuthorization", { enumerable: true, get: function () { return tempo_2.KeyAuthorization; } });
Object.defineProperty(exports, "z_SignatureEnvelope", { enumerable: true, get: function () { return tempo_2.SignatureEnvelope; } });
Object.defineProperty(exports, "z_TxEnvelopeTempo", { enumerable: true, get: function () { return tempo_2.TxEnvelopeTempo; } });
//# sourceMappingURL=Transaction.js.map