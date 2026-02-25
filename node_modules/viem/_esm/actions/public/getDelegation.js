import { getAddress, } from '../../utils/address/getAddress.js';
import { size } from '../../utils/data/size.js';
import { slice } from '../../utils/data/slice.js';
import { getCode } from './getCode.js';
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
export async function getDelegation(client, { address, blockNumber, blockTag = 'latest' }) {
    const code = await getCode(client, {
        address,
        ...(blockNumber !== undefined ? { blockNumber } : { blockTag }),
    });
    if (!code)
        return undefined;
    // EIP-7702 delegation designator: 0xef0100 prefix (3 bytes) + address (20 bytes) = 23 bytes
    if (size(code) !== 23)
        return undefined;
    // Check for EIP-7702 delegation designator prefix
    if (!code.startsWith('0xef0100'))
        return undefined;
    // Extract the delegated address (bytes 3-23) and checksum it
    return getAddress(slice(code, 3, 23));
}
//# sourceMappingURL=getDelegation.js.map