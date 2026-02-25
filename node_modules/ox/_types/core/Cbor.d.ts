import * as Bytes from './Bytes.js';
import * as Errors from './Errors.js';
import * as Hex from './Hex.js';
import * as Cursor from './internal/cursor.js';
/**
 * Encodes a value into CBOR (Concise Binary Object Representation) format.
 *
 * @example
 * ```ts twoslash
 * import { Cbor } from 'ox'
 *
 * Cbor.encode([1, 2, 3])
 * // @log: '0x83010203'
 *
 * Cbor.encode({ foo: 'bar', baz: [1, 2, 3] })
 * // @log: '0xa263666f6f636261726362617a83010203'
 *
 * Cbor.encode('hello', { as: 'Bytes' })
 * // @log: Uint8Array(6) [ 101, 104, 101, 108, 108, 111 ]
 * ```
 *
 * @param data - The value to encode.
 * @param options - Encoding options.
 * @returns The CBOR-encoded value.
 */
export declare function encode<as extends 'Hex' | 'Bytes' = 'Hex'>(data: unknown, options?: encode.Options<as>): encode.ReturnType<as>;
export declare namespace encode {
    type Options<as extends 'Hex' | 'Bytes' = 'Hex' | 'Bytes'> = {
        /** The format to return the encoded value in. */
        as?: as | 'Hex' | 'Bytes' | undefined;
    };
    type ReturnType<as extends 'Hex' | 'Bytes' = 'Hex' | 'Bytes'> = (as extends 'Hex' ? Hex.Hex : never) | (as extends 'Bytes' ? Bytes.Bytes : never);
    type ErrorType = Cursor.create.ErrorType | Hex.fromBytes.ErrorType | UnsupportedBigIntError | UnexpectedTokenError | NumberTooLargeError | StringTooLargeError | ByteStringTooLargeError | ArrayTooLargeError | ObjectTooLargeError | Errors.GlobalErrorType;
}
/**
 * Decodes CBOR (Concise Binary Object Representation) data into a JavaScript value.
 *
 * @example
 * ```ts twoslash
 * import { Cbor } from 'ox'
 *
 * Cbor.decode('0x83010203')
 * // @log: [1, 2, 3]
 *
 * Cbor.decode('0xa263666f6f636261726362617a83010203')
 * // @log: { foo: 'bar', baz: [1, 2, 3] }
 *
 * Cbor.decode(new Uint8Array([101, 104, 101, 108, 108, 111]))
 * // @log: 'hello'
 * ```
 *
 * @param data - The CBOR-encoded data to decode.
 * @param options - Decoding options.
 * @returns The decoded value.
 */
