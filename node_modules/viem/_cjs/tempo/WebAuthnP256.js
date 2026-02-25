"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCredential = createCredential;
exports.getCredential = getCredential;
const Bytes = require("ox/Bytes");
const PublicKey = require("ox/PublicKey");
const WebAuthnP256 = require("ox/WebAuthnP256");
async function createCredential(parameters) {
    const { createFn, label, rpId, userId } = parameters;
    const credential = await WebAuthnP256.createCredential({
        ...parameters,
        authenticatorSelection: {
            ...parameters.authenticatorSelection,
            requireResidentKey: true,
            residentKey: 'required',
            userVerification: 'required',
        },
        createFn,
        extensions: {
            ...parameters.extensions,
            credProps: true,
        },
        rp: rpId
            ? {
                id: rpId,
                name: rpId,
            }
            : undefined,
        name: undefined,
        user: {
            displayName: label,
            id: new Uint8Array(userId ?? Bytes.fromString(label)),
            name: label,
        },
    });
    return {
        id: credential.id,
        publicKey: PublicKey.toHex(credential.publicKey, {
            includePrefix: false,
        }),
        raw: credential.raw,
    };
}
async function getCredential(parameters) {
    const { metadata, raw, signature } = await WebAuthnP256.sign({
        ...parameters,
        challenge: parameters.hash ?? '0x',
    });
    const publicKey = await parameters.getPublicKey(raw);
    return {
        id: raw.id,
        metadata,
        publicKey,
        raw,
        signature,
    };
}
//# sourceMappingURL=WebAuthnP256.js.map