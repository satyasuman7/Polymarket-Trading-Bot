import * as AccessList from '../core/AccessList.js';
import * as Address from '../core/Address.js';
import * as Errors from '../core/Errors.js';
import * as Hash from '../core/Hash.js';
import * as Hex from '../core/Hex.js';
import * as Rlp from '../core/Rlp.js';
import * as Secp256k1 from '../core/Secp256k1.js';
import * as Signature from '../core/Signature.js';
import * as TransactionEnvelope from '../core/TxEnvelope.js';
import * as AuthorizationTempo from './AuthorizationTempo.js';
import * as KeyAuthorization from './KeyAuthorization.js';
import * as SignatureEnvelope from './SignatureEnvelope.js';
import * as TokenId from './TokenId.js';
export const feePayerMagic = '0x78';
export const serializedType = '0x76';
export const type = 'tempo';
/**
 * Asserts a {@link ox#TxEnvelopeTempo.TxEnvelopeTempo} is valid.
 *
 * @example
 * ```ts twoslash
 * import { TxEnvelopeTempo } from 'ox/tempo'
 *
 * TxEnvelopeTempo.assert({
 *   calls: [{ to: '0x0000000000000000000000000000000000000000', value: 0n }],
 *   chainId: 1,
 *   maxFeePerGas: 1000000000n,
 * })
 * ```
 *
 * @param envelope - The transaction envelope to assert.
 */
