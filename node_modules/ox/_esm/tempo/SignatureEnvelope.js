import * as Address from '../core/Address.js';
import * as Errors from '../core/Errors.js';
import * as Hex from '../core/Hex.js';
import * as Json from '../core/Json.js';
import * as ox_P256 from '../core/P256.js';
import * as ox_Secp256k1 from '../core/Secp256k1.js';
import * as Signature from '../core/Signature.js';
import * as ox_WebAuthnP256 from '../core/WebAuthnP256.js';
/** Signature type identifiers for encoding/decoding */
const serializedP256Type = '0x01';
const serializedWebAuthnType = '0x02';
const serializedKeychainType = '0x03';
/** Serialized magic identifier for Tempo signature envelopes. */
export const magicBytes = '0x7777777777777777777777777777777777777777777777777777777777777777'; // 32 "T"s
/** List of supported signature types. */
export const types = ['secp256k1', 'p256', 'webAuthn'];
/**
 * Asserts that a {@link ox#SignatureEnvelope.SignatureEnvelope} is valid.
 *
 * @example
 * ```ts twoslash
 * import { SignatureEnvelope } from 'ox/tempo'
 *
 * SignatureEnvelope.assert({
 *   type: 'secp256k1',
 *   signature: {
 *     r: 0n,
 *     s: 0n,
 *     yParity: 0,
 *   },
 * })
 * ```
 *
 * @param envelope - The signature envelope to assert.
 * @throws `CoercionError` if the envelope type cannot be determined.
 */
export function assert(envelope) {
    const type = getType(envelope);
    if (type === 'secp256k1') {
        const secp256k1 = envelope;
        Signature.assert(secp256k1.signature);
        return;
    }
    if (type === 'p256') {
        const p256 = envelope;
        const missing = [];
        if (typeof p256.signature?.r !== 'bigint')
            missing.push('signature.r');
        if (typeof p256.signature?.s !== 'bigint')
            missing.push('signature.s');
        if (typeof p256.prehash !== 'boolean')
            missing.push('prehash');
        if (!p256.publicKey)
            missing.push('publicKey');
        else {
            if (typeof p256.publicKey.x !== 'bigint')
                missing.push('publicKey.x');
            if (typeof p256.publicKey.y !== 'bigint')
                missing.push('publicKey.y');
        }
        if (missing.length > 0)
            throw new MissingPropertiesError({ envelope, missing, type: 'p256' });
        return;
    }
    if (type === 'webAuthn') {
        const webauthn = envelope;
        const missing = [];
        if (typeof webauthn.signature?.r !== 'bigint')
            missing.push('signature.r');
        if (typeof webauthn.signature?.s !== 'bigint')
            missing.push('signature.s');
        if (!webauthn.metadata)
            missing.push('metadata');
        else {
            if (!webauthn.metadata.authenticatorData)
                missing.push('metadata.authenticatorData');
            if (!webauthn.metadata.clientDataJSON)
                missing.push('metadata.clientDataJSON');
        }
        if (!webauthn.publicKey)
            missing.push('publicKey');
        else {
            if (typeof webauthn.publicKey.x !== 'bigint')
                missing.push('publicKey.x');
            if (typeof webauthn.publicKey.y !== 'bigint')
                missing.push('publicKey.y');
        }
        if (missing.length > 0)
            throw new MissingPropertiesError({ envelope, missing, type: 'webAuthn' });
        return;
    }
    if (type === 'keychain') {
        const keychain = envelope;
        assert(keychain.inner);
        return;
    }
}
/**
 * Deserializes a hex-encoded signature envelope into a typed signature object.
 *
 * Wire format detection:
 * - 65 bytes (no prefix): secp256k1 signature
 * - Type `0x01` + 129 bytes: P256 signature (r, s, pubKeyX, pubKeyY, prehash)
 * - Type `0x02` + variable: WebAuthn signature (webauthnData, r, s, pubKeyX, pubKeyY)
 * - Type `0x03` + 20 bytes + inner: Keychain signature (userAddress + inner signature)
 *
 * [Signature Types](https://docs.tempo.xyz/protocol/transactions/spec-tempo-transaction#signature-types)
 *
 * @example
 * ```ts twoslash
 * import { SignatureEnvelope } from 'ox/tempo'
 *
 * const envelope = SignatureEnvelope.deserialize('0x...')
 * ```
 *
 * @param serialized - The hex-encoded signature envelope to deserialize.
 * @returns The deserialized signature envelope.
 * @throws `CoercionError` if the serialized value cannot be coerced to a valid signature envelope.
 */
