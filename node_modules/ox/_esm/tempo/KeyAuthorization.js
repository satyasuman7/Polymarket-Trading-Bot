import * as Hash from '../core/Hash.js';
import * as Hex from '../core/Hex.js';
import * as Rlp from '../core/Rlp.js';
import * as SignatureEnvelope from './SignatureEnvelope.js';
/**
 * Converts a Key Authorization object into a typed {@link ox#KeyAuthorization.KeyAuthorization}.
 *
 * Use this to create an unsigned key authorization, then sign it with the root key using
 * {@link ox#KeyAuthorization.(getSignPayload:function)} and attach the signature. The signed authorization
 * can be included in a {@link ox#TxEnvelopeTempo.TxEnvelopeTempo} via the
 * `keyAuthorization` field to provision the access key on-chain.
 *
 * [Access Keys Specification](https://docs.tempo.xyz/protocol/transactions/spec-tempo-transaction#access-keys)
 *
 * @example
 * ### Secp256k1 Key
 *
 * Standard Ethereum ECDSA key using the secp256k1 curve.
 *
 * ```ts twoslash
 * import { Address, Secp256k1, Value } from 'ox'
 * import { KeyAuthorization } from 'ox/tempo'
 *
 * const privateKey = Secp256k1.randomPrivateKey()
 * const address = Address.fromPublicKey(Secp256k1.getPublicKey({ privateKey }))
 *
 * const authorization = KeyAuthorization.from({
 *   address,
 *   expiry: 1234567890,
 *   type: 'secp256k1',
 *   limits: [{
 *     token: '0x20c0000000000000000000000000000000000001',
 *     limit: Value.from('10', 6),
 *   }],
 * })
 * ```
 *
 * @example
 * ### WebCryptoP256 Key
 *
 * ```ts twoslash
 * import { Address, WebCryptoP256, Value } from 'ox'
 * import { KeyAuthorization } from 'ox/tempo'
 *
 * const keyPair = await WebCryptoP256.createKeyPair()
 * const address = Address.fromPublicKey(keyPair.publicKey)
 *
 * const authorization = KeyAuthorization.from({
 *   address,
 *   expiry: 1234567890,
 *   type: 'p256',
 *   limits: [{
 *     token: '0x20c0000000000000000000000000000000000001',
 *     limit: Value.from('10', 6),
 *   }],
 * })
 * ```
 *
 * @example
 * ### Attaching Signatures (Secp256k1)
 *
 * Attach a signature to a Key Authorization using a Secp256k1 private key to
 * authorize another Secp256k1 key on the account.
 *
 * ```ts twoslash
 * import { Address, Secp256k1, Value } from 'ox'
 * import { KeyAuthorization } from 'ox/tempo'
 *
 * const privateKey = '0x...'
 * const address = Address.fromPublicKey(Secp256k1.getPublicKey({ privateKey }))
 *
 * const authorization = KeyAuthorization.from({
 *   address,
 *   expiry: 1234567890,
 *   type: 'secp256k1',
 *   limits: [{
 *     token: '0x20c0000000000000000000000000000000000001',
 *     limit: Value.from('10', 6),
 *   }],
 * })
 *
 * const rootPrivateKey = '0x...'
 * const signature = Secp256k1.sign({
 *   payload: KeyAuthorization.getSignPayload(authorization),
 *   privateKey: rootPrivateKey,
 * })
 *
 * const authorization_signed = KeyAuthorization.from(authorization, { signature })
 * ```
 *
 * @example
 * ### Attaching Signatures (WebAuthn)
 *
 * Attach a signature to a Key Authorization using a WebAuthn credential to
 * authorize a new WebCryptoP256 key on the account.
 *
 * ```ts twoslash
 * // @noErrors
 * import { Address, Value, WebCryptoP256, WebAuthnP256 } from 'ox'
 * import { KeyAuthorization, SignatureEnvelope } from 'ox/tempo'
 *
 * const keyPair = await WebCryptoP256.createKeyPair()
 * const address = Address.fromPublicKey(keyPair.publicKey)
 *
 * const authorization = KeyAuthorization.from({
 *   address,
 *   expiry: 1234567890,
 *   type: 'p256',
 *   limits: [{
 *     token: '0x20c0000000000000000000000000000000000001',
 *     limit: Value.from('10', 6),
 *   }],
 * })
 *
 * const credential = await WebAuthnP256.createCredential({ name: 'Example' })
 *
 * const { metadata, signature } = await WebAuthnP256.sign({
 *   challenge: KeyAuthorization.getSignPayload(authorization),
 *   credentialId: credential.id,
 * })
 *
 * const signatureEnvelope = SignatureEnvelope.from({ // [!code focus]
 *   signature, // [!code focus]
 *   publicKey: credential.publicKey, // [!code focus]
 *   metadata, // [!code focus]
 * })
 * const authorization_signed = KeyAuthorization.from(
 *   authorization,
 *   { signature: signatureEnvelope }, // [!code focus]
 * )
 * ```
 *
 * @param authorization - A Key Authorization tuple in object format.
 * @param options - Key Authorization options.
 * @returns The {@link ox#KeyAuthorization.KeyAuthorization}.
 */
