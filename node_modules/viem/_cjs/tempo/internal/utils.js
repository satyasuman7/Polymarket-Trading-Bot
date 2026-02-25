"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineCall = defineCall;
exports.normalizeValue = normalizeValue;
const index_js_1 = require("../../utils/index.js");
function defineCall(call) {
    return {
        ...call,
        data: (0, index_js_1.encodeFunctionData)(call),
        to: call.address,
    };
}
function normalizeValue(value) {
    if (Array.isArray(value))
        return value.map(normalizeValue);
    if (typeof value === 'function')
        return undefined;
    if (typeof value !== 'object' || value === null)
        return value;
    if (Object.getPrototypeOf(value) !== Object.prototype)
        try {
            return structuredClone(value);
        }
        catch {
            return undefined;
        }
    const normalized = {};
    for (const [k, v] of Object.entries(value))
        normalized[k] = normalizeValue(v);
    return normalized;
}
//# sourceMappingURL=utils.js.map