export function deserialize(value) {
    const serialized = value.endsWith(magicBytes.slice(2))
        ? Hex.slice(value, 0, -Hex.size(magicBytes))
        : value;
    const size = Hex.size(serialized);
    // Backward compatibility: 65 bytes means secp256k1 without type identifier
    if (size === 65) {
        const signature = Signature.fromHex(serialized);
        Signature.assert(signature);
        return { signature, type: 'secp256k1' };
    }
    // For all other lengths, first byte is the type identifier
    const typeId = Hex.slice(serialized, 0, 1);
    const data = Hex.slice(serialized, 1);
    const dataSize = Hex.size(data);
    if (typeId === serializedP256Type) {
        // P256: 32 (r) + 32 (s) + 32 (pubKeyX) + 32 (pubKeyY) + 1 (prehash) = 129 bytes
        if (dataSize !== 129)
            throw new InvalidSerializedError({
                reason: `Invalid P256 signature envelope size: expected 129 bytes, got ${dataSize} bytes`,
                serialized,
            });
        return {
            publicKey: {
                prefix: 4,
                x: Hex.toBigInt(Hex.slice(data, 64, 96)),
                y: Hex.toBigInt(Hex.slice(data, 96, 128)),
            },
            prehash: Hex.toNumber(Hex.slice(data, 128, 129)) !== 0,
            signature: {
                r: Hex.toBigInt(Hex.slice(data, 0, 32)),
                s: Hex.toBigInt(Hex.slice(data, 32, 64)),
            },
            type: 'p256',
        };
    }
    if (typeId === serializedWebAuthnType) {
        // WebAuthn: variable (webauthnData) + 32 (r) + 32 (s) + 32 (pubKeyX) + 32 (pubKeyY)
        // Minimum: 128 bytes (at least some authenticator data + signature components)
        if (dataSize < 128)
            throw new InvalidSerializedError({
                reason: `Invalid WebAuthn signature envelope size: expected at least 128 bytes, got ${dataSize} bytes`,
                serialized,
            });
        const webauthnDataSize = dataSize - 128;
        const webauthnData = Hex.slice(data, 0, webauthnDataSize);
        // Parse webauthnData into authenticatorData and clientDataJSON
        // According to the Rust code, it's authenticatorData || clientDataJSON
        // We need to find the split point (minimum authenticatorData is 37 bytes)
        let authenticatorData;
        let clientDataJSON;
        // Try to find the JSON start (clientDataJSON should start with '{')
        for (let split = 37; split < webauthnDataSize; split++) {
            const potentialJson = Hex.toString(Hex.slice(webauthnData, split));
            if (potentialJson.startsWith('{') && potentialJson.endsWith('}')) {
                try {
                    JSON.parse(potentialJson);
                    authenticatorData = Hex.slice(webauthnData, 0, split);
                    clientDataJSON = potentialJson;
                    break;
                }
                catch { }
            }
        }
        if (!authenticatorData || !clientDataJSON)
            throw new InvalidSerializedError({
                reason: 'Unable to parse WebAuthn metadata: could not extract valid authenticatorData and clientDataJSON',
                serialized,
            });
        return {
            publicKey: {
                prefix: 4,
                x: Hex.toBigInt(Hex.slice(data, webauthnDataSize + 64, webauthnDataSize + 96)),
                y: Hex.toBigInt(Hex.slice(data, webauthnDataSize + 96, webauthnDataSize + 128)),
            },
            metadata: {
                authenticatorData,
                clientDataJSON,
            },
            signature: {
                r: Hex.toBigInt(Hex.slice(data, webauthnDataSize, webauthnDataSize + 32)),
                s: Hex.toBigInt(Hex.slice(data, webauthnDataSize + 32, webauthnDataSize + 64)),
            },
            type: 'webAuthn',
        };
    }
    if (typeId === serializedKeychainType) {
        const userAddress = Hex.slice(data, 0, 20);
        const inner = deserialize(Hex.slice(data, 20));
        return {
            userAddress,
            inner,
            type: 'keychain',
        };
    }
    throw new InvalidSerializedError({
        reason: `Unknown signature type identifier: ${typeId}. Expected ${serializedP256Type} (P256) or ${serializedWebAuthnType} (WebAuthn)`,
        serialized,
    });
}
/**
 * Coerces a value to a signature envelope.
 *
 * Accepts either a serialized hex string or an existing signature envelope object.
 * Use this to wrap raw signatures from {@link ox#Secp256k1.(sign:function)}, {@link ox#P256.(sign:function)},
 * {@link ox#WebCryptoP256.(sign:function)}, or {@link ox#WebAuthnP256.(sign:function)} into the envelope format
 * required by Tempo transactions.
 *
 * [Signature Types](https://docs.tempo.xyz/protocol/transactions/spec-tempo-transaction#signature-types)
 *
 * @example
 * ### Secp256k1
 *
 * Standard Ethereum ECDSA signature using the secp256k1 curve.
 *
 * ```ts twoslash
 * import { Secp256k1 } from 'ox'
 * import { SignatureEnvelope } from 'ox/tempo'
 *
 * const privateKey = Secp256k1.randomPrivateKey()
 * const signature = Secp256k1.sign({ payload: '0xdeadbeef', privateKey })
 *
 * const envelope = SignatureEnvelope.from(signature)
 * ```
 *
 * @example
 * ### P256
 *
 * ECDSA signature using the P-256 (secp256r1) curve. Requires embedding the
 * public key.
 *
 * ```ts twoslash
 * import { P256 } from 'ox'
 * import { SignatureEnvelope } from 'ox/tempo'
 *
 * const { privateKey, publicKey } = P256.createKeyPair()
 * const signature = P256.sign({ payload: '0xdeadbeef', privateKey })
 *
 * const envelope = SignatureEnvelope.from({
 *   signature,
 *   publicKey,
 * })
 * ```
 *
 * @example
 * ### P256 (WebCrypto)
 *
 * When using WebCrypto keys, `prehash` must be `true` since WebCrypto always
 * SHA256 hashes the digest before signing.
 *
 * ```ts twoslash
 * // @noErrors
 * import { WebCryptoP256 } from 'ox'
 * import { SignatureEnvelope } from 'ox/tempo'
 *
 * const { privateKey, publicKey } = await WebCryptoP256.createKeyPair()
 * const signature = await WebCryptoP256.sign({ payload: '0xdeadbeef', privateKey })
 *
 * const envelope = SignatureEnvelope.from({
 *   signature,
 *   publicKey,
 *   prehash: true,
 * })
 * ```
 *
 * @example
 * ### WebAuthn
 *
 * Passkey-based signature using WebAuthn. Includes authenticator metadata
 * (authenticatorData and clientDataJSON) along with the P-256 signature and
 * public key.
 *
 * ```ts twoslash
 * // @noErrors
 * import { WebAuthnP256 } from 'ox'
 * import { SignatureEnvelope } from 'ox/tempo'
 *
 * const credential = await WebAuthnP256.createCredential({
 *   name: 'Example',
 * })
 *
 * const { metadata, signature } = await WebAuthnP256.sign({
 *   challenge: '0xdeadbeef',
 *   credentialId: credential.id,
 * })
 *
 * const envelope = SignatureEnvelope.from({
 *   signature,
 *   publicKey: credential.publicKey,
 *   metadata,
 * })
 * ```
 *
 * @example
 * ### Keychain
 *
 * Wraps another signature type with a user address, used for delegated signing
 * via access keys on behalf of a root account.
 *
 * ```ts twoslash
 * import { Secp256k1 } from 'ox'
 * import { SignatureEnvelope } from 'ox/tempo'
 *
 * const privateKey = Secp256k1.randomPrivateKey()
 * const signature = Secp256k1.sign({ payload: '0xdeadbeef', privateKey })
 *
 * const envelope = SignatureEnvelope.from({
 *   userAddress: '0x1234567890123456789012345678901234567890',
 *   inner: SignatureEnvelope.from(signature),
 * })
 * ```
 *
 * @param value - The value to coerce (either a hex string or signature envelope).
 * @returns The signature envelope.
 */