export function from(authorization, options = {}) {
    if (typeof authorization.expiry === 'string')
        return fromRpc(authorization);
    if (options.signature)
        return {
            ...authorization,
            signature: SignatureEnvelope.from(options.signature),
        };
    return authorization;
}
/**
 * Converts an {@link ox#AuthorizationTempo.Rpc} to an {@link ox#AuthorizationTempo.AuthorizationTempo}.
 *
 * @example
 * ```ts twoslash
 * import { KeyAuthorization } from 'ox/tempo'
 *
 * const keyAuthorization = KeyAuthorization.fromRpc({
 *   expiry: '0x174876e800',
 *   keyId: '0xbe95c3f554e9fc85ec51be69a3d807a0d55bcf2c',
 *   keyType: 'secp256k1',
 *   limits: [{ token: '0x20c0000000000000000000000000000000000001', limit: '0xf4240' }],
 *   signature: {
 *     type: 'secp256k1',
 *     r: '0x635dc2033e60185bb36709c29c75d64ea51dfbd91c32ef4be198e4ceb169fb4d',
 *     s: '0x50c2667ac4c771072746acfdcf1f1483336dcca8bd2df47cd83175dbe60f0540',
 *     yParity: '0x0'
 *   },
 * })
 * ```
 *
 * @param authorization - The RPC-formatted Key Authorization.
 * @returns A signed {@link ox#AuthorizationTempo.AuthorizationTempo}.
 */
export function fromRpc(authorization) {
    const { chainId = '0x0', keyId, expiry = 0, limits, keyType } = authorization;
    const signature = SignatureEnvelope.fromRpc(authorization.signature);
    return {
        address: keyId,
        chainId: chainId === '0x' ? 0n : Hex.toBigInt(chainId),
        expiry: Number(expiry),
        limits: limits?.map((limit) => ({
            token: limit.token,
            limit: BigInt(limit.limit),
        })),
        signature,
        type: keyType,
    };
}
/**
 * Converts an {@link ox#KeyAuthorization.Tuple} to an {@link ox#KeyAuthorization.KeyAuthorization}.
 *
 * @example
 * ```ts twoslash
 * import { KeyAuthorization } from 'ox/tempo'
 *
 * const authorization = KeyAuthorization.fromTuple([
 *   [
 *     '0x',
 *     '0x00',
 *     '0xbe95c3f554e9fc85ec51be69a3d807a0d55bcf2c',
 *     '0x174876e800',
 *     [['0x20c0000000000000000000000000000000000001', '0xf4240']],
 *   ],
 *   '0x01a068a020a209d3d56c46f38cc50a33f704f4a9a10a59377f8dd762ac66910e9b907e865ad05c4035ab5792787d4a0297a43617ae897930a6fe4d822b8faea52064',
 * ])
 * ```
 *
 * @example
 * Unsigned Key Authorization tuple (no signature):
 *
 * ```ts twoslash
 * import { KeyAuthorization } from 'ox/tempo'
 *
 * const authorization = KeyAuthorization.fromTuple([
 *   [
 *     '0x',
 *     '0x00',
 *     '0xbe95c3f554e9fc85ec51be69a3d807a0d55bcf2c',
 *     '0x174876e800',
 *     [['0x20c0000000000000000000000000000000000001', '0xf4240']],
 *   ],
 * ])
 * ```
 *
 * @param tuple - The Key Authorization tuple.
 * @returns The {@link ox#KeyAuthorization.KeyAuthorization}.
 */
