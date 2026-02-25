"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.getAbiParameters = getAbiParameters;
exports.decode = decode;
const AbiParameters = require("../core/AbiParameters.js");
function encode(calls, options = {}) {
    const { opData } = options;
    return AbiParameters.encode(getAbiParameters({ opData: !!opData }), [
        calls.map((call) => ({
            target: call.to,
            value: call.value ?? 0n,
            data: call.data ?? '0x',
        })),
        ...(opData ? [opData] : []),
    ]);
}
function getAbiParameters(options = {}) {
    const { opData } = options;
    return AbiParameters.from([
        'struct Call { address target; uint256 value; bytes data; }',
        'Call[] calls',
        ...(opData ? ['bytes opData'] : []),
    ]);
}
function decode(data, options = {}) {
    const { opData: withOpData = false } = options;
    const decoded = AbiParameters.decode(getAbiParameters({ opData: withOpData }), data);
    const [encodedCalls, opData] = decoded;
    const calls = encodedCalls.map((call) => ({
        to: call.target,
        value: call.value,
        data: call.data,
    }));
    return withOpData
        ? { calls, opData: opData === '0x' ? undefined : opData }
        : { calls };
}
//# sourceMappingURL=Calls.js.map