export function from(value) {
    if (typeof value === 'string')
        return deserialize(value);
    if (typeof value === 'object' &&
        value !== null &&
        'r' in value &&
        's' in value &&
        'yParity' in value)
        return { signature: value, type: 'secp256k1' };
    const type = getType(value);
    return {
        ...value,
        ...(type === 'p256' ? { prehash: value.prehash } : {}),
        type,
    };
}
/**
 * Converts an RPC-formatted signature envelope to a typed signature envelope.
 *
 * @example
 * ```ts twoslash
 * import { SignatureEnvelope } from 'ox/tempo'
 *
 * const envelope = SignatureEnvelope.fromRpc({
 *   r: '0x0',
 *   s: '0x0',
 *   yParity: '0x0',
 *   type: 'secp256k1',
 * })
 * ```
 *
 * @param envelope - The RPC signature envelope to convert.
 * @returns The signature envelope with bigint values.
 */
export function fromRpc(envelope) {
    if (envelope.type === 'secp256k1')
        return {
            signature: Signature.fromRpc(envelope),
            type: 'secp256k1',
        };
    if (envelope.type === 'p256') {
        return {
            prehash: envelope.preHash,
            publicKey: {
                prefix: 4,
                x: Hex.toBigInt(envelope.pubKeyX),
                y: Hex.toBigInt(envelope.pubKeyY),
            },
            signature: {
                r: Hex.toBigInt(envelope.r),
                s: Hex.toBigInt(envelope.s),
            },
            type: 'p256',
        };
    }
    if (envelope.type === 'webAuthn') {
        const webauthnData = envelope.webauthnData;
        const webauthnDataSize = Hex.size(webauthnData);
        // Parse webauthnData into authenticatorData and clientDataJSON
        let authenticatorData;
        let clientDataJSON;
        // Try to find the JSON start (clientDataJSON should start with '{')
        for (let split = 37; split < webauthnDataSize; split++) {
            const potentialJson = Hex.toString(Hex.slice(webauthnData, split));
            if (potentialJson.startsWith('{') && potentialJson.endsWith('}')) {
                try {
                    JSON.parse(potentialJson);
                    authenticatorData = Hex.slice(webauthnData, 0, split);
                    clientDataJSON = potentialJson;
                    break;
                }
                catch { }
            }
        }
        if (!authenticatorData || !clientDataJSON)
            throw new InvalidSerializedError({
                reason: 'Unable to parse WebAuthn metadata: could not extract valid authenticatorData and clientDataJSON',
                serialized: webauthnData,
            });
        return {
            metadata: {
                authenticatorData,
                clientDataJSON,
            },
            publicKey: {
                prefix: 4,
                x: Hex.toBigInt(envelope.pubKeyX),
                y: Hex.toBigInt(envelope.pubKeyY),
            },
            signature: {
                r: Hex.toBigInt(envelope.r),
                s: Hex.toBigInt(envelope.s),
            },
            type: 'webAuthn',
        };
    }
    if (envelope.type === 'keychain' ||
        ('userAddress' in envelope && 'signature' in envelope))
        return {
            type: 'keychain',
            userAddress: envelope.userAddress,
            inner: fromRpc(envelope.signature),
        };
    throw new CoercionError({ envelope });
}
/**
 * Determines the signature type of an envelope.
 *
 * @example
 * ```ts twoslash
 * import { SignatureEnvelope } from 'ox/tempo'
 *
 * const type = SignatureEnvelope.getType({
 *   signature: { r: 0n, s: 0n, yParity: 0 },
 * })
 * // @log: 'secp256k1'
 * ```
 *
 * @param envelope - The signature envelope to inspect.
 * @returns The signature type ('secp256k1', 'p256', or 'webAuthn').
 * @throws `CoercionError` if the envelope type cannot be determined.
 */
