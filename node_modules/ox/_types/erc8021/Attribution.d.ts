import type * as Address from '../core/Address.js';
import type * as Errors from '../core/Errors.js';
import * as Hex from '../core/Hex.js';
import type { OneOf } from '../core/internal/types.js';
/**
 * ERC-8021 Transaction Attribution.
 *
 * Represents attribution metadata that can be appended to transaction calldata
 * to track entities involved in facilitating a transaction.
 */
export type Attribution = OneOf<AttributionSchemaId0 | AttributionSchemaId1>;
/**
 * Schema 0: Canonical Registry Attribution.
 *
 * Uses the canonical attribution code registry for resolving entity identities.
 */
export type AttributionSchemaId0 = {
    /** Attribution codes identifying entities involved in the transaction. */
    codes: readonly string[];
    /** Schema identifier (0 for canonical registry). */
    id?: 0 | undefined;
};
/**
 * Schema 1: Custom Registry Attribution.
 *
 * Uses a custom registry contract for resolving attribution codes.
 */
export type AttributionSchemaId1 = {
    /** Attribution codes identifying entities involved in the transaction. */
    codes: readonly string[];
    codeRegistry: AttributionSchemaId1Registry;
    /** Schema identifier (1 for custom registry). */
    id?: 1 | undefined;
};
export type AttributionSchemaId1Registry = {
    /** Address of the custom code registry contract. */
    address: Address.Address;
    /** Chain Id of the chain the custom code registry contract is deployed on. */
    chainId: number;
};
/**
 * Attribution schema identifier.
 *
 * - `0`: Canonical registry
 * - `1`: Custom registry
 */
export type SchemaId = NonNullable<AttributionSchemaId0['id'] | AttributionSchemaId1['id']>;
/**
 * ERC-8021 suffix identifier.
 */
export declare const ercSuffix: "0x80218021802180218021802180218021";
/**
 * Size of the ERC-8021 suffix (16 bytes).
 */
export declare const ercSuffixSize: number;
/**
 * Determines the schema ID for an {@link ox#Attribution.Attribution}.
 *
 * @example
 * ```ts twoslash
 * import { Attribution } from 'ox/erc8021'
 *
 * const schemaId = Attribution.getSchemaId({
 *   codes: ['baseapp']
 * })
 * // @log: 0
 *
 * const schemaId2 = Attribution.getSchemaId({
 *   codes: ['baseapp'],
 *   codeRegistry: {
 *      address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
 *      chainId: 8453,
 *   }
 * })
 * // @log: 1
 * ```
 *
 * @param attribution - The attribution object.
 * @returns The schema ID (0 for canonical registry, 1 for custom registry).
 */
export declare function getSchemaId(attribution: Attribution): SchemaId;
export declare namespace getSchemaId {
    type ErrorType = Errors.GlobalErrorType;
}
/**
 * Converts an {@link ox#Attribution.Attribution} to a data suffix that can be appended to transaction calldata.
 *
 * @example
 * ### Schema 0 (Canonical Registry)
 *
 * ```ts twoslash
 * import { Attribution } from 'ox/erc8021'
 *
 * const suffix = Attribution.toDataSuffix({
 *   codes: ['baseapp', 'morpho']
 * })
 * // @log: '0x626173656170702c6d6f7270686f0e0080218021802180218021802180218021'
 * ```
 *
 * @example
 * ### Schema 1 (Custom Registry)
 *
 * ```ts twoslash
 * import { Attribution } from 'ox/erc8021'
 *
 * const suffix = Attribution.toDataSuffix({
 *   codes: ['baseapp'],
 *   codeRegistry: {
 *      address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
 *      chainId: 8453,
 *   }
 * })
 * ```
 *
 * @param attribution - The attribution to convert.
 * @returns The data suffix as a {@link ox#Hex.Hex} value.
 */
export declare function toDataSuffix(attribution: Attribution): Hex.Hex;
export declare namespace toDataSuffix {
    type ErrorType = getSchemaId.ErrorType | Hex.concat.ErrorType | Hex.fromString.ErrorType | Hex.fromNumber.ErrorType | Hex.size.ErrorType | Errors.GlobalErrorType;
}
/**
 * Extracts an {@link ox#Attribution.Attribution} from transaction calldata.
 *
 * @example
 * ### Schema 0 (Canonical Registry)
 *
 * ```ts twoslash
 * import { Attribution } from 'ox/erc8021'
 *
 * const attribution = Attribution.fromData(
 *   '0xdddddddd62617365617070070080218021802180218021802180218021'
 * )
 * // @log: { codes: ['baseapp'], id: 0 }
 * ```
 *
 * @example
 * ### Schema 1 (Custom Registry)
 *
 * ```ts twoslash
 * import { Attribution } from 'ox/erc8021'
 *
 * const attribution = Attribution.fromData(
 *   '0xddddddddcccccccccccccccccccccccccccccccccccccccc210502626173656170702C6D6F7270686F0E0180218021802180218021802180218021'
 * )
 * // @log: {
 * // @log:   codes: ['baseapp', 'morpho'],
 * // @log:   registry: {
 * // @log:       address: '0xcccccccccccccccccccccccccccccccccccccccc`
 * // @log:       chainId: 8453,
 * // @log:   }
 * // @log:   id: 1
 * // @log: }
 * ```
 *
 * @param data - The transaction calldata containing the attribution suffix.
 * @returns The extracted attribution, or undefined if no valid attribution is found.
 */
export declare function fromData(data: Hex.Hex): Attribution | undefined;
export declare namespace fromData {
    type ErrorType = Hex.slice.ErrorType | Hex.toNumber.ErrorType | Hex.toString.ErrorType | Hex.size.ErrorType | Errors.GlobalErrorType;
}
//# sourceMappingURL=Attribution.d.ts.map