"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.from = from;
exports.fromRpc = fromRpc;
exports.fromTuple = fromTuple;
exports.getSignPayload = getSignPayload;
exports.hash = hash;
exports.toRpc = toRpc;
exports.toTuple = toTuple;
const Hash = require("../core/Hash.js");
const Hex = require("../core/Hex.js");
const Rlp = require("../core/Rlp.js");
const SignatureEnvelope = require("./SignatureEnvelope.js");
function from(authorization, options = {}) {
    if (typeof authorization.expiry === 'string')
        return fromRpc(authorization);
    if (options.signature)
        return {
            ...authorization,
            signature: SignatureEnvelope.from(options.signature),
        };
    return authorization;
}
function fromRpc(authorization) {
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
function fromTuple(tuple) {
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
function getSignPayload(authorization) {
    return hash(authorization);
}
function hash(authorization) {
    const [authorizationTuple] = toTuple(authorization);
    const serialized = Rlp.fromHex(authorizationTuple);
    return Hash.keccak256(serialized);
}
function toRpc(authorization) {
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
function toTuple(authorization) {
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