export function assert(envelope) {
    const { calls, chainId, maxFeePerGas, maxPriorityFeePerGas, validBefore, validAfter, } = envelope;
    // Calls must not be empty
    if (!calls || calls.length === 0)
        throw new CallsEmptyError();
    // validBefore must be greater than validAfter if both are set
    if (typeof validBefore === 'number' &&
        typeof validAfter === 'number' &&
        validBefore <= validAfter) {
        throw new InvalidValidityWindowError({
            validBefore: validBefore,
            validAfter: validAfter,
        });
    }
    // Validate each call
    if (calls)
        for (const call of calls)
            if (call.to)
                Address.assert(call.to, { strict: false });
    // Validate chain ID
    if (chainId <= 0)
        throw new TransactionEnvelope.InvalidChainIdError({ chainId });
    // Validate max fee per gas
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
/**
 * Deserializes a {@link ox#TxEnvelopeTempo.TxEnvelopeTempo} from its serialized form.
 *
 * @example
 * ```ts twoslash
 * import { TxEnvelopeTempo } from 'ox/tempo'
 *
 * const envelope = TxEnvelopeTempo.deserialize('0x76f84a0182031184773594008477359400809470997970c51812dc3a010c7d01b50e0d17dc79c8880de0b6b3a764000080c0808080')
 * // @log: {
 * // @log:   type: 'tempo',
 * // @log:   nonce: 785n,
 * // @log:   maxFeePerGas: 2000000000n,
 * // @log:   gas: 1000000n,
 * // @log:   calls: [{ to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: 1000000000000000000n }],
 * // @log: }
 * ```
 *
 * @param serialized - The serialized transaction.
 * @returns Deserialized Transaction Envelope.
 */
export function deserialize(serialized) {
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
            type,
        });
    let transaction = {
        chainId: Number(chainId),
        type,
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
    // Parse calls array
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
    // Recover sender address from the signature if not already set.
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
/**
 * Converts an arbitrary transaction object into a Tempo Transaction Envelope.
 *
 * Use this to create transaction envelopes with Tempo-specific features like batched calls,
 * fee tokens, access keys, and scheduled execution. Attach a signature using the `signature`
 * option after signing with {@link ox#TxEnvelopeTempo.(getSignPayload:function)}.
 *
 * [Tempo Transaction Specification](https://docs.tempo.xyz/protocol/transactions/spec-tempo-transaction)
 *
 * @example
 * ```ts twoslash
 * import { Value } from 'ox'
 * import { TxEnvelopeTempo } from 'ox/tempo'
 *
 * const envelope = TxEnvelopeTempo.from({ // [!code focus]
 *   chainId: 1, // [!code focus]
 *   calls: [{ // [!code focus]
 *     data: '0xdeadbeef', // [!code focus]
 *     to: '0x0000000000000000000000000000000000000000', // [!code focus]
 *   }], // [!code focus]
 *   maxFeePerGas: Value.fromGwei('10'), // [!code focus]
 *   maxPriorityFeePerGas: Value.fromGwei('1'), // [!code focus]
 * }) // [!code focus]
 * ```
 *
 * @example
 * ### Attaching Signatures
 *
 * It is possible to attach a `signature` to the transaction envelope.
 *
 * ```ts twoslash
 * // @noErrors
 * import { Secp256k1, Value } from 'ox'
 * import { TxEnvelopeTempo } from 'ox/tempo'
 *
 * const envelope = TxEnvelopeTempo.from({
 *   chainId: 1,
 *   calls: [{
 *     data: '0xdeadbeef',
 *     to: '0x0000000000000000000000000000000000000000',
 *   }],
 *   maxFeePerGas: Value.fromGwei('10'),
 *   maxPriorityFeePerGas: Value.fromGwei('1'),
 * })
 *
 * const signature = Secp256k1.sign({
 *   payload: TxEnvelopeTempo.getSignPayload(envelope),
 *   privateKey: '0x...',
 * })
 *
 * const envelope_signed = TxEnvelopeTempo.from(envelope, { // [!code focus]
 *   signature, // [!code focus]
 * }) // [!code focus]
 * // @log: {
 * // @log:   chainId: 1,
 * // @log:   calls: [{ to: '0x0000000000000000000000000000000000000000', value: 1000000000000000000n }],
 * // @log:   maxFeePerGas: 10000000000n,
 * // @log:   maxPriorityFeePerGas: 1000000000n,
 * // @log:   type: 'tempo',
 * // @log:   r: 125...n,
 * // @log:   s: 642...n,
 * // @log:   yParity: 0,
 * // @log: }
 * ```
 *
 * @example
 * ### From Serialized
 *
 * It is possible to instantiate a Tempo Transaction Envelope from a {@link ox#TxEnvelopeTempo.Serialized} value.
 *
 * ```ts twoslash
 * import { TxEnvelopeTempo } from 'ox/tempo'
 *
 * const envelope = TxEnvelopeTempo.from('0x76f84a0182031184773594008477359400809470997970c51812dc3a010c7d01b50e0d17dc79c8880de0b6b3a764000080c0808080')
 * // @log: {
 * // @log:   chainId: 1,
 * // @log:   calls: [{
 * // @log:     data: '0xdeadbeef',
 * // @log:     to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 * // @log:   }],
 * // @log:   maxFeePerGas: 10000000000n,
 * // @log:   type: 'tempo',
 * // @log: }
 * ```
 *
 * @param envelope - The transaction object to convert.
 * @param options - Options.
 * @returns A Tempo Transaction Envelope.
 */
export function from(envelope, options = {}) {
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
/**
 * Serializes a {@link ox#TxEnvelopeTempo.TxEnvelopeTempo}.
 *
 * RLP-encodes the transaction with type prefix `0x76`. For fee sponsorship, use `format: 'feePayer'`
 * to serialize with the fee payer magic `0x78` and the sender address.
 *
 * [RLP Encoding](https://docs.tempo.xyz/protocol/transactions/spec-tempo-transaction#rlp-encoding)
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Value } from 'ox'
 * import { TxEnvelopeTempo } from 'ox/tempo'
 *
 * const envelope = TxEnvelopeTempo.from({
 *   chainId: 1,
 *   calls: [{
 *     data: '0xdeadbeef',
 *     to: '0x0000000000000000000000000000000000000000',
 *   }],
 *   maxFeePerGas: Value.fromGwei('10'),
 * })
 *
 * const serialized = TxEnvelopeTempo.serialize(envelope) // [!code focus]
 * ```
 *
 * @example
 * ### Attaching Signatures
 *
 * It is possible to attach a `signature` to the serialized Transaction Envelope.
 *
 * ```ts twoslash
 * // @noErrors
 * import { Secp256k1, Value } from 'ox'
 * import { TxEnvelopeTempo } from 'ox/tempo'
 *
 * const envelope = TxEnvelopeTempo.from({
 *   chainId: 1,
 *   calls: [{
 *     data: '0xdeadbeef',
 *     to: '0x0000000000000000000000000000000000000000',
 *   }],
 *   maxFeePerGas: Value.fromGwei('10'),
 * })
 *
 * const signature = Secp256k1.sign({
 *   payload: TxEnvelopeTempo.getSignPayload(envelope),
 *   privateKey: '0x...',
 * })
 *
 * const serialized = TxEnvelopeTempo.serialize(envelope, { // [!code focus]
 *   signature, // [!code focus]
 * }) // [!code focus]
 *
 * // ... send `serialized` transaction to JSON-RPC `eth_sendRawTransaction`
 * ```
 *
 * @param envelope - The Transaction Envelope to serialize.
 * @param options - Options.
 * @returns The serialized Transaction Envelope.
 */
export function serialize(envelope, options = {}) {
    const { accessList, authorizationList, calls, chainId, feeToken, gas, keyAuthorization, nonce, nonceKey, maxFeePerGas, maxPriorityFeePerGas, validBefore, validAfter, } = envelope;
    assert(envelope);
    const accessTupleList = AccessList.toTupleList(accessList);
    const signature = options.signature || envelope.signature;
    const authorizationTupleList = AuthorizationTempo.toTupleList(authorizationList);
    // Encode calls as RLP list of [to, value, data] tuples
    const callsTupleList = calls.map((call) => [
        call.to ?? '0x',
        call.value ? Hex.fromNumber(call.value) : '0x',
        call.data ?? '0x',
    ]);
    const feePayerSignatureOrSender = (() => {
        // Explicit sender address provided — use as-is.
        if (options.sender)
            return options.sender;
        // When serializing in fee payer format and a signature is present,
        // derive the sender address from the signature so the fee payer proxy
        // knows which account to cover fees for.
        //
        // - secp256k1: recover address via ecrecover from the sign payload.
        // - p256/webAuthn: derive address from the embedded public key.
        // - keychain: use the explicit `userAddress` on the signature.
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
        // `null` indicates the envelope is intended to be signed by a fee payer
        // but hasn't been signed yet — encode as a single zero byte marker.
        if (feePayerSignature === null)
            return '0x00';
        // No fee payer involvement — omit from the envelope.
        if (!feePayerSignature)
            return '0x';
        // Fee payer has signed — encode the signature as an RLP tuple.
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
    return Hex.concat(options.format === 'feePayer' ? feePayerMagic : serializedType, Rlp.fromHex(serialized));
}
/**
 * Returns the payload to sign for a {@link ox#TxEnvelopeTempo.TxEnvelopeTempo}.
 *
 * Computes the keccak256 hash of the unsigned serialized transaction. Sign this payload
 * with secp256k1, P256, or WebAuthn, then attach the signature via {@link ox#TxEnvelopeTempo.(from:function)}.
 *
 * [Tempo Transaction Specification](https://docs.tempo.xyz/protocol/transactions/spec-tempo-transaction)
 *
 * @example
 * The example below demonstrates how to compute the sign payload which can be used
 * with ECDSA signing utilities like {@link ox#Secp256k1.(sign:function)}.
 *
 * ```ts twoslash
 * // @noErrors
 * import { Secp256k1 } from 'ox'
 * import { TxEnvelopeTempo } from 'ox/tempo'
 *
 * const envelope = TxEnvelopeTempo.from({
 *   chainId: 1,
 *   calls: [{
 *     data: '0xdeadbeef',
 *     to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   }],
 *   nonce: 0n,
 *   maxFeePerGas: 1000000000n,
 *   gas: 21000n,
 * })
 *
 * const payload = TxEnvelopeTempo.getSignPayload(envelope) // [!code focus]
 * // @log: '0x...'
 *
 * const signature = Secp256k1.sign({ payload, privateKey: '0x...' })
 * ```
 *
 * @param envelope - The transaction envelope to get the sign payload for.
 * @returns The sign payload.
 */
export function getSignPayload(envelope) {
    return hash(envelope, { presign: true });
}
/**
 * Hashes a {@link ox#TxEnvelopeTempo.TxEnvelopeTempo}. This is the "transaction hash".
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Secp256k1 } from 'ox'
 * import { TxEnvelopeTempo } from 'ox/tempo'
 *
 * const envelope = TxEnvelopeTempo.from({
 *   chainId: 1,
 *   calls: [{
 *     data: '0xdeadbeef',
 *     to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   }],
 *   nonce: 0n,
 *   maxFeePerGas: 1000000000n,
 *   gas: 21000n,
 * })
 *
 * const signature = Secp256k1.sign({
 *   payload: TxEnvelopeTempo.getSignPayload(envelope),
 *   privateKey: '0x...'
 * })
 *
 * const envelope_signed = TxEnvelopeTempo.from(envelope, { signature })
 *
 * const hash = TxEnvelopeTempo.hash(envelope_signed) // [!code focus]
 * ```
 *
 * @param envelope - The Tempo Transaction Envelope to hash.
 * @param options - Options.
 * @returns The hash of the transaction envelope.
 */
export function hash(envelope, options = {}) {
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
/**
 * Returns the fee payer payload to sign for a {@link ox#TxEnvelopeTempo.TxEnvelopeTempo}.
 *
 * Fee sponsorship uses a dual-signature scheme: the sender signs the transaction, then a fee payer
 * signs over the transaction with the sender's address to commit to paying fees. The fee payer's
 * signature includes the `feeToken` and `sender_address`, using magic byte `0x78` for domain separation.
 *
 * [Fee Payer Signature](https://docs.tempo.xyz/protocol/transactions/spec-tempo-transaction#fee-payer-signature)
 * [Fee Sponsorship Guide](https://docs.tempo.xyz/protocol/transactions#fee-sponsorship)
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Secp256k1 } from 'ox'
 * import { TxEnvelopeTempo } from 'ox/tempo'
 *
 * const envelope = TxEnvelopeTempo.from({
 *   chainId: 1,
 *   calls: [{
 *     data: '0xdeadbeef',
 *     to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   }],
 *   nonce: 0n,
 *   maxFeePerGas: 1000000000n,
 *   gas: 21000n,
 * })
 *
 * const payload = TxEnvelopeTempo.getFeePayerSignPayload(envelope, {
 *   sender: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'
 * }) // [!code focus]
 * // @log: '0x...'
 *
 * const signature = Secp256k1.sign({ payload, privateKey: '0x...' })
 * ```
 *
 * @param envelope - The transaction envelope to get the fee payer sign payload for.
 * @param options - Options.
 * @returns The fee payer sign payload.
 */
export function getFeePayerSignPayload(envelope, options) {
    const { sender } = options;
    const serialized = serialize({ ...envelope, signature: undefined }, {
        sender,
        format: 'feePayer',
    });
    return Hash.keccak256(serialized);
}
/**
 * Validates a {@link ox#TxEnvelopeTempo.TxEnvelopeTempo}. Returns `true` if the envelope is valid, `false` otherwise.
 *
 * @example
 * ```ts twoslash
 * import { TxEnvelopeTempo } from 'ox/tempo'
 *
 * const valid = TxEnvelopeTempo.validate({
 *   calls: [{
 *     data: '0xdeadbeef',
 *     to: '0x0000000000000000000000000000000000000000',
 *   }],
 *   chainId: 1,
 *   maxFeePerGas: 1000000000n,
 * })
 * // @log: true
 * ```
 *
 * @param envelope - The transaction envelope to validate.
 */
export function validate(envelope) {
    try {
        assert(envelope);
        return true;
    }
    catch {
        return false;
    }
}
/**
 * Thrown when a transaction's calls list is empty.
 *
 * @example
 * ```ts twoslash
 * import { TxEnvelopeTempo } from 'ox/tempo'
 *
 * TxEnvelopeTempo.assert({
 *   calls: [],
 *   chainId: 1,
 * })
 * // @error: TxEnvelopeTempo.CallsEmptyError: Calls list cannot be empty.
 * ```
 */
export class CallsEmptyError extends Errors.BaseError {
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
/**
 * Thrown when validBefore is not greater than validAfter.
 *
 * @example
 * ```ts twoslash
 * import { TxEnvelopeTempo } from 'ox/tempo'
 *
 * TxEnvelopeTempo.assert({
 *   calls: [{ to: '0x0000000000000000000000000000000000000000' }],
 *   chainId: 1,
 *   validBefore: 100,
 *   validAfter: 200,
 * })
 * // @error: TxEnvelopeTempo.InvalidValidityWindowError: validBefore (100) must be greater than validAfter (200).
 * ```
 */
export class InvalidValidityWindowError extends Errors.BaseError {
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
//# sourceMappingURL=TxEnvelopeTempo.js.map