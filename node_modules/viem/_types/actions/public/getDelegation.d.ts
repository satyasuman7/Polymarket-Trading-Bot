import type { Address } from 'abitype';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { BlockTag } from '../../types/block.js';
import type { Chain } from '../../types/chain.js';
import { type GetAddressErrorType } from '../../utils/address/getAddress.js';
import { type SizeErrorType } from '../../utils/data/size.js';
import { type SliceErrorType } from '../../utils/data/slice.js';
import { type GetCodeErrorType } from './getCode.js';
export type GetDelegationParameters = {
    /** The address to check for delegation. */
    address: Address;
} & ({
    blockNumber?: undefined;
    blockTag?: BlockTag | undefined;
} | {
    blockNumber?: bigint | undefined;
    blockTag?: undefined;
});
export type GetDelegationReturnType = Address | undefined;
export type GetDelegationErrorType = GetAddressErrorType | GetCodeErrorType | SliceErrorType | SizeErrorType | ErrorType;
/**
 * Returns the address that an account has delegated to via EIP-7702.
 *
 * - Docs: https://viem.sh/docs/actions/public/getDelegation
 *
 * @param client - Client to use
 * @param parameters - {@link GetDelegationParameters}
 * @returns The delegated address, or undefined if not delegated. {@link GetDelegationReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getDelegation } from 'viem/actions'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const delegation = await getDelegation(client, {
 *   address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 * })
 */
export declare function getDelegation<chain extends Chain | undefined>(client: Client<Transport, chain>, { address, blockNumber, blockTag }: GetDelegationParameters): Promise<GetDelegationReturnType>;
//# sourceMappingURL=getDelegation.d.ts.map