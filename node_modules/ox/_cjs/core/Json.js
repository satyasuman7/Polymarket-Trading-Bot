"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canonicalize = canonicalize;
exports.parse = parse;
exports.stringify = stringify;
const bigIntSuffix = '#__bigint';
function canonicalize(value) {
    if (value === null || typeof value === 'boolean' || typeof value === 'string')
        return JSON.stringify(value);
    if (typeof value === 'number') {
        if (!Number.isFinite(value))
            throw new TypeError('Cannot canonicalize non-finite number');
        return Object.is(value, -0) ? '0' : JSON.stringify(value);
    }
    if (typeof value === 'bigint')
        throw new TypeError('Cannot canonicalize bigint');
    if (Array.isArray(value))
        return `[${value.map((item) => canonicalize(item)).join(',')}]`;
    if (typeof value === 'object') {
        const entries = Object.keys(value)
            .sort()
            .reduce((acc, key) => {
            const v = value[key];
            if (v !== undefined)
                acc.push(`${JSON.stringify(key)}:${canonicalize(v)}`);
            return acc;
        }, []);
        return `{${entries.join(',')}}`;
    }
    return undefined;
}
function parse(string, reviver) {
    return JSON.parse(string, (key, value_) => {
        const value = value_;
        if (typeof value === 'string' && value.endsWith(bigIntSuffix))
            return BigInt(value.slice(0, -bigIntSuffix.length));
        return typeof reviver === 'function' ? reviver(key, value) : value;
    });
}
function stringify(value, replacer, space) {
    return JSON.stringify(value, (key, value) => {
        if (typeof replacer === 'function')
            return replacer(key, value);
        if (typeof value === 'bigint')
            return value.toString() + bigIntSuffix;
        return value;
    }, space);
}
//# sourceMappingURL=Json.js.map