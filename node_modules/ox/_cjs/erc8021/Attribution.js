"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ercSuffixSize = exports.ercSuffix = void 0;
exports.getSchemaId = getSchemaId;
exports.toDataSuffix = toDataSuffix;
exports.fromData = fromData;
const Hex = require("../core/Hex.js");
exports.ercSuffix = '0x80218021802180218021802180218021';
exports.ercSuffixSize = Hex.size(exports.ercSuffix);
function getSchemaId(attribution) {
    if ('codeRegistry' in attribution)
        return 1;
    return 0;
}
function toDataSuffix(attribution) {
    const codesHex = Hex.fromString(attribution.codes.join(','));
    const codesLength = Hex.size(codesHex);
    const codesLengthHex = Hex.fromNumber(codesLength, { size: 1 });
    const schemaId = getSchemaId(attribution);
    const schemaIdHex = Hex.fromNumber(schemaId, { size: 1 });
    if (schemaId === 1) {
        const schema1 = attribution;
        return Hex.concat(registryToData(schema1.codeRegistry), codesHex, codesLengthHex, schemaIdHex, exports.ercSuffix);
    }
    return Hex.concat(codesHex, codesLengthHex, schemaIdHex, exports.ercSuffix);
}
function fromData(data) {
    const minSize = exports.ercSuffixSize + 1 + 1;
    if (Hex.size(data) < minSize)
        return undefined;
    const suffix = Hex.slice(data, -exports.ercSuffixSize);
    if (suffix !== exports.ercSuffix)
        return undefined;
    const schemaIdHex = Hex.slice(data, -exports.ercSuffixSize - 1, -exports.ercSuffixSize);
    const schemaId = Hex.toNumber(schemaIdHex);
    if (schemaId === 0) {
        const codesLengthHex = Hex.slice(data, -exports.ercSuffixSize - 2, -exports.ercSuffixSize - 1);
        const codesLength = Hex.toNumber(codesLengthHex);
        const codesStart = -exports.ercSuffixSize - 2 - codesLength;
        const codesEnd = -exports.ercSuffixSize - 2;
        const codesHex = Hex.slice(data, codesStart, codesEnd);
        const codesString = Hex.toString(codesHex);
        const codes = codesString.length > 0 ? codesString.split(',') : [];
        return { codes, id: 0 };
    }
    if (schemaId === 1) {
        const codesLengthHex = Hex.slice(data, -exports.ercSuffixSize - 2, -exports.ercSuffixSize - 1);
        const codesLength = Hex.toNumber(codesLengthHex);
        const codesStart = -exports.ercSuffixSize - 2 - codesLength;
        const codesEnd = -exports.ercSuffixSize - 2;
        const codesHex = Hex.slice(data, codesStart, codesEnd);
        const codesString = Hex.toString(codesHex);
        const codes = codesString.length > 0 ? codesString.split(',') : [];
        const codeRegistry = registryFromData(Hex.slice(data, 0, codesStart));
        if (codeRegistry === undefined)
            return undefined;
        return {
            codes,
            codeRegistry,
            id: 1,
        };
    }
    return undefined;
}
function registryFromData(data) {
    const minRegistrySize = 20 + 1;
    if (Hex.size(data) < minRegistrySize)
        return undefined;
    const chainIdLenHex = Hex.slice(data, -1);
    const chainIdLen = Hex.toNumber(chainIdLenHex);
    if (chainIdLen === 0)
        return undefined;
    const totalRegistrySize = 20 + chainIdLen + 1;
    if (Hex.size(data) < totalRegistrySize)
        return undefined;
    const addressStart = -(chainIdLen + 1 + 20);
    const addressEnd = -(chainIdLen + 1);
    const addressHex = Hex.slice(data, addressStart, addressEnd);
    const chainIdHex = Hex.slice(data, -(chainIdLen + 1), -1);
    const codeRegistry = {
        address: addressHex,
        chainId: Hex.toNumber(chainIdHex),
    };
    return codeRegistry;
}
function registryToData(registry) {
    const chainIdAsHex = Hex.fromNumber(registry.chainId);
    const chainIdLen = Hex.size(chainIdAsHex);
    const paddedChainId = Hex.padLeft(chainIdAsHex, chainIdLen);
    return Hex.concat(registry.address, paddedChainId, Hex.fromNumber(chainIdLen, { size: 1 }));
}
//# sourceMappingURL=Attribution.js.map