"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationError = exports.InvalidSerializedError = exports.MissingPropertiesError = exports.CoercionError = exports.types = exports.magicBytes = void 0;
exports.assert = assert;
exports.deserialize = deserialize;
exports.from = from;
exports.fromRpc = fromRpc;
exports.getType = getType;
exports.serialize = serialize;
exports.toRpc = toRpc;
exports.validate = validate;
exports.verify = verify;
const Address = require("../core/Address.js");
const Errors = require("../core/Errors.js");
const Hex = require("../core/Hex.js");
const Json = require("../core/Json.js");
const ox_P256 = require("../core/P256.js");
const ox_Secp256k1 = require("../core/Secp256k1.js");
const Signature = require("../core/Signature.js");
const ox_WebAuthnP256 = require("../core/WebAuthnP256.js");
const serializedP256Type = '0x01';
const serializedWebAuthnType = '0x02';
const serializedKeychainType = '0x03';
exports.magicBytes = '0x7777777777777777777777777777777777777777777777777777777777777777';
exports.types = ['secp256k1', 'p256', 'webAuthn'];
function assert(envelope) {
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
function deserialize(value) {
    const serialized = value.endsWith(exports.magicBytes.slice(2))
        ? Hex.slice(value, 0, -Hex.size(exports.magicBytes))
        : value;
    const size = Hex.size(serialized);
    if (size === 65) {
        const signature = Signature.fromHex(serialized);
        Signature.assert(signature);
        return { signature, type: 'secp256k1' };
    }
    const typeId = Hex.slice(serialized, 0, 1);
    const data = Hex.slice(serialized, 1);
    const dataSize = Hex.size(data);
    if (typeId === serializedP256Type) {
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
        if (dataSize < 128)
            throw new InvalidSerializedError({
                reason: `Invalid WebAuthn signature envelope size: expected at least 128 bytes, got ${dataSize} bytes`,
                serialized,
            });
        const webauthnDataSize = dataSize - 128;
        const webauthnData = Hex.slice(data, 0, webauthnDataSize);
        let authenticatorData;
        let clientDataJSON;
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
function from(value) {
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
function fromRpc(envelope) {
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
        let authenticatorData;
        let clientDataJSON;
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
function getType(envelope) {
    if (typeof envelope !== 'object' || envelope === null)
        throw new CoercionError({ envelope });
    if ('type' in envelope && envelope.type)
        return envelope.type;
    if ('signature' in envelope &&
        !('publicKey' in envelope) &&
        typeof envelope.signature === 'object' &&
        envelope.signature !== null &&
        'r' in envelope.signature &&
        's' in envelope.signature &&
        'yParity' in envelope.signature)
        return 'secp256k1';
    if ('r' in envelope && 's' in envelope && 'yParity' in envelope)
        return 'secp256k1';
    if ('signature' in envelope &&
        'prehash' in envelope &&
        'publicKey' in envelope &&
        typeof envelope.prehash === 'boolean')
        return 'p256';
    if ('signature' in envelope &&
        'metadata' in envelope &&
        'publicKey' in envelope)
        return 'webAuthn';
    if ('userAddress' in envelope && 'inner' in envelope)
        return 'keychain';
    throw new CoercionError({
        envelope,
    });
}
function serialize(envelope, options = {}) {
    const type = getType(envelope);
    if (type === 'secp256k1') {
        const secp256k1 = envelope;
        return Hex.concat(Signature.toHex(secp256k1.signature), options.magic ? exports.magicBytes : '0x');
    }
    if (type === 'p256') {
        const p256 = envelope;
        return Hex.concat(serializedP256Type, Hex.fromNumber(p256.signature.r, { size: 32 }), Hex.fromNumber(p256.signature.s, { size: 32 }), Hex.fromNumber(p256.publicKey.x, { size: 32 }), Hex.fromNumber(p256.publicKey.y, { size: 32 }), Hex.fromNumber(p256.prehash ? 1 : 0, { size: 1 }), options.magic ? exports.magicBytes : '0x');
    }
    if (type === 'webAuthn') {
        const webauthn = envelope;
        const webauthnData = Hex.concat(webauthn.metadata.authenticatorData, Hex.fromString(webauthn.metadata.clientDataJSON));
        return Hex.concat(serializedWebAuthnType, webauthnData, Hex.fromNumber(webauthn.signature.r, { size: 32 }), Hex.fromNumber(webauthn.signature.s, { size: 32 }), Hex.fromNumber(webauthn.publicKey.x, { size: 32 }), Hex.fromNumber(webauthn.publicKey.y, { size: 32 }), options.magic ? exports.magicBytes : '0x');
    }
    if (type === 'keychain') {
        const keychain = envelope;
        return Hex.concat(serializedKeychainType, keychain.userAddress, serialize(keychain.inner), options.magic ? exports.magicBytes : '0x');
    }
    throw new CoercionError({ envelope });
}
function toRpc(envelope) {
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
function validate(envelope) {
    try {
        assert(envelope);
        return true;
    }
    catch {
        return false;
    }
}
function verify(signature, parameters) {
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
class CoercionError extends Errors.BaseError {
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
exports.CoercionError = CoercionError;
class MissingPropertiesError extends Errors.BaseError {
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
exports.MissingPropertiesError = MissingPropertiesError;
class InvalidSerializedError extends Errors.BaseError {
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
exports.InvalidSerializedError = InvalidSerializedError;
class VerificationError extends Errors.BaseError {
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
exports.VerificationError = VerificationError;
//# sourceMappingURL=SignatureEnvelope.js.map