export function getType(envelope) {
    if (typeof envelope !== 'object' || envelope === null)
        throw new CoercionError({ envelope });
    if ('type' in envelope && envelope.type)
        return envelope.type;
    // Detect secp256k1 signature (backwards compatibility: also support flat structure)
    if ('signature' in envelope &&
        !('publicKey' in envelope) &&
        typeof envelope.signature === 'object' &&
        envelope.signature !== null &&
        'r' in envelope.signature &&
        's' in envelope.signature &&
        'yParity' in envelope.signature)
        return 'secp256k1';
    // Detect secp256k1 signature (flat structure)
    if ('r' in envelope && 's' in envelope && 'yParity' in envelope)
        return 'secp256k1';
    // Detect P256 signature
    if ('signature' in envelope &&
        'prehash' in envelope &&
        'publicKey' in envelope &&
        typeof envelope.prehash === 'boolean')
        return 'p256';
    // Detect WebAuthn signature
    if ('signature' in envelope &&
        'metadata' in envelope &&
        'publicKey' in envelope)
        return 'webAuthn';
    // Detect Keychain signature
    if ('userAddress' in envelope && 'inner' in envelope)
        return 'keychain';
    throw new CoercionError({
        envelope,
    });
}
/**
 * Serializes a signature envelope to a hex-encoded string.
 *
 * Wire format:
 * - secp256k1: 65 bytes (no type prefix, for backward compatibility)
 * - P256: `0x01` + r (32) + s (32) + pubKeyX (32) + pubKeyY (32) + prehash (1) = 130 bytes
 * - WebAuthn: `0x02` + webauthnData (variable) + r (32) + s (32) + pubKeyX (32) + pubKeyY (32)
 * - Keychain: `0x03` + userAddress (20) + inner signature (recursive)
 *
 * [Signature Types](https://docs.tempo.xyz/protocol/transactions/spec-tempo-transaction#signature-types)
 *
 * @example
 * ```ts twoslash
 * import { SignatureEnvelope } from 'ox/tempo'
 *
 * const serialized = SignatureEnvelope.serialize({
 *   signature: { r: 0n, s: 0n, yParity: 0 },
 *   type: 'secp256k1',
 * })
 * ```
 *
 * @param envelope - The signature envelope to serialize.
 * @returns The hex-encoded serialized signature.
 * @throws `CoercionError` if the envelope cannot be serialized.
 */
