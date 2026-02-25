import { encodeFunctionData } from '../../utils/index.js';
export function defineCall(call) {
    return {
        ...call,
        data: encodeFunctionData(call),
        to: call.address,
    };
}
/**
 * Normalizes a value into a structured-clone compatible format.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone
 * @internal
 */
export function normalizeValue(value) {
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