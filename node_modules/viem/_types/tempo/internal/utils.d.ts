import type { Abi, AbiStateMutability, Address } from 'abitype';
import type { ContractFunctionName, ContractFunctionParameters, ExtractAbiItem } from '../../types/contract.js';
import type { Hex } from '../../types/misc.js';
export declare function defineCall<const abi extends Abi, const functionName extends ContractFunctionName<abi, AbiStateMutability>, call extends ContractFunctionParameters<abi, AbiStateMutability, functionName>>(call: call | ContractFunctionParameters<abi, AbiStateMutability, functionName>): ContractFunctionParameters<[
    ExtractAbiItem<abi, functionName>
], AbiStateMutability, functionName> & {
    data: Hex;
    to: Address;
};
/**
 * Normalizes a value into a structured-clone compatible format.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone
 * @internal
 */
export declare function normalizeValue<type>(value: type): type;
//# sourceMappingURL=utils.d.ts.map