import { readContract } from '../../actions/public/readContract.js';
import { watchContractEvent } from '../../actions/public/watchContractEvent.js';
import * as Abis from '../Abis.js';
import * as Addresses from '../Addresses.js';
import { defineCall } from '../internal/utils.js';
/**
 * Gets the nonce for an account and nonce key.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' }),
 *   transport: http(),
 * })
 *
 * const nonce = await Actions.nonce.getNonce(client, {
 *   account: '0x...',
 *   nonceKey: 1n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The nonce value.
 */
export async function getNonce(client, parameters) {
    const { account, nonceKey, ...rest } = parameters;
    return readContract(client, {
        ...rest,
        ...getNonce.call({ account, nonceKey }),
    });
}
(function (getNonce) {
    /**
     * Defines a call to the `getNonce` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`multicall`](https://viem.sh/docs/contract/multicall): execute multiple calls in parallel
     *
     * @example
     * ```ts
     * import { createClient, http } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' }),
     *   transport: http(),
     * })
     *
     * const result = await client.multicall({
     *   contracts: [
     *     Actions.nonce.getNonce.call({ account: '0x...', nonceKey: 1n }),
     *     Actions.nonce.getNonce.call({ account: '0x...', nonceKey: 2n }),
     *   ],
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { account, nonceKey } = args;
        return defineCall({
            address: Addresses.nonceManager,
            abi: Abis.nonce,
            args: [account, nonceKey],
            functionName: 'getNonce',
        });
    }
    getNonce.call = call;
})(getNonce || (getNonce = {}));
export function watchNonceIncremented(client, parameters) {
    const { onNonceIncremented, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: Addresses.nonceManager,
        abi: Abis.nonce,
        eventName: 'NonceIncremented',
        onLogs: (logs) => {
            for (const log of logs)
                onNonceIncremented(log.args, log);
        },
        strict: true,
    });
}
//# sourceMappingURL=nonce.js.map