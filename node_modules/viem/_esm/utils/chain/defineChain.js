export function defineChain(chain) {
    const chainInstance = {
        formatters: undefined,
        fees: undefined,
        serializers: undefined,
        ...chain,
    };
    function extend(base) {
        return (fnOrExtended) => {
            const properties = (typeof fnOrExtended === 'function' ? fnOrExtended(base) : fnOrExtended);
            const combined = { ...base, ...properties };
            return Object.assign(combined, { extend: extend(combined) });
        };
    }
    return Object.assign(chainInstance, {
        extend: extend(chainInstance),
    });
}
export function extendSchema() {
    return {};
}
//# sourceMappingURL=defineChain.js.map