export function serialize(envelope, options = {}) {
    const type = getType(envelope);
    // Backward compatibility: no type identifier for secp256k1
    if (type === 'secp256k1') {
        const secp256k1 = envelope;
        return Hex.concat(Signature.toHex(secp256k1.signature), options.magic ? magicBytes : '0x');
    }
    if (type === 'p256') {
        const p256 = envelope;
        // Format: 1 byte (type) + 32 (r) + 32 (s) + 32 (pubKeyX) + 32 (pubKeyY) + 1 (prehash)
        return Hex.concat(serializedP256Type, Hex.fromNumber(p256.signature.r, { size: 32 }), Hex.fromNumber(p256.signature.s, { size: 32 }), Hex.fromNumber(p256.publicKey.x, { size: 32 }), Hex.fromNumber(p256.publicKey.y, { size: 32 }), Hex.fromNumber(p256.prehash ? 1 : 0, { size: 1 }), options.magic ? magicBytes : '0x');
    }
    if (type === 'webAuthn') {
        const webauthn = envelope;
        // Format: 1 byte (type) + variable (authenticatorData || clientDataJSON) + 32 (r) + 32 (s) + 32 (pubKeyX) + 32 (pubKeyY)
        const webauthnData = Hex.concat(webauthn.metadata.authenticatorData, Hex.fromString(webauthn.metadata.clientDataJSON));
        return Hex.concat(serializedWebAuthnType, webauthnData, Hex.fromNumber(webauthn.signature.r, { size: 32 }), Hex.fromNumber(webauthn.signature.s, { size: 32 }), Hex.fromNumber(webauthn.publicKey.x, { size: 32 }), Hex.fromNumber(webauthn.publicKey.y, { size: 32 }), options.magic ? magicBytes : '0x');
    }
    if (type === 'keychain') {
        const keychain = envelope;
        return Hex.concat(serializedKeychainType, keychain.userAddress, serialize(keychain.inner), options.magic ? magicBytes : '0x');
    }
    throw new CoercionError({ envelope });
}
/**
 * Converts a signature envelope to RPC format.
 *
 * @example
 * ```ts twoslash
 * import { SignatureEnvelope } from 'ox/tempo'
 *
 * const rpc = SignatureEnvelope.toRpc({
 *   signature: { r: 0n, s: 0n, yParity: 0 },
 *   type: 'secp256k1',
 * })
 * ```
 *
 * @param envelope - The signature envelope to convert.
 * @returns The RPC signature envelope with hex values.
 */
