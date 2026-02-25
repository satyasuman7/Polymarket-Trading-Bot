"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mode = exports.abiFunction = void 0;
exports.decodeData = decodeData;
exports.decodeBatchOfBatchesData = decodeBatchOfBatchesData;
exports.encodeBatchOfBatchesData = encodeBatchOfBatchesData;
exports.encodeData = encodeData;
const AbiFunction = require("../core/AbiFunction.js");
const index_js_1 = require("../index.js");
const Calls = require("./Calls.js");
exports.abiFunction = {
    type: 'function',
    name: 'execute',
    inputs: [
        {
            name: 'mode',
            type: 'bytes32',
            internalType: 'bytes32',
        },
        {
            name: 'executionData',
            type: 'bytes',
            internalType: 'bytes',
        },
    ],
    outputs: [],
    stateMutability: 'payable',
};
exports.mode = {
    default: '0x0100000000000000000000000000000000000000000000000000000000000000',
    opData: '0x0100000000007821000100000000000000000000000000000000000000000000',
    batchOfBatches: '0x0100000000007821000200000000000000000000000000000000000000000000',
};
function decodeData(data) {
    const [m, executionData] = AbiFunction.decodeData(exports.abiFunction, data);
    return Calls.decode(executionData, { opData: m !== exports.mode.default });
}
function decodeBatchOfBatchesData(data) {
    const [, executionData] = AbiFunction.decodeData(exports.abiFunction, data);
    const [encodedBatches] = index_js_1.AbiParameters.decode(index_js_1.AbiParameters.from('bytes[]'), executionData);
    return encodedBatches.map((encodedBatch) => {
        try {
            const decoded = Calls.decode(encodedBatch, { opData: true });
            if (decoded.opData) {
                return {
                    calls: decoded.calls,
                    opData: decoded.opData,
                };
            }
            return { calls: decoded.calls };
        }
        catch {
            const decoded = Calls.decode(encodedBatch, { opData: false });
            return { calls: decoded.calls };
        }
    });
}
function encodeBatchOfBatchesData(batches) {
    const b = index_js_1.AbiParameters.encode(index_js_1.AbiParameters.from('bytes[]'), [
        batches.map((b) => {
            const batch = b;
            return Calls.encode(batch.calls, {
                opData: batch.opData,
            });
        }),
    ]);
    return AbiFunction.encodeData(exports.abiFunction, [exports.mode.batchOfBatches, b]);
}
function encodeData(calls, options = {}) {
    const { opData } = options;
    const c = Calls.encode(calls, { opData });
    const m = opData ? exports.mode.opData : exports.mode.default;
    return AbiFunction.encodeData(exports.abiFunction, [m, c]);
}
//# sourceMappingURL=Execute.js.map