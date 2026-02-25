import type { TypedData } from 'abitype';
import type { ErrorType } from '../../errors/utils.js';
import type { Hex } from '../../types/misc.js';
import type { EIP712DomainDefinition, MessageDefinition, TypedDataDefinition } from '../../types/typedData.js';
import type { UnionOmit } from '../../types/utils.js';
import { type EncodeAbiParametersErrorType } from '../abi/encodeAbiParameters.js';
import { type ToHexErrorType } from '../encoding/toHex.js';
import { type Keccak256ErrorType } from '../hash/keccak256.js';
import { type GetTypesForEIP712DomainErrorType, type ValidateTypedDataErrorType } from '../typedData.js';
type MessageTypeProperty = {
    name: string;
    type: string;
};
export type HashTypedDataParameters<typedData extends TypedData | Record<string, unknown> = TypedData, primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData> = TypedDataDefinition<typedData, primaryType>;
export type HashTypedDataReturnType = Hex;
export type HashTypedDataErrorType = GetTypesForEIP712DomainErrorType | HashDomainErrorType | HashStructErrorType | ValidateTypedDataErrorType | ErrorType;
export declare function hashTypedData<const typedData extends TypedData | Record<string, unknown>, primaryType extends keyof typedData | 'EIP712Domain'>(parameters: HashTypedDataParameters<typedData, primaryType>): HashTypedDataReturnType;
export type HashDomainErrorType = HashStructErrorType | ErrorType;
export declare function hashDomain<const typedData extends TypedData | Record<string, unknown> = TypedData>({ domain, types, }: UnionOmit<EIP712DomainDefinition<typedData>, 'primaryType'>): `0x${string}`;
export type HashStructErrorType = EncodeDataErrorType | Keccak256ErrorType | ErrorType;
export declare function hashStruct<const typedData extends TypedData | Record<string, unknown>, primaryType extends keyof typedData | 'EIP712Domain'>({ data, primaryType, types, }: MessageDefinition<typedData, primaryType, 'data'>): `0x${string}`;
type EncodeDataErrorType = EncodeAbiParametersErrorType | EncodeFieldErrorType | HashTypeErrorType | ErrorType;
type HashTypeErrorType = ToHexErrorType | EncodeTypeErrorType | Keccak256ErrorType | ErrorType;
type EncodeTypeErrorType = FindTypeDependenciesErrorType;
export declare function encodeType({ primaryType, types, }: {
    primaryType: string;
    types: Record<string, readonly MessageTypeProperty[]>;
}): string;
type FindTypeDependenciesErrorType = ErrorType;
type EncodeFieldErrorType = Keccak256ErrorType | EncodeAbiParametersErrorType | ToHexErrorType | ErrorType;
export {};
//# sourceMappingURL=hashTypedData.d.ts.map