export function fromTuple(tuple) {
    const [authorization, signatureSerialized] = tuple;
    const [chainId, keyType_hex, keyId, expiry, limits] = authorization;
    const keyType = (() => {
        switch (keyType_hex) {
            case '0x':
            case '0x00':
                return 'secp256k1';
            case '0x01':
                return 'p256';
            case '0x02':
                return 'webAuthn';
            default:
                throw new Error(`Invalid key type: ${keyType_hex}`);
        }
    })();
    const args = {
        address: keyId,
        expiry: typeof expiry !== 'undefined' ? hexToNumber(expiry) : undefined,
        type: keyType,
        ...(chainId !== '0x' ? { chainId: Hex.toBigInt(chainId) } : {}),
        ...(typeof expiry !== 'undefined' ? { expiry: hexToNumber(expiry) } : {}),
        ...(typeof limits !== 'undefined'
            ? {
                limits: limits.map(([token, limit]) => ({
                    token,
                    limit: hexToBigint(limit),
                })),
            }
            : {}),
    };
    if (signatureSerialized)
        args.signature = SignatureEnvelope.deserialize(signatureSerialized);
    return from(args);
}
/**
 * Computes the sign payload for an {@link ox#KeyAuthorization.KeyAuthorization}.
 *
 * The root key must sign this payload to authorize the access key. The resulting signature
 * is attached to the key authorization via {@link ox#KeyAuthorization.(from:function)} with the
 * `signature` option.
 *
 * [Access Keys Specification](https://docs.tempo.xyz/protocol/transactions/spec-tempo-transaction#access-keys)
 *
 * @example
 * ```ts twoslash
 * import { Address, Secp256k1, Value } from 'ox'
 * import { KeyAuthorization } from 'ox/tempo'
 *
 * const privateKey = '0x...'
 * const address = Address.fromPublicKey(Secp256k1.getPublicKey({ privateKey }))
 *
 * const authorization = KeyAuthorization.from({
 *   address,
 *   expiry: 1234567890,
 *   type: 'secp256k1',
 *   limits: [{
 *     token: '0x20c0000000000000000000000000000000000001',
 *     limit: Value.from('10', 6),
 *   }],
 * })
 *
 * const payload = KeyAuthorization.getSignPayload(authorization) // [!code focus]
 * ```
 *
 * @param authorization - The {@link ox#KeyAuthorization.KeyAuthorization}.
 * @returns The sign payload.
 */
export function getSignPayload(authorization) {
    return hash(authorization);
}
/**
 * Computes the hash for an {@link ox#KeyAuthorization.KeyAuthorization}.
 *
 * @example
 * ```ts twoslash
 * import { KeyAuthorization } from 'ox/tempo'
 * import { Value } from 'ox'
 *
 * const authorization = KeyAuthorization.from({
 *   expiry: 1234567890,
 *   address: '0xbe95c3f554e9fc85ec51be69a3d807a0d55bcf2c',
 *   type: 'secp256k1',
 *   limits: [{
 *     token: '0x20c0000000000000000000000000000000000001',
 *     limit: Value.from('10', 6)
 *   }],
 * })
 *
 * const hash = KeyAuthorization.hash(authorization) // [!code focus]
 * ```
 *
 * @param authorization - The {@link ox#KeyAuthorization.KeyAuthorization}.
 * @returns The hash.
 */
