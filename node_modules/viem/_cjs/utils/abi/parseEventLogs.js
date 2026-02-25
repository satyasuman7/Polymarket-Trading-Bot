"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEventLogs = parseEventLogs;
const isAddressEqual_js_1 = require("../address/isAddressEqual.js");
const toBytes_js_1 = require("../encoding/toBytes.js");
const log_js_1 = require("../formatters/log.js");
const keccak256_js_1 = require("../hash/keccak256.js");
const toEventSelector_js_1 = require("../hash/toEventSelector.js");
const decodeEventLog_js_1 = require("./decodeEventLog.js");
function parseEventLogs(parameters) {
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
        selector: (0, toEventSelector_js_1.toEventSelector)(abiItem),
    }));
    return logs
        .map((log) => {
        const formattedLog = typeof log.blockNumber === 'string' ? (0, log_js_1.formatLog)(log) : log;
        const abiItems = abiTopics.filter((abiTopic) => formattedLog.topics[0] === abiTopic.selector);
        if (abiItems.length === 0)
            return null;
        let event;
        let abiItem;
        for (const item of abiItems) {
            try {
                event = (0, decodeEventLog_js_1.decodeEventLog)({
                    ...formattedLog,
                    abi: [item.abi],
                    strict: true,
                });
                abiItem = item;
                break;
            }
            catch {
            }
        }
        if (!event && !strict) {
            abiItem = abiItems[0];
            try {
                event = (0, decodeEventLog_js_1.decodeEventLog)({
                    data: formattedLog.data,
                    topics: formattedLog.topics,
                    abi: [abiItem.abi],
                    strict: false,
                });
            }
            catch {
                const isUnnamed = abiItem.abi.inputs?.some((x) => !('name' in x && x.name));
                return {
                    ...formattedLog,
                    args: isUnnamed ? [] : {},
                    eventName: abiItem.abi.name,
                };
            }
        }
        if (!event || !abiItem)
            return null;
        if (eventName && !eventName.includes(event.eventName))
            return null;
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
                return (0, isAddressEqual_js_1.isAddressEqual)(value, arg);
            if (input.type === 'string' || input.type === 'bytes')
                return (0, keccak256_js_1.keccak256)((0, toBytes_js_1.toBytes)(value)) === arg;
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