import type * as Hex from '../core/Hex.js';
import * as Calls from './Calls.js';
export type Batch = {
    calls: readonly Call[];
    opData?: Hex.Hex | undefined;
};
export type Call = Calls.Call;
export declare const abiFunction: {
    type: "function";
    name: string;
    inputs: ({
        name: string;
        type: "bytes32";
        internalType: string;
    } | {
        name: string;
        type: "bytes";
        internalType: string;
    })[];
    outputs: never[];
    stateMutability: "payable";
};
export declare const mode: {
    readonly default: "0x0100000000000000000000000000000000000000000000000000000000000000";
    readonly opData: "0x0100000000007821000100000000000000000000000000000000000000000000";
    readonly batchOfBatches: "0x0100000000007821000200000000000000000000000000000000000000000000";
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
export declare function decodeData(data: Hex.Hex): decodeData.ReturnType;
export declare namespace decodeData {
    type ReturnType = {
        calls: Call[];
        opData?: Hex.Hex | undefined;
    };
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
export declare function decodeBatchOfBatchesData(data: Hex.Hex): decodeBatchOfBatchesData.ReturnType;
export declare namespace decodeBatchOfBatchesData {
    type ReturnType = Batch[];
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
export declare function encodeBatchOfBatchesData(batches: readonly Batch[]): `0x${string}`;
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
export declare function encodeData(calls: readonly Call[], options?: encodeData.Options): `0x${string}`;
export declare namespace encodeData {
    type Options = {
        opData?: Hex.Hex | undefined;
    };
}
//# sourceMappingURL=Execute.d.ts.map