export declare function decode<type = unknown>(data: Hex.Hex | Bytes.Bytes): type;
export declare namespace decode {
    type ErrorType = Bytes.fromHex.ErrorType | Cursor.create.ErrorType | Hex.InvalidLengthError | decodeCursor.ErrorType | Errors.GlobalErrorType;
}
export declare class InvalidMajorTypeError extends Errors.BaseError {
    readonly name = "Cbor.InvalidMajorTypeError";
    constructor({ majorType }: {
        majorType: number;
    });
}
export declare class InvalidAdditionalInfoError extends Errors.BaseError {
    readonly name = "Cbor.InvalidAdditionalInfoError";
    constructor({ additionalInfo }: {
        additionalInfo: number;
    });
}
export declare class Unsupported64BitIntegerError extends Errors.BaseError {
    readonly name = "Cbor.Unsupported64BitIntegerError";
    constructor();
}
export declare class UnsupportedTagError extends Errors.BaseError {
    readonly name = "Cbor.UnsupportedTagError";
    constructor({ tag }: {
        tag: number;
    });
}
export declare class InvalidIndefiniteLengthChunkError extends Errors.BaseError {
    readonly name = "Cbor.InvalidIndefiniteLengthChunkError";
    constructor({ type }: {
        type: string;
    });
}
export declare class InvalidSimpleValueError extends Errors.BaseError {
    readonly name = "Cbor.InvalidSimpleValueError";
    constructor({ value }: {
        value: number;
    });
}
export declare class UnsupportedBigIntError extends Errors.BaseError {
    readonly name = "Cbor.UnsupportedBigIntError";
    constructor();
}
export declare class UnexpectedTokenError extends Errors.BaseError {
    readonly name = "Cbor.UnexpectedTokenError";
    constructor({ token }: {
        token: string;
    });
}
export declare class NumberTooLargeError extends Errors.BaseError {
    readonly name = "Cbor.NumberTooLargeError";
    constructor({ number }: {
        number: string;
    });
}
export declare class StringTooLargeError extends Errors.BaseError {
    readonly name = "Cbor.StringTooLargeError";
    constructor({ size }: {
        size: number;
    });
}
export declare class ArrayTooLargeError extends Errors.BaseError {
    readonly name = "Cbor.ArrayTooLargeError";
    constructor({ size }: {
        size: number;
    });
}
export declare class ObjectTooLargeError extends Errors.BaseError {
    readonly name = "Cbor.ObjectTooLargeError";
    constructor({ size }: {
        size: number;
    });
}
export declare class ByteStringTooLargeError extends Errors.BaseError {
    readonly name = "Cbor.ByteStringTooLargeError";
    constructor({ size }: {
        size: number;
    });
}
/** @internal */
declare function decodeCursor(cursor: Cursor.Cursor): unknown;
/** @internal */
declare namespace decodeCursor {
    type ErrorType = readUnsignedInteger.ErrorType | readNegativeInteger.ErrorType | readByteString.ErrorType | readTextString.ErrorType | readArray.ErrorType | readMap.ErrorType | readSimpleOrFloat.ErrorType | UnsupportedTagError | InvalidMajorTypeError | Errors.GlobalErrorType;
    /** @internal */
    namespace readLength {
        type ErrorType = Unsupported64BitIntegerError | InvalidAdditionalInfoError | Errors.GlobalErrorType;
    }
    /** @internal */
    function readUnsignedInteger(cursor: Cursor.Cursor, additionalInfo: number): number;
    /** @internal */
    namespace readUnsignedInteger {
        type ErrorType = readLength.ErrorType | Errors.GlobalErrorType;
    }
    /** @internal */
    function readNegativeInteger(cursor: Cursor.Cursor, additionalInfo: number): number;
    /** @internal */
    namespace readNegativeInteger {
        type ErrorType = readLength.ErrorType | Errors.GlobalErrorType;
    }
    /** @internal */
    function readByteString(cursor: Cursor.Cursor, additionalInfo: number): Bytes.Bytes;
    /** @internal */
    namespace readByteString {
        type ErrorType = readLength.ErrorType | InvalidIndefiniteLengthChunkError | Errors.GlobalErrorType;
    }
    /** @internal */
    function readTextString(cursor: Cursor.Cursor, additionalInfo: number): string;
    /** @internal */
    namespace readTextString {
        type ErrorType = readLength.ErrorType | Bytes.toString.ErrorType | InvalidIndefiniteLengthChunkError | Errors.GlobalErrorType;
    }
    /** @internal */
    function readArray(cursor: Cursor.Cursor, additionalInfo: number): unknown[];
    /** @internal */
    namespace readArray {
        type ErrorType = readLength.ErrorType | Errors.GlobalErrorType;
    }
    /** @internal */
    function readMap(cursor: Cursor.Cursor, additionalInfo: number): Record<string, unknown>;
    /** @internal */
    namespace readMap {
        type ErrorType = readLength.ErrorType | Errors.GlobalErrorType;
    }
    /** @internal */
    function readSimpleOrFloat(cursor: Cursor.Cursor, additionalInfo: number): unknown;
    /** @internal */
    namespace readSimpleOrFloat {
        type ErrorType = InvalidSimpleValueError | InvalidAdditionalInfoError | Errors.GlobalErrorType;
    }
}
export {};
//# sourceMappingURL=Cbor.d.ts.map