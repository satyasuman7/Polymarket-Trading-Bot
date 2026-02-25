import type * as Address from '../core/Address.js';
import type * as Errors from '../core/Errors.js';
import * as Hash from '../core/Hash.js';
import * as Hex from '../core/Hex.js';
import type { Compute } from '../core/internal/types.js';
import * as Rlp from '../core/Rlp.js';
import * as SignatureEnvelope from './SignatureEnvelope.js';
/**
 * Key authorization for provisioning access keys.
 *
 * Access keys allow a root key (e.g., a passkey) to delegate transaction signing to secondary
 * keys with customizable permissions including expiry timestamps and per-TIP-20 token spending
 * limits. This enables a user to sign transactions without repeated passkey prompts.
 *
 * The root key signs a `KeyAuthorization` to grant an access key permission to sign transactions
 * on its behalf. The authorization is attached to a transaction (which can be signed by the access
 * key itself), and the protocol validates the authorization before storing the key in the
 * AccountKeychain precompile.
 *
 * Key authorization fields:
 * - `address`: Address derived from the access key's public key (the "key ID")
 * - `chainId`: Chain ID for replay protection (0 = valid on any chain)
 * - `expiry`: Unix timestamp when the key expires (undefined = never expires)
 * - `limits`: Per-TIP-20 token spending limits (only applies to `transfer()` and `approve()` calls)
 * - `type`: Key type (`secp256k1`, `p256`, or `webAuthn`)
 *
 * [Access Keys Specification](https://docs.tempo.xyz/protocol/transactions/spec-tempo-transaction#access-keys)
 */
export type KeyAuthorization<signed extends boolean = boolean, bigintType = bigint, numberType = number> = {
    /** Address derived from the public key of the key type. */
    address: Address.Address;
    /** Chain ID for replay protection (0 = valid on any chain). */
    chainId?: bigintType | undefined;
    /** Unix timestamp when key expires (0 = never expires). */
    expiry?: numberType | null | undefined;
    /** TIP20 spending limits for this key. */
    limits?: readonly TokenLimit<bigintType>[] | undefined;
    /** Key type. (secp256k1, P256, WebAuthn). */
    type: SignatureEnvelope.Type;
} & (signed extends true ? {
    signature: SignatureEnvelope.SignatureEnvelope<bigintType, numberType>;
} : {
    signature?: SignatureEnvelope.SignatureEnvelope<bigintType, numberType> | undefined;
});
/** RPC representation of an {@link ox#KeyAuthorization.KeyAuthorization}. */
export type Rpc = Omit<KeyAuthorization<false, Hex.Hex, Hex.Hex>, 'address' | 'signature' | 'type'> & {
    keyId: Address.Address;
    keyType: SignatureEnvelope.Type;
    signature: SignatureEnvelope.SignatureEnvelopeRpc;
};
/** Signed representation of a Key Authorization. */
export type Signed<bigintType = bigint, numberType = number> = KeyAuthorization<true, bigintType, numberType>;
type BaseTuple = readonly [
    chainId: Hex.Hex,
    keyType: Hex.Hex,
    keyId: Address.Address
];
/** Tuple representation of a Key Authorization. */
export type Tuple<signed extends boolean = boolean> = signed extends true ? readonly [
    authorization: BaseTuple | readonly [...BaseTuple, expiry: Hex.Hex] | readonly [
        ...BaseTuple,
        expiry: Hex.Hex,
        limits: readonly [token: Address.Address, limit: Hex.Hex][]
    ],
    signature: Hex.Hex
] : readonly [
    authorization: BaseTuple | readonly [...BaseTuple, expiry: Hex.Hex] | readonly [
        ...BaseTuple,
        expiry: Hex.Hex,
        limits: readonly [token: Address.Address, limit: Hex.Hex][]
    ]
];
/**
 * Token spending limit for access keys.
 *
 * Defines a per-TIP-20 token spending limit for an access key. Limits deplete as tokens
 * are spent and can be updated by the root key via `updateSpendingLimit()`.
 *
 * [Access Keys Specification](https://docs.tempo.xyz/protocol/transactions/spec-tempo-transaction#access-keys)
 */
export type TokenLimit<bigintType = bigint> = {
    /** Address of the TIP-20 token. */
    token: Address.Address;
    /** Maximum spending amount for this token (enforced over the key's lifetime). */
    limit: bigintType;
};
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
export declare function from<const authorization extends KeyAuthorization | Rpc, const signature extends SignatureEnvelope.from.Value | undefined = undefined>(authorization: authorization | KeyAuthorization, options?: from.Options<signature>): from.ReturnType<authorization, signature>;
export declare namespace from {
    type Options<signature extends SignatureEnvelope.from.Value | undefined = SignatureEnvelope.from.Value | undefined> = {
        /** The {@link ox#SignatureEnvelope.SignatureEnvelope} to attach to the Key Authorization. */
        signature?: signature | SignatureEnvelope.SignatureEnvelope | undefined;
    };
    type ReturnType<authorization extends KeyAuthorization | Rpc = KeyAuthorization, signature extends SignatureEnvelope.from.Value | undefined = SignatureEnvelope.from.Value | undefined> = Compute<authorization extends Rpc ? Signed : authorization & (signature extends SignatureEnvelope.from.Value ? {
        signature: SignatureEnvelope.from.ReturnValue<signature>;
    } : {})>;
    type ErrorType = Errors.GlobalErrorType;
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
export declare function fromRpc(authorization: Rpc): Signed;
export declare namespace fromRpc {
    type ErrorType = Errors.GlobalErrorType;
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
export declare function fromTuple<const tuple extends Tuple>(tuple: tuple): fromTuple.ReturnType<tuple>;
export declare namespace fromTuple {
    type ReturnType<authorization extends Tuple = Tuple> = Compute<KeyAuthorization<authorization extends Tuple<true> ? true : false>>;
    type ErrorType = Errors.GlobalErrorType;
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
export declare function getSignPayload(authorization: KeyAuthorization): Hex.Hex;
export declare namespace getSignPayload {
    type ErrorType = hash.ErrorType | Errors.GlobalErrorType;
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
export declare function hash(authorization: KeyAuthorization): Hex.Hex;
export declare namespace hash {
    type ErrorType = toTuple.ErrorType | Hash.keccak256.ErrorType | Hex.concat.ErrorType | Rlp.fromHex.ErrorType | Errors.GlobalErrorType;
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
export declare function toRpc(authorization: Signed): Rpc;
export declare namespace toRpc {
    type ErrorType = Errors.GlobalErrorType;
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
export declare function toTuple<const authorization extends KeyAuthorization>(authorization: authorization): toTuple.ReturnType<authorization>;
export declare namespace toTuple {
    type ReturnType<authorization extends KeyAuthorization = KeyAuthorization> = Compute<Tuple<authorization extends KeyAuthorization<true> ? true : false>>;
    type ErrorType = Errors.GlobalErrorType;
}
export {};
//# sourceMappingURL=KeyAuthorization.d.ts.map