export function toRpc(envelope) {
    const type = getType(envelope);
    if (type === 'secp256k1') {
        const secp256k1 = envelope;
        return {
            ...Signature.toRpc(secp256k1.signature),
            type: 'secp256k1',
        };
    }
    if (type === 'p256') {
        const p256 = envelope;
        return {
            preHash: p256.prehash,
            pubKeyX: Hex.fromNumber(p256.publicKey.x, { size: 32 }),
            pubKeyY: Hex.fromNumber(p256.publicKey.y, { size: 32 }),
            r: Hex.fromNumber(p256.signature.r, { size: 32 }),
            s: Hex.fromNumber(p256.signature.s, { size: 32 }),
            type: 'p256',
        };
    }
    if (type === 'webAuthn') {
        const webauthn = envelope;
        const webauthnData = Hex.concat(webauthn.metadata.authenticatorData, Hex.fromString(webauthn.metadata.clientDataJSON));
        return {
            pubKeyX: Hex.fromNumber(webauthn.publicKey.x, { size: 32 }),
            pubKeyY: Hex.fromNumber(webauthn.publicKey.y, { size: 32 }),
            r: Hex.fromNumber(webauthn.signature.r, { size: 32 }),
            s: Hex.fromNumber(webauthn.signature.s, { size: 32 }),
            type: 'webAuthn',
            webauthnData,
        };
    }
    if (type === 'keychain') {
        const keychain = envelope;
        return {
            type: 'keychain',
            userAddress: keychain.userAddress,
            signature: toRpc(keychain.inner),
        };
    }
    throw new CoercionError({ envelope });
}
/**
 * Validates a signature envelope. Returns `true` if the envelope is valid, `false` otherwise.
 *
 * @example
 * ```ts twoslash
 * import { SignatureEnvelope } from 'ox/tempo'
 *
 * const valid = SignatureEnvelope.validate({
 *   signature: { r: 0n, s: 0n, yParity: 0 },
 *   type: 'secp256k1',
 * })
 * // @log: true
 * ```
 *
 * @param envelope - The signature envelope to validate.
 * @returns `true` if valid, `false` otherwise.
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
 * Verifies a signature envelope against a digest/payload.
 *
 * Supports `secp256k1`, `p256`, and `webAuthn` signature types.
 *
 * :::warning
 * `keychain` signatures are not supported and will throw an error.
 * :::
 *
 * @example
 * ### Secp256k1
 *
 * ```ts twoslash
 * import { SignatureEnvelope } from 'ox/tempo'
 * import { Secp256k1 } from 'ox'
 *
 * const privateKey = Secp256k1.randomPrivateKey()
 * const publicKey = Secp256k1.getPublicKey({ privateKey })
 * const payload = '0xdeadbeef'
 *
 * const signature = Secp256k1.sign({ payload, privateKey })
 * const envelope = SignatureEnvelope.from(signature)
 *
 * const valid = SignatureEnvelope.verify(envelope, {
 *   payload,
 *   publicKey,
 * })
 * // @log: true
 * ```
 *
 * @example
 * ### P256
 *
 * For P256 signatures, the `address` or `publicKey` must match the embedded
 * public key in the signature envelope.
 *
 * ```ts twoslash
 * import { SignatureEnvelope } from 'ox/tempo'
 * import { P256 } from 'ox'
 *
 * const privateKey = P256.randomPrivateKey()
 * const publicKey = P256.getPublicKey({ privateKey })
 * const payload = '0xdeadbeef'
 *
 * const signature = P256.sign({ payload, privateKey })
 * const envelope = SignatureEnvelope.from({ prehash: false, publicKey, signature })
 *
 * const valid = SignatureEnvelope.verify(envelope, {
 *   payload,
 *   publicKey,
 * })
 * // @log: true
 * ```
 *
 * @example
 * ### WebCryptoP256
 *
 * ```ts twoslash
 * import { SignatureEnvelope } from 'ox/tempo'
 * import { WebCryptoP256 } from 'ox'
 *
 * const { privateKey, publicKey } = await WebCryptoP256.createKeyPair()
 * const payload = '0xdeadbeef'
 *
 * const signature = await WebCryptoP256.sign({ payload, privateKey })
 * const envelope = SignatureEnvelope.from({ prehash: true, publicKey, signature })
 *
 * const valid = SignatureEnvelope.verify(envelope, {
 *   payload,
 *   publicKey,
 * })
 * // @log: true
 * ```
 *
 * @example
 * ### WebAuthnP256
 *
 * ```ts twoslash
 * import { SignatureEnvelope } from 'ox/tempo'
 * import { WebAuthnP256 } from 'ox'
 *
 * const credential = await WebAuthnP256.createCredential({ name: 'Example' })
 * const payload = '0xdeadbeef'
 *
 * const { metadata, signature } = await WebAuthnP256.sign({
 *   challenge: payload,
 *   credentialId: credential.id,
 * })
 * const envelope = SignatureEnvelope.from({
 *   metadata,
 *   signature,
 *   publicKey: credential.publicKey,
 * })
 *
 * const valid = SignatureEnvelope.verify(envelope, {
 *   payload,
 *   publicKey: credential.publicKey,
 * })
 * // @log: true
 * ```
 *
 * @param parameters - Verification parameters.
 * @returns `true` if the signature is valid, `false` otherwise.
 */
