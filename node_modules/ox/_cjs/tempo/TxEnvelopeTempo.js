"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidValidityWindowError = exports.CallsEmptyError = exports.type = exports.serializedType = exports.feePayerMagic = void 0;
exports.assert = assert;
exports.deserialize = deserialize;
exports.from = from;
exports.serialize = serialize;
exports.getSignPayload = getSignPayload;
exports.hash = hash;
exports.getFeePayerSignPayload = getFeePayerSignPayload;
exports.validate = validate;
const AccessList = require("../core/AccessList.js");
const Address = require("../core/Address.js");
const Errors = require("../core/Errors.js");
const Hash = require("../core/Hash.js");
const Hex = require("../core/Hex.js");
const Rlp = require("../core/Rlp.js");
const Secp256k1 = require("../core/Secp256k1.js");
const Signature = require("../core/Signature.js");
const TransactionEnvelope = require("../core/TxEnvelope.js");
const AuthorizationTempo = require("./AuthorizationTempo.js");
const KeyAuthorization = require("./KeyAuthorization.js");
const SignatureEnvelope = require("./SignatureEnvelope.js");
const TokenId = require("./TokenId.js");
exports.feePayerMagic = '0x78';
exports.serializedType = '0x76';
exports.type = 'tempo';
function assert(envelope) {
    const { calls, chainId, maxFeePerGas, maxPriorityFeePerGas, validBefore, validAfter, } = envelope;
    if (!calls || calls.length === 0)
        throw new CallsEmptyError();
    if (typeof validBefore === 'number' &&
        typeof validAfter === 'number' &&
        validBefore <= validAfter) {
        throw new InvalidValidityWindowError({
            validBefore: validBefore,
            validAfter: validAfter,
        });
    }
    if (calls)
        for (const call of calls)
            if (call.to)
                Address.assert(call.to, { strict: false });
    if (chainId <= 0)
        throw new TransactionEnvelope.InvalidChainIdError({ chainId });
    if (maxFeePerGas && BigInt(maxFeePerGas) > 2n ** 256n - 1n)
        throw new TransactionEnvelope.FeeCapTooHighError({
            feeCap: maxFeePerGas,
        });
    if (maxPriorityFeePerGas &&
        maxFeePerGas &&
        maxPriorityFeePerGas > maxFeePerGas)
        throw new TransactionEnvelope.TipAboveFeeCapError({
            maxFeePerGas,
            maxPriorityFeePerGas,
        });
}
function deserialize(serialized) {
    const transactionArray = Rlp.toHex(Hex.slice(serialized, 1));
    const [chainId, maxPriorityFeePerGas, maxFeePerGas, gas, calls, accessList, nonceKey, nonce, validBefore, validAfter, feeToken, feePayerSignatureOrSender, authorizationList, keyAuthorizationOrSignature, maybeSignature,] = transactionArray;
    const keyAuthorization = Array.isArray(keyAuthorizationOrSignature)
        ? keyAuthorizationOrSignature
        : undefined;
    const signature = keyAuthorization
        ? maybeSignature
        : keyAuthorizationOrSignature;
    if (!(transactionArray.length === 13 ||
        transactionArray.length === 14 ||
        transactionArray.length === 15))
        throw new TransactionEnvelope.InvalidSerializedError({
            attributes: {
                authorizationList,
                chainId,
                maxPriorityFeePerGas,
                maxFeePerGas,
                gas,
                calls,
                accessList,
                keyAuthorization,
                nonceKey,
                nonce,
                validBefore,
                validAfter,
                feeToken,
                feePayerSignatureOrSender,
                ...(transactionArray.length > 12
                    ? {
                        signature,
                    }
                    : {}),
            },
            serialized,
            type: exports.type,
        });
    let transaction = {
        chainId: Number(chainId),
        type: exports.type,
    };
    if (Hex.validate(gas) && gas !== '0x')
        transaction.gas = BigInt(gas);
    if (Hex.validate(nonce))
        transaction.nonce = nonce === '0x' ? 0n : BigInt(nonce);
    if (Hex.validate(maxFeePerGas) && maxFeePerGas !== '0x')
        transaction.maxFeePerGas = BigInt(maxFeePerGas);
    if (Hex.validate(maxPriorityFeePerGas) && maxPriorityFeePerGas !== '0x')
        transaction.maxPriorityFeePerGas = BigInt(maxPriorityFeePerGas);
    if (Hex.validate(nonceKey))
        transaction.nonceKey = nonceKey === '0x' ? 0n : BigInt(nonceKey);
    if (Hex.validate(validBefore) && validBefore !== '0x')
        transaction.validBefore = Number(validBefore);
    if (Hex.validate(validAfter) && validAfter !== '0x')
        transaction.validAfter = Number(validAfter);
    if (Hex.validate(feeToken) && feeToken !== '0x')
        transaction.feeToken = feeToken;
    if (calls && calls !== '0x') {
        const callsArray = calls;
        transaction.calls = callsArray.map((callTuple) => {
            const [to, value, data] = callTuple;
            const call = {};
            if (to && to !== '0x')
                call.to = to;
            if (value && value !== '0x')
                call.value = BigInt(value);
            if (data && data !== '0x')
                call.data = data;
            return call;
        });
    }
    if (accessList?.length !== 0 && accessList !== '0x')
        transaction.accessList = AccessList.fromTupleList(accessList);
    if (authorizationList?.length !== 0 && authorizationList !== '0x')
        transaction.authorizationList = AuthorizationTempo.fromTupleList(authorizationList);
    if (feePayerSignatureOrSender !== '0x' &&
        feePayerSignatureOrSender !== undefined) {
        if (feePayerSignatureOrSender === '0x00' ||
            Address.validate(feePayerSignatureOrSender)) {
            transaction.feePayerSignature = null;
            if (Address.validate(feePayerSignatureOrSender))
                transaction.from = feePayerSignatureOrSender;
        }
        else
            transaction.feePayerSignature = Signature.fromTuple(feePayerSignatureOrSender);
    }
    if (keyAuthorization)
        transaction.keyAuthorization = KeyAuthorization.fromTuple(keyAuthorization);
    const signatureEnvelope = signature
        ? SignatureEnvelope.deserialize(signature)
        : undefined;
    if (signatureEnvelope)
        transaction = {
            ...transaction,
            signature: signatureEnvelope,
        };
    if (!transaction.from && signatureEnvelope) {
        try {
            if (signatureEnvelope.type === 'keychain')
                transaction.from = signatureEnvelope.userAddress;
            else if (signatureEnvelope.type === 'p256' ||
                signatureEnvelope.type === 'webAuthn')
                transaction.from = Address.fromPublicKey(signatureEnvelope.publicKey);
            else if (signatureEnvelope.type === 'secp256k1')
                transaction.from = Secp256k1.recoverAddress({
                    payload: getSignPayload(from(transaction)),
                    signature: signatureEnvelope.signature,
                });
        }
        catch { }
    }
    assert(transaction);
    return transaction;
}
function from(envelope, options = {}) {
    const { feePayerSignature, signature } = options;
    const envelope_ = (typeof envelope === 'string' ? deserialize(envelope) : envelope);
    assert(envelope_);
    return {
        ...envelope_,
        ...(signature ? { signature: SignatureEnvelope.from(signature) } : {}),
        ...(feePayerSignature
            ? { feePayerSignature: Signature.from(feePayerSignature) }
            : {}),
        type: 'tempo',
    };
}
function serialize(envelope, options = {}) {
    const { accessList, authorizationList, calls, chainId, feeToken, gas, keyAuthorization, nonce, nonceKey, maxFeePerGas, maxPriorityFeePerGas, validBefore, validAfter, } = envelope;
    assert(envelope);
    const accessTupleList = AccessList.toTupleList(accessList);
    const signature = options.signature || envelope.signature;
    const authorizationTupleList = AuthorizationTempo.toTupleList(authorizationList);
    const callsTupleList = calls.map((call) => [
        call.to ?? '0x',
        call.value ? Hex.fromNumber(call.value) : '0x',
        call.data ?? '0x',
    ]);
    const feePayerSignatureOrSender = (() => {
        if (options.sender)
            return options.sender;
        if (options.format === 'feePayer' && signature) {
            const sig = SignatureEnvelope.from(signature);
            if (sig.type === 'keychain')
                return sig.userAddress;
            if (sig.type === 'p256' || sig.type === 'webAuthn')
                return Address.fromPublicKey(sig.publicKey);
            if (sig.type === 'secp256k1')
                return Secp256k1.recoverAddress({
                    payload: getSignPayload(from(envelope)),
                    signature: sig.signature,
                });
        }
        const feePayerSignature = typeof options.feePayerSignature !== 'undefined'
            ? options.feePayerSignature
            : envelope.feePayerSignature;
        if (feePayerSignature === null)
            return '0x00';
        if (!feePayerSignature)
            return '0x';
        return Signature.toTuple(feePayerSignature);
    })();
    const serialized = [
        Hex.fromNumber(chainId),
        maxPriorityFeePerGas ? Hex.fromNumber(maxPriorityFeePerGas) : '0x',
        maxFeePerGas ? Hex.fromNumber(maxFeePerGas) : '0x',
        gas ? Hex.fromNumber(gas) : '0x',
        callsTupleList,
        accessTupleList,
        nonceKey ? Hex.fromNumber(nonceKey) : '0x',
        nonce ? Hex.fromNumber(nonce) : '0x',
        typeof validBefore === 'number' ? Hex.fromNumber(validBefore) : '0x',
        typeof validAfter === 'number' ? Hex.fromNumber(validAfter) : '0x',
        typeof feeToken === 'bigint' || typeof feeToken === 'string'
            ? TokenId.toAddress(feeToken)
            : '0x',
        feePayerSignatureOrSender,
        authorizationTupleList,
        ...(keyAuthorization ? [KeyAuthorization.toTuple(keyAuthorization)] : []),
        ...(signature
            ? [SignatureEnvelope.serialize(SignatureEnvelope.from(signature))]
            : []),
    ];
    return Hex.concat(options.format === 'feePayer' ? exports.feePayerMagic : exports.serializedType, Rlp.fromHex(serialized));
}
function getSignPayload(envelope) {
    return hash(envelope, { presign: true });
}
function hash(envelope, options = {}) {
    const serialized = serialize({
        ...envelope,
        ...(options.presign
            ? {
                signature: undefined,
            }
            : {}),
    });
    return Hash.keccak256(serialized);
}
function getFeePayerSignPayload(envelope, options) {
    const { sender } = options;
    const serialized = serialize({ ...envelope, signature: undefined }, {
        sender,
        format: 'feePayer',
    });
    return Hash.keccak256(serialized);
}
function validate(envelope) {
    try {
        assert(envelope);
        return true;
    }
    catch {
        return false;
    }
}
class CallsEmptyError extends Errors.BaseError {
    constructor() {
        super('Calls list cannot be empty.');
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'TxEnvelopeTempo.CallsEmptyError'
        });
    }
}
exports.CallsEmptyError = CallsEmptyError;
class InvalidValidityWindowError extends Errors.BaseError {
    constructor({ validBefore, validAfter, }) {
        super(`validBefore (${validBefore}) must be greater than validAfter (${validAfter}).`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'TxEnvelopeTempo.InvalidValidityWindowError'
        });
    }
}
exports.InvalidValidityWindowError = InvalidValidityWindowError;
//# sourceMappingURL=TxEnvelopeTempo.js.map