"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ByteStringTooLargeError = exports.ObjectTooLargeError = exports.ArrayTooLargeError = exports.StringTooLargeError = exports.NumberTooLargeError = exports.UnexpectedTokenError = exports.UnsupportedBigIntError = exports.InvalidSimpleValueError = exports.InvalidIndefiniteLengthChunkError = exports.UnsupportedTagError = exports.Unsupported64BitIntegerError = exports.InvalidAdditionalInfoError = exports.InvalidMajorTypeError = void 0;
exports.encode = encode;
exports.decode = decode;
const Bytes = require("./Bytes.js");
const Errors = require("./Errors.js");
const Hex = require("./Hex.js");
const Cursor = require("./internal/cursor.js");
function encode(data, options = {}) {
    const { as = 'Hex' } = options;
    const encodable = getEncodable(data);
    const cursor = Cursor.create(new Uint8Array(encodable.length));
    encodable.encode(cursor);
    if (as === 'Hex')
        return Hex.fromBytes(cursor.bytes);
    return cursor.bytes;
}
function decode(data) {
    const bytes = (() => {
        if (typeof data === 'string') {
            if (data.length > 3 && data.length % 2 !== 0)
                throw new Hex.InvalidLengthError(data);
            return Bytes.fromHex(data);
        }
        return data;
    })();
    const cursor = Cursor.create(bytes);
    return decodeCursor(cursor);
}
class InvalidMajorTypeError extends Errors.BaseError {
    constructor({ majorType }) {
        super(`Invalid CBOR major type: ${majorType}`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Cbor.InvalidMajorTypeError'
        });
    }
}
exports.InvalidMajorTypeError = InvalidMajorTypeError;
class InvalidAdditionalInfoError extends Errors.BaseError {
    constructor({ additionalInfo }) {
        super(`Invalid CBOR additional info: ${additionalInfo}`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Cbor.InvalidAdditionalInfoError'
        });
    }
}
exports.InvalidAdditionalInfoError = InvalidAdditionalInfoError;
class Unsupported64BitIntegerError extends Errors.BaseError {
    constructor() {
        super('64-bit integers are not supported in CBOR decoding.');
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Cbor.Unsupported64BitIntegerError'
        });
    }
}
exports.Unsupported64BitIntegerError = Unsupported64BitIntegerError;
class UnsupportedTagError extends Errors.BaseError {
    constructor({ tag }) {
        super(`CBOR tagged data (tag ${tag}) is not yet supported.`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Cbor.UnsupportedTagError'
        });
    }
}
exports.UnsupportedTagError = UnsupportedTagError;
class InvalidIndefiniteLengthChunkError extends Errors.BaseError {
    constructor({ type }) {
        super(`Invalid chunk type in indefinite-length ${type}`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Cbor.InvalidIndefiniteLengthChunkError'
        });
    }
}
exports.InvalidIndefiniteLengthChunkError = InvalidIndefiniteLengthChunkError;
class InvalidSimpleValueError extends Errors.BaseError {
    constructor({ value }) {
        super(`Invalid CBOR simple value: ${value}`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Cbor.InvalidSimpleValueError'
        });
    }
}
exports.InvalidSimpleValueError = InvalidSimpleValueError;
class UnsupportedBigIntError extends Errors.BaseError {
    constructor() {
        super('BigInt values are not supported in CBOR encoding.');
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Cbor.UnsupportedBigIntError'
        });
    }
}
exports.UnsupportedBigIntError = UnsupportedBigIntError;
class UnexpectedTokenError extends Errors.BaseError {
    constructor({ token }) {
        super(`Unexpected token: ${token}`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Cbor.UnexpectedTokenError'
        });
    }
}
exports.UnexpectedTokenError = UnexpectedTokenError;
class NumberTooLargeError extends Errors.BaseError {
    constructor({ number }) {
        super(`Number exceeds maximum safe integer (${Number.MAX_SAFE_INTEGER}): ${number}`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Cbor.NumberTooLargeError'
        });
    }
}
exports.NumberTooLargeError = NumberTooLargeError;
class StringTooLargeError extends Errors.BaseError {
    constructor({ size }) {
        super(`String length exceeds maximum (4294967295): ${size}`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Cbor.StringTooLargeError'
        });
    }
}
exports.StringTooLargeError = StringTooLargeError;
class ArrayTooLargeError extends Errors.BaseError {
    constructor({ size }) {
        super(`Array length exceeds maximum (4294967295): ${size}`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Cbor.ArrayTooLargeError'
        });
    }
}
exports.ArrayTooLargeError = ArrayTooLargeError;
class ObjectTooLargeError extends Errors.BaseError {
    constructor({ size }) {
        super(`Object size exceeds maximum (4294967295): ${size}`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Cbor.ObjectTooLargeError'
        });
    }
}
exports.ObjectTooLargeError = ObjectTooLargeError;
class ByteStringTooLargeError extends Errors.BaseError {
    constructor({ size }) {
        super(`Byte string length exceeds maximum (4294967295): ${size}`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Cbor.ByteStringTooLargeError'
        });
    }
}
exports.ByteStringTooLargeError = ByteStringTooLargeError;
function getEncodable(value) {
    if (typeof value === 'undefined')
        return { length: 1, encode: (cursor) => cursor.pushUint8(0xf7) };
    if (value === null)
        return { length: 1, encode: (cursor) => cursor.pushUint8(0xf6) };
    if (typeof value === 'boolean')
        return {
            length: 1,
            encode: (cursor) => cursor.pushUint8(value ? 0xf5 : 0xf4),
        };
    if (typeof value === 'number')
        return getEncodable.number(value);
    if (typeof value === 'bigint')
        throw new UnsupportedBigIntError();
    if (typeof value === 'string')
        return getEncodable.string(value);
    if (Array.isArray(value))
        return getEncodable.array(value);
    if (value instanceof Uint8Array)
        return getEncodable.byteString(value);
    if (value instanceof ArrayBuffer)
        return getEncodable.byteString(new Uint8Array(value));
    if (ArrayBuffer.isView(value))
        return getEncodable.byteString(new Uint8Array(value.buffer, value.byteOffset, value.byteLength));
    if (value instanceof Map)
        return getEncodable.map(value);
    if (typeof value === 'object')
        return getEncodable.object(value);
    throw new UnexpectedTokenError({ token: String(value) });
}
(function (getEncodable) {
    function number(value) {
        if (!Number.isSafeInteger(value)) {
            const float32 = Math.fround(value);
            if (Number.isNaN(value) || value === float32)
                return {
                    length: 5,
                    encode(cursor) {
                        cursor.pushUint8(0xfa);
                        cursor.dataView.setFloat32(cursor.position, value, false);
                        cursor.position += 4;
                    },
                };
            return {
                length: 9,
                encode(cursor) {
                    cursor.pushUint8(0xfb);
                    cursor.dataView.setFloat64(cursor.position, value, false);
                    cursor.position += 8;
                },
            };
        }
        if (value >= 0) {
            if (value <= 0x17)
                return { length: 1, encode: (cursor) => cursor.pushUint8(value) };
            if (value <= 0xff)
                return {
                    length: 2,
                    encode: (cursor) => {
                        cursor.pushUint8(0x18);
                        cursor.pushUint8(value);
                    },
                };
            if (value <= 0xffff)
                return {
                    length: 3,
                    encode: (cursor) => {
                        cursor.pushUint8(0x19);
                        cursor.pushUint16(value);
                    },
                };
            if (value <= 0xffffffff)
                return {
                    length: 5,
                    encode: (cursor) => {
                        cursor.pushUint8(0x1a);
                        cursor.pushUint32(value);
                    },
                };
            throw new NumberTooLargeError({ number: value.toString(10) });
        }
        const positiveNumber = -1 - value;
        if (value >= -24)
            return {
                length: 1,
                encode: (cursor) => cursor.pushUint8(0x20 + positiveNumber),
            };
        if (positiveNumber <= 0xff)
            return {
                length: 2,
                encode: (cursor) => {
                    cursor.pushUint8(0x38);
                    cursor.pushUint8(positiveNumber);
                },
            };
        if (positiveNumber <= 0xffff)
            return {
                length: 3,
                encode: (cursor) => {
                    cursor.pushUint8(0x39);
                    cursor.pushUint16(positiveNumber);
                },
            };
        if (positiveNumber <= 0xffffffff)
            return {
                length: 5,
                encode: (cursor) => {
                    cursor.pushUint8(0x3a);
                    cursor.pushUint32(positiveNumber);
                },
            };
        throw new NumberTooLargeError({ number: value.toString(10) });
    }
    getEncodable.number = number;
    function string(value) {
        const encoded = Bytes.fromString(value);
        const size = encoded.length;
        if (size <= 0x17)
            return {
                length: 1 + size,
                encode(cursor) {
                    cursor.pushUint8(0x60 + size);
                    if (size > 0)
                        cursor.pushBytes(encoded);
                },
            };
        if (size <= 0xff)
            return {
                length: 2 + size,
                encode(cursor) {
                    cursor.pushUint8(0x78);
                    cursor.pushUint8(size);
                    cursor.pushBytes(encoded);
                },
            };
        if (size <= 0xffff)
            return {
                length: 3 + size,
                encode(cursor) {
                    cursor.pushUint8(0x79);
                    cursor.pushUint16(size);
                    cursor.pushBytes(encoded);
                },
            };
        if (size <= 0xffffffff)
            return {
                length: 5 + size,
                encode(cursor) {
                    cursor.pushUint8(0x7a);
                    cursor.pushUint32(size);
                    cursor.pushBytes(encoded);
                },
            };
        throw new StringTooLargeError({ size });
    }
    getEncodable.string = string;
    function array(value) {
        const items = value.map((item) => getEncodable(item));
        const bodyLength = items.reduce((acc, item) => acc + item.length, 0);
        const size = value.length;
        if (size <= 0x17)
            return {
                length: 1 + bodyLength,
                encode(cursor) {
                    cursor.pushUint8(0x80 + size);
                    for (const item of items)
                        item.encode(cursor);
                },
            };
        if (size <= 0xff)
            return {
                length: 2 + bodyLength,
                encode(cursor) {
                    cursor.pushUint8(0x98);
                    cursor.pushUint8(size);
                    for (const item of items)
                        item.encode(cursor);
                },
            };
        if (size <= 0xffff)
            return {
                length: 3 + bodyLength,
                encode(cursor) {
                    cursor.pushUint8(0x99);
                    cursor.pushUint16(size);
                    for (const item of items)
                        item.encode(cursor);
                },
            };
        if (size <= 0xffffffff)
            return {
                length: 5 + bodyLength,
                encode(cursor) {
                    cursor.pushUint8(0x9a);
                    cursor.pushUint32(size);
                    for (const item of items)
                        item.encode(cursor);
                },
            };
        throw new ArrayTooLargeError({ size });
    }
    getEncodable.array = array;
    function byteString(value) {
        const size = value.byteLength;
        if (size <= 0x17)
            return {
                length: 1 + size,
                encode(cursor) {
                    cursor.pushUint8(0x40 + size);
                    cursor.pushBytes(value);
                },
            };
        if (size <= 0xff)
            return {
                length: 2 + size,
                encode(cursor) {
                    cursor.pushUint8(0x58);
                    cursor.pushUint8(size);
                    cursor.pushBytes(value);
                },
            };
        if (size <= 0xffff)
            return {
                length: 3 + size,
                encode(cursor) {
                    cursor.pushUint8(0x59);
                    cursor.pushUint16(size);
                    cursor.pushBytes(value);
                },
            };
        if (size <= 0xffffffff)
            return {
                length: 5 + size,
                encode(cursor) {
                    cursor.pushUint8(0x5a);
                    cursor.pushUint32(size);
                    cursor.pushBytes(value);
                },
            };
        throw new ByteStringTooLargeError({ size });
    }
    getEncodable.byteString = byteString;
    function object(value) {
        const keys = Object.keys(value);
        const entries = keys.map((key) => ({
            key: getEncodable(key),
            value: getEncodable(value[key]),
        }));
        const bodyLength = entries.reduce((acc, entry) => acc + entry.key.length + entry.value.length, 0);
        const size = keys.length;
        if (size <= 0x17)
            return {
                length: 1 + bodyLength,
                encode(cursor) {
                    cursor.pushUint8(0xa0 + size);
                    for (const entry of entries) {
                        entry.key.encode(cursor);
                        entry.value.encode(cursor);
                    }
                },
            };
        if (size <= 0xff)
            return {
                length: 2 + bodyLength,
                encode(cursor) {
                    cursor.pushUint8(0xb8);
                    cursor.pushUint8(size);
                    for (const entry of entries) {
                        entry.key.encode(cursor);
                        entry.value.encode(cursor);
                    }
                },
            };
        if (size <= 0xffff)
            return {
                length: 3 + bodyLength,
                encode(cursor) {
                    cursor.pushUint8(0xb9);
                    cursor.pushUint16(size);
                    for (const entry of entries) {
                        entry.key.encode(cursor);
                        entry.value.encode(cursor);
                    }
                },
            };
        if (size <= 0xffffffff)
            return {
                length: 5 + bodyLength,
                encode(cursor) {
                    cursor.pushUint8(0xba);
                    cursor.pushUint32(size);
                    for (const entry of entries) {
                        entry.key.encode(cursor);
                        entry.value.encode(cursor);
                    }
                },
            };
        throw new ObjectTooLargeError({ size });
    }
    getEncodable.object = object;
    function map(value) {
        const entries = [];
        for (const [k, v] of value)
            entries.push({ key: getEncodable(k), value: getEncodable(v) });
        const bodyLength = entries.reduce((acc, entry) => acc + entry.key.length + entry.value.length, 0);
        const size = value.size;
        if (size <= 0x17)
            return {
                length: 1 + bodyLength,
                encode(cursor) {
                    cursor.pushUint8(0xa0 + size);
                    for (const entry of entries) {
                        entry.key.encode(cursor);
                        entry.value.encode(cursor);
                    }
                },
            };
        if (size <= 0xff)
            return {
                length: 2 + bodyLength,
                encode(cursor) {
                    cursor.pushUint8(0xb8);
                    cursor.pushUint8(size);
                    for (const entry of entries) {
                        entry.key.encode(cursor);
                        entry.value.encode(cursor);
                    }
                },
            };
        if (size <= 0xffff)
            return {
                length: 3 + bodyLength,
                encode(cursor) {
                    cursor.pushUint8(0xb9);
                    cursor.pushUint16(size);
                    for (const entry of entries) {
                        entry.key.encode(cursor);
                        entry.value.encode(cursor);
                    }
                },
            };
        if (size <= 0xffffffff)
            return {
                length: 5 + bodyLength,
                encode(cursor) {
                    cursor.pushUint8(0xba);
                    cursor.pushUint32(size);
                    for (const entry of entries) {
                        entry.key.encode(cursor);
                        entry.value.encode(cursor);
                    }
                },
            };
        throw new ObjectTooLargeError({ size });
    }
    getEncodable.map = map;
})(getEncodable || (getEncodable = {}));
function decodeCursor(cursor) {
    const initialByte = cursor.readUint8();
    const majorType = initialByte >> 5;
    const additionalInfo = initialByte & 0b00011111;
    switch (majorType) {
        case 0:
            return decodeCursor.readUnsignedInteger(cursor, additionalInfo);
        case 1:
            return decodeCursor.readNegativeInteger(cursor, additionalInfo);
        case 2:
            return decodeCursor.readByteString(cursor, additionalInfo);
        case 3:
            return decodeCursor.readTextString(cursor, additionalInfo);
        case 4:
            return decodeCursor.readArray(cursor, additionalInfo);
        case 5:
            return decodeCursor.readMap(cursor, additionalInfo);
        case 6:
            throw new UnsupportedTagError({ tag: additionalInfo });
        case 7:
            return decodeCursor.readSimpleOrFloat(cursor, additionalInfo);
        default:
            throw new InvalidMajorTypeError({ majorType });
    }
}
(function (decodeCursor) {
    function readLength(cursor, additionalInfo) {
        if (additionalInfo < 24)
            return additionalInfo;
        if (additionalInfo === 24)
            return cursor.readUint8();
        if (additionalInfo === 25)
            return cursor.readUint16();
        if (additionalInfo === 26)
            return cursor.readUint32();
        if (additionalInfo === 27)
            throw new Unsupported64BitIntegerError();
        throw new InvalidAdditionalInfoError({ additionalInfo });
    }
    function readUnsignedInteger(cursor, additionalInfo) {
        return readLength(cursor, additionalInfo);
    }
    decodeCursor.readUnsignedInteger = readUnsignedInteger;
    function readNegativeInteger(cursor, additionalInfo) {
        const value = readLength(cursor, additionalInfo);
        return -1 - value;
    }
    decodeCursor.readNegativeInteger = readNegativeInteger;
    function readByteString(cursor, additionalInfo) {
        if (additionalInfo === 31) {
            const chunks = [];
            let totalLength = 0;
            while (true) {
                const byte = cursor.inspectUint8();
                if (byte === 0xff) {
                    cursor.readUint8();
                    break;
                }
                const chunk = decodeCursor(cursor);
                if (!(chunk instanceof Uint8Array))
                    throw new InvalidIndefiniteLengthChunkError({ type: 'byte string' });
                chunks.push(chunk);
                totalLength += chunk.length;
            }
            const result = new Uint8Array(totalLength);
            let offset = 0;
            for (const chunk of chunks) {
                result.set(chunk, offset);
                offset += chunk.length;
            }
            return result;
        }
        const length = readLength(cursor, additionalInfo);
        return cursor.readBytes(length);
    }
    decodeCursor.readByteString = readByteString;
    function readTextString(cursor, additionalInfo) {
        if (additionalInfo === 31) {
            const chunks = [];
            while (true) {
                const byte = cursor.inspectUint8();
                if (byte === 0xff) {
                    cursor.readUint8();
                    break;
                }
                const chunk = decodeCursor(cursor);
                if (typeof chunk !== 'string')
                    throw new InvalidIndefiniteLengthChunkError({ type: 'text string' });
                chunks.push(chunk);
            }
            return chunks.join('');
        }
        const length = readLength(cursor, additionalInfo);
        const bytes = cursor.readBytes(length);
        return Bytes.toString(bytes);
    }
    decodeCursor.readTextString = readTextString;
    function readArray(cursor, additionalInfo) {
        if (additionalInfo === 31) {
            const result = [];
            while (true) {
                const byte = cursor.inspectUint8();
                if (byte === 0xff) {
                    cursor.readUint8();
                    break;
                }
                result.push(decodeCursor(cursor));
            }
            return result;
        }
        const length = readLength(cursor, additionalInfo);
        const result = [];
        for (let i = 0; i < length; i++) {
            result.push(decodeCursor(cursor));
        }
        return result;
    }
    decodeCursor.readArray = readArray;
    function readMap(cursor, additionalInfo) {
        if (additionalInfo === 31) {
            const result = {};
            while (true) {
                const byte = cursor.inspectUint8();
                if (byte === 0xff) {
                    cursor.readUint8();
                    break;
                }
                const key = decodeCursor(cursor);
                const keyStr = typeof key === 'string'
                    ? key
                    : typeof key === 'number'
                        ? String(key)
                        : String(key);
                const value = decodeCursor(cursor);
                result[keyStr] = value;
            }
            return result;
        }
        const length = readLength(cursor, additionalInfo);
        const result = {};
        for (let i = 0; i < length; i++) {
            const key = decodeCursor(cursor);
            const keyStr = typeof key === 'string'
                ? key
                : typeof key === 'number'
                    ? String(key)
                    : String(key);
            const value = decodeCursor(cursor);
            result[keyStr] = value;
        }
        return result;
    }
    decodeCursor.readMap = readMap;
    function readSimpleOrFloat(cursor, additionalInfo) {
        if (additionalInfo === 20)
            return false;
        if (additionalInfo === 21)
            return true;
        if (additionalInfo === 22)
            return null;
        if (additionalInfo === 23)
            return undefined;
        if (additionalInfo === 25) {
            const bits = cursor.readUint16();
            return getFloat16(bits);
        }
        if (additionalInfo === 26) {
            const value = cursor.dataView.getFloat32(cursor.position, false);
            cursor.position += 4;
            return value;
        }
        if (additionalInfo === 27) {
            const value = cursor.dataView.getFloat64(cursor.position, false);
            cursor.position += 8;
            return value;
        }
        if (additionalInfo === 24) {
            const simpleValue = cursor.readUint8();
            if (simpleValue < 32)
                throw new InvalidSimpleValueError({ value: simpleValue });
            return undefined;
        }
        throw new InvalidAdditionalInfoError({ additionalInfo });
    }
    decodeCursor.readSimpleOrFloat = readSimpleOrFloat;
    function getFloat16(bits) {
        const sign = (bits >> 15) & 0x1;
        const exponent = (bits >> 10) & 0x1f;
        const fraction = bits & 0x3ff;
        if (exponent === 0) {
            if (fraction === 0)
                return sign ? -0 : 0;
            const value = 2 ** -14 * (fraction / 1024);
            return sign ? -value : value;
        }
        if (exponent === 0x1f) {
            if (fraction === 0)
                return sign ? -Infinity : Infinity;
            return NaN;
        }
        const value = 2 ** (exponent - 15) * (1 + fraction / 1024);
        return sign ? -value : value;
    }
})(decodeCursor || (decodeCursor = {}));
//# sourceMappingURL=Cbor.js.map