export function verify(signature, parameters) {
    const { payload } = parameters;
    const address = (() => {
        if (parameters.address)
            return parameters.address;
        if (parameters.publicKey)
            return Address.fromPublicKey(parameters.publicKey);
        return undefined;
    })();
    if (!address)
        return false;
    const envelope = from(signature);
    if (envelope.type === 'secp256k1') {
        if (!address)
            return false;
        return ox_Secp256k1.verify({
            address,
            payload,
            signature: envelope.signature,
        });
    }
    if (envelope.type === 'p256') {
        const envelopeAddress = Address.fromPublicKey(envelope.publicKey);
        if (!Address.isEqual(envelopeAddress, address))
            return false;
        return ox_P256.verify({
            hash: envelope.prehash,
            publicKey: envelope.publicKey,
            payload,
            signature: envelope.signature,
        });
    }
    if (envelope.type === 'webAuthn') {
        const envelopeAddress = Address.fromPublicKey(envelope.publicKey);
        if (!Address.isEqual(envelopeAddress, address))
            return false;
        return ox_WebAuthnP256.verify({
            challenge: Hex.from(payload),
            metadata: envelope.metadata,
            publicKey: envelope.publicKey,
            signature: envelope.signature,
        });
    }
    throw new VerificationError(`Unable to verify signature envelope of type "${envelope.type}".`);
}
/**
 * Error thrown when a signature envelope cannot be coerced to a valid type.
 */
export class CoercionError extends Errors.BaseError {
    constructor({ envelope }) {
        super(`Unable to coerce value (\`${Json.stringify(envelope)}\`) to a valid signature envelope.`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'SignatureEnvelope.CoercionError'
        });
    }
}
/**
 * Error thrown when a signature envelope is missing required properties.
 */
export class MissingPropertiesError extends Errors.BaseError {
    constructor({ envelope, missing, type, }) {
        super(`Signature envelope of type "${type}" is missing required properties: ${missing.map((m) => `\`${m}\``).join(', ')}.\n\nProvided: ${Json.stringify(envelope)}`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'SignatureEnvelope.MissingPropertiesError'
        });
    }
}
/**
 * Error thrown when a serialized signature envelope cannot be deserialized.
 */
export class InvalidSerializedError extends Errors.BaseError {
    constructor({ reason, serialized, }) {
        super(`Unable to deserialize signature envelope: ${reason}`, {
            metaMessages: [`Serialized: ${serialized}`],
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'SignatureEnvelope.InvalidSerializedError'
        });
    }
}
/**
 * Error thrown when a signature envelope fails to verify.
 */
export class VerificationError extends Errors.BaseError {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'SignatureEnvelope.VerificationError'
        });
    }
}
//# sourceMappingURL=SignatureEnvelope.js.map