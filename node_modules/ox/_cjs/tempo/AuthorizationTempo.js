"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.from = from;
exports.fromRpc = fromRpc;
exports.fromRpcList = fromRpcList;
exports.fromTuple = fromTuple;
exports.fromTupleList = fromTupleList;
exports.getSignPayload = getSignPayload;
exports.hash = hash;
exports.toRpc = toRpc;
exports.toRpcList = toRpcList;
exports.toTuple = toTuple;
exports.toTupleList = toTupleList;
const Hash = require("../core/Hash.js");
const Hex = require("../core/Hex.js");
const Rlp = require("../core/Rlp.js");
const SignatureEnvelope = require("./SignatureEnvelope.js");
function from(authorization, options = {}) {
    if (typeof authorization.chainId === 'string')
        return fromRpc(authorization);
    if (options.signature) {
        return { ...authorization, signature: options.signature };
    }
    return authorization;
}
function fromRpc(authorization) {
    const { address, chainId, nonce } = authorization;
    const signature = SignatureEnvelope.fromRpc(authorization.signature);
    return {
        address,
        chainId: Number(chainId),
        nonce: BigInt(nonce),
        signature,
    };
}
function fromRpcList(authorizationList) {
    return authorizationList.map((x) => fromRpc(x));
}
function fromTuple(tuple) {
    const [chainId, address, nonce, signatureSerialized] = tuple;
    const args = {
        address,
        chainId: chainId === '0x' ? 0 : Number(chainId),
        nonce: nonce === '0x' ? 0n : BigInt(nonce),
    };
    if (signatureSerialized)
        args.signature = SignatureEnvelope.deserialize(signatureSerialized);
    return from(args);
}
function fromTupleList(tupleList) {
    const list = [];
    for (const tuple of tupleList)
        list.push(fromTuple(tuple));
    return list;
}
function getSignPayload(authorization) {
    return hash(authorization, { presign: true });
}
function hash(authorization, options = {}) {
    const { presign } = options;
    return Hash.keccak256(Hex.concat('0x05', Rlp.fromHex(toTuple(presign
        ? {
            address: authorization.address,
            chainId: authorization.chainId,
            nonce: authorization.nonce,
        }
        : authorization))));
}
function toRpc(authorization) {
    const { address, chainId, nonce, signature } = authorization;
    return {
        address,
        chainId: Hex.fromNumber(chainId),
        nonce: Hex.fromNumber(nonce),
        signature: SignatureEnvelope.toRpc(signature),
    };
}
function toRpcList(authorizationList) {
    return authorizationList.map((x) => toRpc(x));
}
function toTuple(authorization) {
    const { address, chainId, nonce } = authorization;
    const signature = authorization.signature
        ? SignatureEnvelope.serialize(authorization.signature)
        : undefined;
    return [
        chainId ? Hex.fromNumber(chainId) : '0x',
        address,
        nonce ? Hex.fromNumber(nonce) : '0x',
        ...(signature ? [signature] : []),
    ];
}
function toTupleList(list) {
    if (!list || list.length === 0)
        return [];
    const tupleList = [];
    for (const authorization of list)
        tupleList.push(toTuple(authorization));
    return tupleList;
}
//# sourceMappingURL=AuthorizationTempo.js.map