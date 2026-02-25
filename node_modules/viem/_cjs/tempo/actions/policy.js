"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
exports.createSync = createSync;
exports.setAdmin = setAdmin;
exports.setAdminSync = setAdminSync;
exports.modifyWhitelist = modifyWhitelist;
exports.modifyWhitelistSync = modifyWhitelistSync;
exports.modifyBlacklist = modifyBlacklist;
exports.modifyBlacklistSync = modifyBlacklistSync;
exports.getData = getData;
exports.isAuthorized = isAuthorized;
exports.watchCreate = watchCreate;
exports.watchAdminUpdated = watchAdminUpdated;
exports.watchWhitelistUpdated = watchWhitelistUpdated;
exports.watchBlacklistUpdated = watchBlacklistUpdated;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const readContract_js_1 = require("../../actions/public/readContract.js");
const watchContractEvent_js_1 = require("../../actions/public/watchContractEvent.js");
const writeContract_js_1 = require("../../actions/wallet/writeContract.js");
const writeContractSync_js_1 = require("../../actions/wallet/writeContractSync.js");
const parseEventLogs_js_1 = require("../../utils/abi/parseEventLogs.js");
const Abis = require("../Abis.js");
const Addresses = require("../Addresses.js");
const utils_js_1 = require("../internal/utils.js");
const policyTypeMap = {
    whitelist: 0,
    blacklist: 1,
};
async function create(client, parameters) {
    return create.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (create) {
    async function inner(action, client, parameters) {
        const { account = client.account, addresses, chain = client.chain, type, ...rest } = parameters;
        if (!account)
            throw new Error('`account` is required');
        const admin = (0, parseAccount_js_1.parseAccount)(account).address;
        const call = create.call({ admin, type, addresses });
        return action(client, {
            ...rest,
            account,
            chain,
            ...call,
        });
    }
    create.inner = inner;
    function call(args) {
        const { admin, type, addresses } = args;
        const config = (() => {
            if (addresses)
                return {
                    functionName: 'createPolicyWithAccounts',
                    args: [admin, policyTypeMap[type], addresses],
                };
            return {
                functionName: 'createPolicy',
                args: [admin, policyTypeMap[type]],
            };
        })();
        return (0, utils_js_1.defineCall)({
            address: Addresses.tip403Registry,
            abi: Abis.tip403Registry,
            ...config,
        });
    }
    create.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip403Registry,
            logs,
            eventName: 'PolicyCreated',
            strict: true,
        });
        if (!log)
            throw new Error('`PolicyCreated` event not found.');
        return log;
    }
    create.extractEvent = extractEvent;
})(create || (exports.create = create = {}));
async function createSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await create.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = create.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function setAdmin(client, parameters) {
    return setAdmin.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (setAdmin) {
    async function inner(action, client, parameters) {
        const { policyId, admin, ...rest } = parameters;
        const call = setAdmin.call({ policyId, admin });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    setAdmin.inner = inner;
    function call(args) {
        const { policyId, admin } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.tip403Registry,
            abi: Abis.tip403Registry,
            functionName: 'setPolicyAdmin',
            args: [policyId, admin],
        });
    }
    setAdmin.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip403Registry,
            logs,
            eventName: 'PolicyAdminUpdated',
            strict: true,
        });
        if (!log)
            throw new Error('`PolicyAdminUpdated` event not found.');
        return log;
    }
    setAdmin.extractEvent = extractEvent;
})(setAdmin || (exports.setAdmin = setAdmin = {}));
async function setAdminSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await setAdmin.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = setAdmin.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function modifyWhitelist(client, parameters) {
    return modifyWhitelist.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (modifyWhitelist) {
    async function inner(action, client, parameters) {
        const { address: targetAccount, allowed, policyId, ...rest } = parameters;
        const call = modifyWhitelist.call({
            address: targetAccount,
            allowed,
            policyId,
        });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    modifyWhitelist.inner = inner;
    function call(args) {
        const { policyId, address, allowed } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.tip403Registry,
            abi: Abis.tip403Registry,
            functionName: 'modifyPolicyWhitelist',
            args: [policyId, address, allowed],
        });
    }
    modifyWhitelist.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip403Registry,
            logs,
            eventName: 'WhitelistUpdated',
            strict: true,
        });
        if (!log)
            throw new Error('`WhitelistUpdated` event not found.');
        return log;
    }
    modifyWhitelist.extractEvent = extractEvent;
})(modifyWhitelist || (exports.modifyWhitelist = modifyWhitelist = {}));
async function modifyWhitelistSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await modifyWhitelist.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = modifyWhitelist.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function modifyBlacklist(client, parameters) {
    return modifyBlacklist.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (modifyBlacklist) {
    async function inner(action, client, parameters) {
        const { address: targetAccount, policyId, restricted, ...rest } = parameters;
        const call = modifyBlacklist.call({
            address: targetAccount,
            policyId,
            restricted,
        });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    modifyBlacklist.inner = inner;
    function call(args) {
        const { policyId, address, restricted } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.tip403Registry,
            abi: Abis.tip403Registry,
            functionName: 'modifyPolicyBlacklist',
            args: [policyId, address, restricted],
        });
    }
    modifyBlacklist.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip403Registry,
            logs,
            eventName: 'BlacklistUpdated',
            strict: true,
        });
        if (!log)
            throw new Error('`BlacklistUpdated` event not found.');
        return log;
    }
    modifyBlacklist.extractEvent = extractEvent;
})(modifyBlacklist || (exports.modifyBlacklist = modifyBlacklist = {}));
async function modifyBlacklistSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await modifyBlacklist.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = modifyBlacklist.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function getData(client, parameters) {
    const { policyId, ...rest } = parameters;
    const result = await (0, readContract_js_1.readContract)(client, {
        ...rest,
        ...getData.call({ policyId }),
    });
    return {
        admin: result[1],
        type: result[0] === 0 ? 'whitelist' : 'blacklist',
    };
}
(function (getData) {
    function call(args) {
        const { policyId } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.tip403Registry,
            abi: Abis.tip403Registry,
            args: [policyId],
            functionName: 'policyData',
        });
    }
    getData.call = call;
})(getData || (exports.getData = getData = {}));
async function isAuthorized(client, parameters) {
    const { policyId, user, ...rest } = parameters;
    return (0, readContract_js_1.readContract)(client, {
        ...rest,
        ...isAuthorized.call({ policyId, user }),
    });
}
(function (isAuthorized) {
    function call(args) {
        const { policyId, user } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.tip403Registry,
            abi: Abis.tip403Registry,
            args: [policyId, user],
            functionName: 'isAuthorized',
        });
    }
    isAuthorized.call = call;
})(isAuthorized || (exports.isAuthorized = isAuthorized = {}));
function watchCreate(client, parameters) {
    const { onPolicyCreated, ...rest } = parameters;
    return (0, watchContractEvent_js_1.watchContractEvent)(client, {
        ...rest,
        address: Addresses.tip403Registry,
        abi: Abis.tip403Registry,
        eventName: 'PolicyCreated',
        onLogs: (logs) => {
            for (const log of logs)
                onPolicyCreated({
                    ...log.args,
                    type: log.args.policyType === 0 ? 'whitelist' : 'blacklist',
                }, log);
        },
        strict: true,
    });
}
function watchAdminUpdated(client, parameters) {
    const { onAdminUpdated, ...rest } = parameters;
    return (0, watchContractEvent_js_1.watchContractEvent)(client, {
        ...rest,
        address: Addresses.tip403Registry,
        abi: Abis.tip403Registry,
        eventName: 'PolicyAdminUpdated',
        onLogs: (logs) => {
            for (const log of logs)
                onAdminUpdated(log.args, log);
        },
        strict: true,
    });
}
function watchWhitelistUpdated(client, parameters) {
    const { onWhitelistUpdated, ...rest } = parameters;
    return (0, watchContractEvent_js_1.watchContractEvent)(client, {
        ...rest,
        address: Addresses.tip403Registry,
        abi: Abis.tip403Registry,
        eventName: 'WhitelistUpdated',
        onLogs: (logs) => {
            for (const log of logs)
                onWhitelistUpdated(log.args, log);
        },
        strict: true,
    });
}
function watchBlacklistUpdated(client, parameters) {
    const { onBlacklistUpdated, ...rest } = parameters;
    return (0, watchContractEvent_js_1.watchContractEvent)(client, {
        ...rest,
        address: Addresses.tip403Registry,
        abi: Abis.tip403Registry,
        eventName: 'BlacklistUpdated',
        onLogs: (logs) => {
            for (const log of logs)
                onBlacklistUpdated(log.args, log);
        },
        strict: true,
    });
}
//# sourceMappingURL=policy.js.map