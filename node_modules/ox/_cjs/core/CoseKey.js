"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCoseKeyError = void 0;
exports.fromPublicKey = fromPublicKey;
exports.toPublicKey = toPublicKey;
const Cbor = require("./Cbor.js");
const Errors = require("./Errors.js");
const PublicKey = require("./PublicKey.js");
function fromPublicKey(publicKey) {
    const pkBytes = PublicKey.toBytes(publicKey);
    const x = pkBytes.slice(1, 33);
    const y = pkBytes.slice(33, 65);
    return Cbor.encode(new Map([
        [1, 2],
        [3, -7],
        [-1, 1],
        [-2, x],
        [-3, y],
    ]));
}
function toPublicKey(coseKey) {
    const decoded = Cbor.decode(coseKey);
    const x = decoded['-2'];
    const y = decoded['-3'];
    if (!(x instanceof Uint8Array) || !(y instanceof Uint8Array))
        throw new InvalidCoseKeyError();
    return PublicKey.from(new Uint8Array([0x04, ...x, ...y]));
}
class InvalidCoseKeyError extends Errors.BaseError {
    constructor() {
        super('COSE_Key does not contain valid P256 public key coordinates.');
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'CoseKey.InvalidCoseKeyError'
        });
    }
}
exports.InvalidCoseKeyError = InvalidCoseKeyError;
//# sourceMappingURL=CoseKey.js.map