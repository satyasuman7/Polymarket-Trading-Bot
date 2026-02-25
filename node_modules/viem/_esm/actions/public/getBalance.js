import { multicall3Abi } from '../../constants/abis.js';
import { decodeFunctionResult } from '../../utils/abi/decodeFunctionResult.js';
import { encodeFunctionData } from '../../utils/abi/encodeFunctionData.js';
import { numberToHex, } from '../../utils/encoding/toHex.js';
import { getAction } from '../../utils/getAction.js';
import { call } from './call.js';
/**
 * Returns the balance of an address in wei.
 *
 * - Docs: https://viem.sh/docs/actions/public/getBalance
 * - JSON-RPC Methods: [`eth_getBalance`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getbalance)
 *
 * You can convert the balance to ether units with [`formatEther`](https://viem.sh/docs/utilities/formatEther).
 *
 * ```ts
 * const balance = await getBalance(client, {
 *   address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   blockTag: 'safe'
 * })
 * const balanceAsEther = formatEther(balance)
 * // "6.942"
 * ```
 *
 * @param client - Client to use
 * @param parameters - {@link GetBalanceParameters}
 * @returns The balance of the address in wei. {@link GetBalanceReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getBalance } from 'viem/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const balance = await getBalance(client, {
 *   address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 * })
 * // 10000000000000000000000n (wei)
 */
export async function getBalance(client, { address, blockNumber, blockTag = client.experimental_blockTag ?? 'latest', }) {
    if (client.batch?.multicall && client.chain?.contracts?.multicall3) {
        const multicall3Address = client.chain.contracts.multicall3.address;
        const calldata = encodeFunctionData({
            abi: multicall3Abi,
            functionName: 'getEthBalance',
            args: [address],
        });
        const { data } = await getAction(client, call, 'call')({
            to: multicall3Address,
            data: calldata,
            blockNumber,
            blockTag,
        });
        return decodeFunctionResult({
            abi: multicall3Abi,
            functionName: 'getEthBalance',
            args: [address],
            data: data || '0x',
        });
    }
    const blockNumberHex = typeof blockNumber === 'bigint' ? numberToHex(blockNumber) : undefined;
    const balance = await client.request({
        method: 'eth_getBalance',
        params: [address, blockNumberHex || blockTag],
    });
    return BigInt(balance);
}
//# sourceMappingURL=getBalance.js.map