import * as AbiFunction from '../core/AbiFunction.js';
import { AbiParameters } from '../index.js';
import * as Calls from './Calls.js';
export const abiFunction = {
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
export const mode = {
    default: '0x0100000000000000000000000000000000000000000000000000000000000000',
    opData: '0x0100000000007821000100000000000000000000000000000000000000000000',
    batchOfBatches: '0x0100000000007821000200000000000000000000000000000000000000000000',
};
/**
 * Decodes calls from ERC-7821 `execute` function data.
 *
 * @example
 * ```ts twoslash
 * import { Execute } from 'ox/erc7821'
 *
 * const { calls } = Execute.decodeData('0x...')
 * ```
 *
 * @param data - The encoded data.
 * @returns The decoded calls and optional opData.
 */
export function decodeData(data) {
    const [m, executionData] = AbiFunction.decodeData(abiFunction, data);
    return Calls.decode(executionData, { opData: m !== mode.default });
}
/**
 * Decodes batches from ERC-7821 `execute` function data in "batch of batches" mode.
 *
 * @example
 * ```ts twoslash
 * import { Execute } from 'ox/erc7821'
 *
 * const batches = Execute.decodeBatchOfBatchesData('0x...')
 * ```
 *
 * @param data - The encoded data.
 * @returns The decoded batches.
 */
export function decodeBatchOfBatchesData(data) {
    const [, executionData] = AbiFunction.decodeData(abiFunction, data);
    const [encodedBatches] = AbiParameters.decode(AbiParameters.from('bytes[]'), executionData);
    return encodedBatches.map((encodedBatch) => {
        // Try decoding with opData first
        try {
            const decoded = Calls.decode(encodedBatch, { opData: true });
            if (decoded.opData) {
                return {
                    calls: decoded.calls,
                    opData: decoded.opData,
                };
            }
            // If opData is undefined, return without it
            return { calls: decoded.calls };
        }
        catch {
            // If decoding with opData fails, decode without it
            const decoded = Calls.decode(encodedBatch, { opData: false });
            return { calls: decoded.calls };
        }
    });
}
/**
 * Encodes calls for the ERC-7821 `execute` function with "batch of batches" mode.
 *
 * @example
 * ```ts twoslash
 * import { Execute } from 'ox/erc7821'
 *
 * const data = Execute.encodeBatchOfBatchesData([
 *   {
 *     calls: [
 *       {
 *         data: '0xcafebabe',
 *         to: '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
 *         value: 1n,
 *       }
 *     ]
 *   },
 *   {
 *     calls: [
 *       {
 *         data: '0xdeadbeef',
 *         to: '0xcafebabecafebabecafebabecafebabecafebabe',
 *         value: 2n,
 *       }
 *     ],
 *     opData: '0xcafebabe',
 *   }
 * ])
 * ```
 *
 * @param calls - The calls to encode.
 * @param options - The options.
 * @returns The encoded data.
 */
export function encodeBatchOfBatchesData(batches) {
    const b = AbiParameters.encode(AbiParameters.from('bytes[]'), [
        batches.map((b) => {
            const batch = b;
            return Calls.encode(batch.calls, {
                opData: batch.opData,
            });
        }),
    ]);
    return AbiFunction.encodeData(abiFunction, [mode.batchOfBatches, b]);
}
/**
 * Encodes calls for the ERC-7821 `execute` function.
 *
 * @example
 * ```ts twoslash
 * import { Execute } from 'ox/erc7821'
 *
 * const data = Execute.encodeData([
 *   {
 *     data: '0xcafebabe',
 *     to: '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
 *     value: 1n,
 *   }
 * ])
 * ```
 *
 * @param calls - The calls to encode.
 * @param options - The options.
 * @returns The encoded data.
 */
export function encodeData(calls, options = {}) {
    const { opData } = options;
    const c = Calls.encode(calls, { opData });
    const m = opData ? mode.opData : mode.default;
    return AbiFunction.encodeData(abiFunction, [m, c]);
}
//# sourceMappingURL=Execute.js.map