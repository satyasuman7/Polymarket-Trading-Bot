// TODO(v3): checksum address.
import { isAddressEqual } from '../address/isAddressEqual.js';
import { toBytes } from '../encoding/toBytes.js';
import { formatLog } from '../formatters/log.js';
import { keccak256 } from '../hash/keccak256.js';
import { toEventSelector } from '../hash/toEventSelector.js';
import { decodeEventLog, } from './decodeEventLog.js';
/**
 * Extracts & decodes logs matching the provided signature(s) (`abi` + optional `eventName`)
 * from a set of opaque logs.
 *
 * @param parameters - {@link ParseEventLogsParameters}
 * @returns The logs. {@link ParseEventLogsReturnType}
 *
 * @example
 * import { createClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { parseEventLogs } from 'viem/op-stack'
 *
 * const client = createClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const receipt = await getTransactionReceipt(client, {
 *   hash: '0xec23b2ba4bc59ba61554507c1b1bc91649e6586eb2dd00c728e8ed0db8bb37ea',
 * })
 *
 * const logs = parseEventLogs({ logs: receipt.logs })
 * // [{ args: { ... }, eventName: 'TransactionDeposited', ... }, ...]
 */
export function parseEventLogs(parameters) {
    const { abi, args, logs, strict = true } = parameters;
    const eventName = (() => {
        if (!parameters.eventName)
            return undefined;
        if (Array.isArray(parameters.eventName))
            return parameters.eventName;
        return [parameters.eventName];
    })();
    const abiTopics = abi
        .filter((abiItem) => abiItem.type === 'event')
        .map((abiItem) => ({
        abi: abiItem,
        selector: toEventSelector(abiItem),
    }));
    return logs
        .map((log) => {
        // Normalize RpcLog (hex-encoded quantities) to Log (bigint/number).
        // When logs come directly from an RPC response (e.g. eth_getLogs),
        // fields like blockNumber are hex strings instead of bigints.
        const formattedLog = typeof log.blockNumber === 'string' ? formatLog(log) : log;
        // Find all matching ABI items with the same selector.
        // Multiple events can share the same selector but differ in indexed parameters
        // (e.g., ERC20 vs ERC721 Transfer events).
        const abiItems = abiTopics.filter((abiTopic) => formattedLog.topics[0] === abiTopic.selector);
        if (abiItems.length === 0)
            return null;
        // Try each matching ABI item until one successfully decodes.
        let event;
        let abiItem;
        for (const item of abiItems) {
            try {
                event = decodeEventLog({
                    ...formattedLog,
                    abi: [item.abi],
                    strict: true,
                });
                abiItem = item;
                break;
            }
            catch {
                // Try next ABI item
            }
        }
        // If strict decoding failed for all, and we're in non-strict mode,
        // fall back to the first matching ABI item.
        if (!event && !strict) {
            abiItem = abiItems[0];
            try {
                event = decodeEventLog({
                    data: formattedLog.data,
                    topics: formattedLog.topics,
                    abi: [abiItem.abi],
                    strict: false,
                });
            }
            catch {
                // If decoding still fails, return partial log in non-strict mode.
                const isUnnamed = abiItem.abi.inputs?.some((x) => !('name' in x && x.name));
                return {
                    ...formattedLog,
                    args: isUnnamed ? [] : {},
                    eventName: abiItem.abi.name,
                };
            }
        }
        // If no event was found, return null.
        if (!event || !abiItem)
            return null;
        // Check that the decoded event name matches the provided event name.
        if (eventName && !eventName.includes(event.eventName))
            return null;
        // Check that the decoded event args match the provided args.
        if (!includesArgs({
            args: event.args,
            inputs: abiItem.abi.inputs,
            matchArgs: args,
        }))
            return null;
        return { ...event, ...formattedLog };
    })
        .filter(Boolean);
}
function includesArgs(parameters) {
    const { args, inputs, matchArgs } = parameters;
    if (!matchArgs)
        return true;
    if (!args)
        return false;
    function isEqual(input, value, arg) {
        try {
            if (input.type === 'address')
                return isAddressEqual(value, arg);
            if (input.type === 'string' || input.type === 'bytes')
                return keccak256(toBytes(value)) === arg;
            return value === arg;
        }
        catch {
            return false;
        }
    }
    if (Array.isArray(args) && Array.isArray(matchArgs)) {
        return matchArgs.every((value, index) => {
            if (value === null || value === undefined)
                return true;
            const input = inputs[index];
            if (!input)
                return false;
            const value_ = Array.isArray(value) ? value : [value];
            return value_.some((value) => isEqual(input, value, args[index]));
        });
    }
    if (typeof args === 'object' &&
        !Array.isArray(args) &&
        typeof matchArgs === 'object' &&
        !Array.isArray(matchArgs))
        return Object.entries(matchArgs).every(([key, value]) => {
            if (value === null || value === undefined)
                return true;
            const input = inputs.find((input) => input.name === key);
            if (!input)
                return false;
            const value_ = Array.isArray(value) ? value : [value];
            return value_.some((value) => isEqual(input, value, args[key]));
        });
    return false;
}
//# sourceMappingURL=parseEventLogs.js.map