export function hash(authorization) {
    const [authorizationTuple] = toTuple(authorization);
    const serialized = Rlp.fromHex(authorizationTuple);
    return Hash.keccak256(serialized);
}
/**
 * Converts an {@link ox#KeyAuthorization.KeyAuthorization} to an {@link ox#KeyAuthorization.Rpc}.
 *
 * @example
 * ```ts twoslash
 * import { KeyAuthorization } from 'ox/tempo'
 * import { Value } from 'ox'
 *
 * const authorization = KeyAuthorization.toRpc({
 *   expiry: 1234567890,
 *   address: '0xbe95c3f554e9fc85ec51be69a3d807a0d55bcf2c',
 *   type: 'secp256k1',
 *   limits: [{
 *     token: '0x20c0000000000000000000000000000000000001',
 *     limit: Value.from('10', 6)
 *   }],
 *   signature: {
 *     type: 'secp256k1',
 *     signature: {
 *       r: 44944627813007772897391531230081695102703289123332187696115181104739239197517n,
 *       s: 36528503505192438307355164441104001310566505351980369085208178712678799181120n,
 *       yParity: 0,
 *     },
 *   },
 * })
 * ```
 *
 * @param authorization - A Key Authorization.
 * @returns An RPC-formatted Key Authorization.
 */
export function toRpc(authorization) {
    const { address, chainId = 0n, expiry, limits, type, signature, } = authorization;
    return {
        chainId: chainId === 0n ? '0x' : Hex.fromNumber(chainId),
        expiry: typeof expiry === 'number' ? Hex.fromNumber(expiry) : null,
        limits: limits?.map(({ token, limit }) => ({
            token,
            limit: Hex.fromNumber(limit),
        })),
        keyId: address,
        signature: SignatureEnvelope.toRpc(signature),
        keyType: type,
    };
}
/**
 * Converts an {@link ox#KeyAuthorization.KeyAuthorization} to an {@link ox#KeyAuthorization.Tuple}.
 *
 * @example
 * ```ts twoslash
 * import { KeyAuthorization } from 'ox/tempo'
 * import { Value } from 'ox'
 *
 * const authorization = KeyAuthorization.from({
 *   expiry: 1234567890,
 *   address: '0xbe95c3f554e9fc85ec51be69a3d807a0d55bcf2c',
 *   type: 'secp256k1',
 *   limits: [{
 *     token: '0x20c0000000000000000000000000000000000001',
 *     limit: Value.from('10', 6)
 *   }],
 * })
 *
 * const tuple = KeyAuthorization.toTuple(authorization) // [!code focus]
 * // @log: [
 * // @log:   '0x174876e800',
 * // @log:   [['0x20c0000000000000000000000000000000000001', '0xf4240']],
 * // @log:   '0xbe95c3f554e9fc85ec51be69a3d807a0d55bcf2c',
 * // @log:   'secp256k1',
 * // @log: ]
 * ```
 *
 * @param authorization - The {@link ox#KeyAuthorization.KeyAuthorization}.
 * @returns A Tempo Key Authorization tuple.
 */
export function toTuple(authorization) {
    const { address, chainId = 0n, expiry, limits } = authorization;
    const signature = authorization.signature
        ? SignatureEnvelope.serialize(authorization.signature)
        : undefined;
    const type = (() => {
        switch (authorization.type) {
            case 'secp256k1':
                return '0x';
            case 'p256':
                return '0x01';
            case 'webAuthn':
                return '0x02';
            default:
                throw new Error(`Invalid key type: ${authorization.type}`);
        }
    })();
    const authorizationTuple = [
        bigintToHex(chainId),
        type,
        address,
        typeof expiry === 'number' ? numberToHex(expiry) : undefined,
        limits?.map((limit) => [limit.token, bigintToHex(limit.limit)]) ??
            undefined,
    ].filter(Boolean);
    return [authorizationTuple, ...(signature ? [signature] : [])];
}
function bigintToHex(value) {
    return value === 0n ? '0x' : Hex.fromNumber(value);
}
function numberToHex(value) {
    return value === 0 ? '0x' : Hex.fromNumber(value);
}
function hexToBigint(hex) {
    return hex === '0x' ? 0n : BigInt(hex);
}
function hexToNumber(hex) {
    return hex === '0x' ? 0 : Hex.toNumber(hex);
}
//# sourceMappingURL=KeyAuthorization.js.map