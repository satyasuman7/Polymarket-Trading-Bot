import * as Cbor from './Cbor.js';
import * as Errors from './Errors.js';
import type * as Hex from './Hex.js';
import * as PublicKey from './PublicKey.js';
/**
 * Converts a P256 {@link ox#PublicKey.PublicKey} to a CBOR-encoded COSE_Key.
 *
 * The COSE_Key uses integer map keys per [RFC 9053](https://datatracker.ietf.org/doc/html/rfc9053):
 * - `1` (kty): `2` (EC2)
 * - `3` (alg): `-7` (ES256)
 * - `-1` (crv): `1` (P-256)
 * - `-2` (x): x coordinate bytes
 * - `-3` (y): y coordinate bytes
 *
 * @example
 * ```ts twoslash
 * import { CoseKey, P256 } from 'ox'
 *
 * const { publicKey } = P256.createKeyPair()
 *
 * const coseKey = CoseKey.fromPublicKey(publicKey)
 * ```
 *
 * @param publicKey - The P256 public key to convert.
 * @returns The CBOR-encoded COSE_Key as a Hex string.
 */
export declare function fromPublicKey(publicKey: PublicKey.PublicKey): Hex.Hex;
export declare namespace fromPublicKey {
    type ErrorType = PublicKey.toBytes.ErrorType | Cbor.encode.ErrorType | Errors.GlobalErrorType;
}
/**
 * Converts a CBOR-encoded COSE_Key to a P256 {@link ox#PublicKey.PublicKey}.
 *
 * @example
 * ```ts twoslash
 * import { CoseKey, P256 } from 'ox'
 *
 * const { publicKey } = P256.createKeyPair()
 * const coseKey = CoseKey.fromPublicKey(publicKey)
 *
 * const publicKey2 = CoseKey.toPublicKey(coseKey)
 * ```
 *
 * @param coseKey - The CBOR-encoded COSE_Key.
 * @returns The P256 public key.
 */
export declare function toPublicKey(coseKey: Hex.Hex): PublicKey.PublicKey;
export declare namespace toPublicKey {
    type ErrorType = Cbor.decode.ErrorType | PublicKey.from.ErrorType | InvalidCoseKeyError | Errors.GlobalErrorType;
}
/** Thrown when a COSE_Key does not contain valid P256 public key coordinates. */
export declare class InvalidCoseKeyError extends Errors.BaseError {
    readonly name = "CoseKey.InvalidCoseKeyError";
    constructor();
}
//# sourceMappingURL=CoseKey.d.ts.map