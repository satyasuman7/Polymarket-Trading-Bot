"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approve = approve;
exports.approveSync = approveSync;
exports.burnBlocked = burnBlocked;
exports.burnBlockedSync = burnBlockedSync;
exports.burn = burn;
exports.burnSync = burnSync;
exports.changeTransferPolicy = changeTransferPolicy;
exports.changeTransferPolicySync = changeTransferPolicySync;
exports.create = create;
exports.createSync = createSync;
exports.getAllowance = getAllowance;
exports.getBalance = getBalance;
exports.getMetadata = getMetadata;
exports.getRoleAdmin = getRoleAdmin;
exports.hasRole = hasRole;
exports.grantRoles = grantRoles;
exports.grantRolesSync = grantRolesSync;
exports.mint = mint;
exports.mintSync = mintSync;
exports.pause = pause;
exports.pauseSync = pauseSync;
exports.renounceRoles = renounceRoles;
exports.renounceRolesSync = renounceRolesSync;
exports.revokeRoles = revokeRoles;
exports.revokeRolesSync = revokeRolesSync;
exports.setSupplyCap = setSupplyCap;
exports.setSupplyCapSync = setSupplyCapSync;
exports.setRoleAdmin = setRoleAdmin;
exports.setRoleAdminSync = setRoleAdminSync;
exports.transfer = transfer;
exports.transferSync = transferSync;
exports.unpause = unpause;
exports.unpauseSync = unpauseSync;
exports.prepareUpdateQuoteToken = prepareUpdateQuoteToken;
exports.prepareUpdateQuoteTokenSync = prepareUpdateQuoteTokenSync;
exports.updateQuoteToken = updateQuoteToken;
exports.updateQuoteTokenSync = updateQuoteTokenSync;
exports.watchApprove = watchApprove;
exports.watchBurn = watchBurn;
exports.watchCreate = watchCreate;
exports.watchMint = watchMint;
exports.watchAdminRole = watchAdminRole;
exports.watchRole = watchRole;
exports.watchTransfer = watchTransfer;
exports.watchUpdateQuoteToken = watchUpdateQuoteToken;
const Hex = require("ox/Hex");
const tempo_1 = require("ox/tempo");
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const multicall_js_1 = require("../../actions/public/multicall.js");
const readContract_js_1 = require("../../actions/public/readContract.js");
const watchContractEvent_js_1 = require("../../actions/public/watchContractEvent.js");
const sendTransaction_js_1 = require("../../actions/wallet/sendTransaction.js");
const sendTransactionSync_js_1 = require("../../actions/wallet/sendTransactionSync.js");
const writeContract_js_1 = require("../../actions/wallet/writeContract.js");
const writeContractSync_js_1 = require("../../actions/wallet/writeContractSync.js");
const encodeFunctionData_js_1 = require("../../utils/abi/encodeFunctionData.js");
const parseEventLogs_js_1 = require("../../utils/abi/parseEventLogs.js");
const Abis = require("../Abis.js");
const Addresses = require("../Addresses.js");
const utils_js_1 = require("../internal/utils.js");
async function approve(client, parameters) {
    const { token, ...rest } = parameters;
    return approve.inner(writeContract_js_1.writeContract, client, parameters, { ...rest, token });
}
(function (approve) {
    async function inner(action, client, parameters, args) {
        const call = approve.call(args);
        return (await action(client, {
            ...parameters,
            ...call,
        }));
    }
    approve.inner = inner;
    function call(args) {
        const { spender, amount, token } = args;
        return (0, utils_js_1.defineCall)({
            address: tempo_1.TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'approve',
            args: [spender, amount],
        });
    }
    approve.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip20,
            logs,
            eventName: 'Approval',
        });
        if (!log)
            throw new Error('`Approval` event not found.');
        return log;
    }
    approve.extractEvent = extractEvent;
})(approve || (exports.approve = approve = {}));
async function approveSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await approve.inner(writeContractSync_js_1.writeContractSync, client, { ...parameters, throwOnReceiptRevert }, rest);
    const { args } = approve.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function burnBlocked(client, parameters) {
    return burnBlocked.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (burnBlocked) {
    async function inner(action, client, parameters) {
        const { amount, from, token, ...rest } = parameters;
        const call = burnBlocked.call({ amount, from, token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    burnBlocked.inner = inner;
    function call(args) {
        const { from, amount, token } = args;
        return (0, utils_js_1.defineCall)({
            address: tempo_1.TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'burnBlocked',
            args: [from, amount],
        });
    }
    burnBlocked.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip20,
            logs,
            eventName: 'BurnBlocked',
        });
        if (!log)
            throw new Error('`BurnBlocked` event not found.');
        return log;
    }
    burnBlocked.extractEvent = extractEvent;
})(burnBlocked || (exports.burnBlocked = burnBlocked = {}));
async function burnBlockedSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await burnBlocked.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = burnBlocked.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function burn(client, parameters) {
    return burn.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (burn) {
    async function inner(action, client, parameters) {
        const { amount, memo, token, ...rest } = parameters;
        const call = burn.call({ amount, memo, token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    burn.inner = inner;
    function call(args) {
        const { amount, memo, token } = args;
        const callArgs = memo
            ? {
                functionName: 'burnWithMemo',
                args: [amount, Hex.padLeft(memo, 32)],
            }
            : {
                functionName: 'burn',
                args: [amount],
            };
        return (0, utils_js_1.defineCall)({
            address: tempo_1.TokenId.toAddress(token),
            abi: Abis.tip20,
            ...callArgs,
        });
    }
    burn.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip20,
            logs,
            eventName: 'Burn',
        });
        if (!log)
            throw new Error('`Burn` event not found.');
        return log;
    }
    burn.extractEvent = extractEvent;
})(burn || (exports.burn = burn = {}));
async function burnSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await burn.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = burn.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function changeTransferPolicy(client, parameters) {
    return changeTransferPolicy.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (changeTransferPolicy) {
    async function inner(action, client, parameters) {
        const { policyId, token, ...rest } = parameters;
        const call = changeTransferPolicy.call({ policyId, token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    changeTransferPolicy.inner = inner;
    function call(args) {
        const { token, policyId } = args;
        return (0, utils_js_1.defineCall)({
            address: tempo_1.TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'changeTransferPolicyId',
            args: [policyId],
        });
    }
    changeTransferPolicy.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip20,
            logs,
            eventName: 'TransferPolicyUpdate',
        });
        if (!log)
            throw new Error('`TransferPolicyUpdate` event not found.');
        return log;
    }
    changeTransferPolicy.extractEvent = extractEvent;
})(changeTransferPolicy || (exports.changeTransferPolicy = changeTransferPolicy = {}));
async function changeTransferPolicySync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await changeTransferPolicy.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = changeTransferPolicy.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function create(client, parameters) {
    return create.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (create) {
    async function inner(action, client, parameters) {
        const { account = client.account, admin: admin_ = client.account, chain = client.chain, ...rest } = parameters;
        const admin = admin_ ? (0, parseAccount_js_1.parseAccount)(admin_) : undefined;
        if (!admin)
            throw new Error('admin is required.');
        const call = create.call({ ...rest, admin: admin.address });
        return (await action(client, {
            ...parameters,
            account,
            chain,
            ...call,
        }));
    }
    create.inner = inner;
    function call(args) {
        const { name, symbol, currency, quoteToken = Addresses.pathUsd, admin, salt = Hex.random(32), } = args;
        return (0, utils_js_1.defineCall)({
            address: Addresses.tip20Factory,
            abi: Abis.tip20Factory,
            args: [
                name,
                symbol,
                currency,
                tempo_1.TokenId.toAddress(quoteToken),
                admin,
                salt,
            ],
            functionName: 'createToken',
        });
    }
    create.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip20Factory,
            logs,
            eventName: 'TokenCreated',
            strict: true,
        });
        if (!log)
            throw new Error('`TokenCreated` event not found.');
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
    const tokenId = tempo_1.TokenId.fromAddress(args.token);
    return {
        ...args,
        receipt,
        tokenId,
    };
}
async function getAllowance(client, parameters) {
    const { account = client.account } = parameters;
    const address = account ? (0, parseAccount_js_1.parseAccount)(account).address : undefined;
    if (!address)
        throw new Error('account is required.');
    return (0, readContract_js_1.readContract)(client, {
        ...parameters,
        ...getAllowance.call({ ...parameters, account: address }),
    });
}
(function (getAllowance) {
    function call(args) {
        const { account, spender, token } = args;
        return (0, utils_js_1.defineCall)({
            address: tempo_1.TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'allowance',
            args: [account, spender],
        });
    }
    getAllowance.call = call;
})(getAllowance || (exports.getAllowance = getAllowance = {}));
async function getBalance(client, parameters) {
    const { account = client.account, ...rest } = parameters;
    const address = account ? (0, parseAccount_js_1.parseAccount)(account).address : undefined;
    if (!address)
        throw new Error('account is required.');
    return (0, readContract_js_1.readContract)(client, {
        ...rest,
        ...getBalance.call({ account: address, ...rest }),
    });
}
(function (getBalance) {
    function call(args) {
        const { account, token } = args;
        return (0, utils_js_1.defineCall)({
            address: tempo_1.TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'balanceOf',
            args: [account],
        });
    }
    getBalance.call = call;
})(getBalance || (exports.getBalance = getBalance = {}));
async function getMetadata(client, parameters) {
    const { token, ...rest } = parameters;
    const address = tempo_1.TokenId.toAddress(token);
    const abi = Abis.tip20;
    if (tempo_1.TokenId.from(token) === tempo_1.TokenId.fromAddress(Addresses.pathUsd))
        return (0, multicall_js_1.multicall)(client, {
            ...rest,
            contracts: [
                {
                    address,
                    abi,
                    functionName: 'currency',
                },
                {
                    address,
                    abi,
                    functionName: 'decimals',
                },
                {
                    address,
                    abi,
                    functionName: 'name',
                },
                {
                    address,
                    abi,
                    functionName: 'symbol',
                },
                {
                    address,
                    abi,
                    functionName: 'totalSupply',
                },
            ],
            allowFailure: false,
            deployless: true,
        }).then(([currency, decimals, name, symbol, totalSupply]) => ({
            name,
            symbol,
            currency,
            decimals,
            totalSupply,
        }));
    return (0, multicall_js_1.multicall)(client, {
        ...rest,
        contracts: [
            {
                address,
                abi,
                functionName: 'currency',
            },
            {
                address,
                abi,
                functionName: 'decimals',
            },
            {
                address,
                abi,
                functionName: 'quoteToken',
            },
            {
                address,
                abi,
                functionName: 'name',
            },
            {
                address,
                abi,
                functionName: 'paused',
            },
            {
                address,
                abi,
                functionName: 'supplyCap',
            },
            {
                address,
                abi,
                functionName: 'symbol',
            },
            {
                address,
                abi,
                functionName: 'totalSupply',
            },
            {
                address,
                abi,
                functionName: 'transferPolicyId',
            },
        ],
        allowFailure: false,
        deployless: true,
    }).then(([currency, decimals, quoteToken, name, paused, supplyCap, symbol, totalSupply, transferPolicyId,]) => ({
        name,
        symbol,
        currency,
        decimals,
        quoteToken,
        totalSupply,
        paused,
        supplyCap,
        transferPolicyId,
    }));
}
async function getRoleAdmin(client, parameters) {
    return (0, readContract_js_1.readContract)(client, {
        ...parameters,
        ...getRoleAdmin.call(parameters),
    });
}
(function (getRoleAdmin) {
    function call(args) {
        const { role, token } = args;
        return (0, utils_js_1.defineCall)({
            address: tempo_1.TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'getRoleAdmin',
            args: [tempo_1.TokenRole.serialize(role)],
        });
    }
    getRoleAdmin.call = call;
})(getRoleAdmin || (exports.getRoleAdmin = getRoleAdmin = {}));
async function hasRole(client, parameters) {
    const { account = client.account } = parameters;
    const address = account ? (0, parseAccount_js_1.parseAccount)(account).address : undefined;
    if (!address)
        throw new Error('account is required.');
    return (0, readContract_js_1.readContract)(client, {
        ...parameters,
        ...hasRole.call({ ...parameters, account: address }),
    });
}
(function (hasRole) {
    function call(args) {
        const { account, role, token } = args;
        return (0, utils_js_1.defineCall)({
            address: tempo_1.TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'hasRole',
            args: [account, tempo_1.TokenRole.serialize(role)],
        });
    }
    hasRole.call = call;
})(hasRole || (exports.hasRole = hasRole = {}));
async function grantRoles(client, parameters) {
    return grantRoles.inner(sendTransaction_js_1.sendTransaction, client, parameters);
}
(function (grantRoles) {
    async function inner(action, client, parameters) {
        return (await action(client, {
            ...parameters,
            calls: parameters.roles.map((role) => {
                const call = grantRoles.call({ ...parameters, role });
                return {
                    ...call,
                    data: (0, encodeFunctionData_js_1.encodeFunctionData)(call),
                };
            }),
        }));
    }
    grantRoles.inner = inner;
    function call(args) {
        const { token, to, role } = args;
        const roleHash = tempo_1.TokenRole.serialize(role);
        return (0, utils_js_1.defineCall)({
            address: tempo_1.TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'grantRole',
            args: [roleHash, to],
        });
    }
    grantRoles.call = call;
    function extractEvents(logs) {
        const events = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip20,
            logs,
            eventName: 'RoleMembershipUpdated',
        });
        if (events.length === 0)
            throw new Error('`RoleMembershipUpdated` events not found.');
        return events;
    }
    grantRoles.extractEvents = extractEvents;
})(grantRoles || (exports.grantRoles = grantRoles = {}));
async function grantRolesSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await grantRoles.inner(sendTransactionSync_js_1.sendTransactionSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const events = grantRoles.extractEvents(receipt.logs);
    const value = events.map((event) => event.args);
    return {
        receipt,
        value,
    };
}
async function mint(client, parameters) {
    return mint.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (mint) {
    async function inner(action, client, parameters) {
        const call = mint.call(parameters);
        return (await action(client, {
            ...parameters,
            ...call,
        }));
    }
    mint.inner = inner;
    function call(args) {
        const { to, amount, memo, token } = args;
        const callArgs = memo
            ? {
                functionName: 'mintWithMemo',
                args: [to, amount, Hex.padLeft(memo, 32)],
            }
            : {
                functionName: 'mint',
                args: [to, amount],
            };
        return (0, utils_js_1.defineCall)({
            address: tempo_1.TokenId.toAddress(token),
            abi: Abis.tip20,
            ...callArgs,
        });
    }
    mint.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip20,
            logs,
            eventName: 'Mint',
        });
        if (!log)
            throw new Error('`Mint` event not found.');
        return log;
    }
    mint.extractEvent = extractEvent;
})(mint || (exports.mint = mint = {}));
async function mintSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await mint.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = mint.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function pause(client, parameters) {
    return pause.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (pause) {
    async function inner(action, client, parameters) {
        const { token, ...rest } = parameters;
        const call = pause.call({ token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    pause.inner = inner;
    function call(args) {
        const { token } = args;
        return (0, utils_js_1.defineCall)({
            address: tempo_1.TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'pause',
            args: [],
        });
    }
    pause.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip20,
            logs,
            eventName: 'PauseStateUpdate',
        });
        if (!log)
            throw new Error('`PauseStateUpdate` event not found.');
        return log;
    }
    pause.extractEvent = extractEvent;
})(pause || (exports.pause = pause = {}));
async function pauseSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await pause.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = pause.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function renounceRoles(client, parameters) {
    return renounceRoles.inner(sendTransaction_js_1.sendTransaction, client, parameters);
}
(function (renounceRoles) {
    async function inner(action, client, parameters) {
        return (await action(client, {
            ...parameters,
            calls: parameters.roles.map((role) => {
                const call = renounceRoles.call({ ...parameters, role });
                return {
                    ...call,
                    data: (0, encodeFunctionData_js_1.encodeFunctionData)(call),
                };
            }),
        }));
    }
    renounceRoles.inner = inner;
    function call(args) {
        const { token, role } = args;
        const roleHash = tempo_1.TokenRole.serialize(role);
        return (0, utils_js_1.defineCall)({
            address: tempo_1.TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'renounceRole',
            args: [roleHash],
        });
    }
    renounceRoles.call = call;
    function extractEvents(logs) {
        const events = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip20,
            logs,
            eventName: 'RoleMembershipUpdated',
        });
        if (events.length === 0)
            throw new Error('`RoleMembershipUpdated` events not found.');
        return events;
    }
    renounceRoles.extractEvents = extractEvents;
})(renounceRoles || (exports.renounceRoles = renounceRoles = {}));
async function renounceRolesSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await renounceRoles.inner(sendTransactionSync_js_1.sendTransactionSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const events = renounceRoles.extractEvents(receipt.logs);
    const value = events.map((event) => event.args);
    return {
        receipt,
        value,
    };
}
async function revokeRoles(client, parameters) {
    return revokeRoles.inner(sendTransaction_js_1.sendTransaction, client, parameters);
}
(function (revokeRoles) {
    async function inner(action, client, parameters) {
        return (await action(client, {
            ...parameters,
            calls: parameters.roles.map((role) => {
                const call = revokeRoles.call({ ...parameters, role });
                return {
                    ...call,
                    data: (0, encodeFunctionData_js_1.encodeFunctionData)(call),
                };
            }),
        }));
    }
    revokeRoles.inner = inner;
    function call(args) {
        const { token, from, role } = args;
        const roleHash = tempo_1.TokenRole.serialize(role);
        return (0, utils_js_1.defineCall)({
            address: tempo_1.TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'revokeRole',
            args: [roleHash, from],
        });
    }
    revokeRoles.call = call;
    function extractEvents(logs) {
        const events = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip20,
            logs,
            eventName: 'RoleMembershipUpdated',
        });
        if (events.length === 0)
            throw new Error('`RoleMembershipUpdated` events not found.');
        return events;
    }
    revokeRoles.extractEvents = extractEvents;
})(revokeRoles || (exports.revokeRoles = revokeRoles = {}));
async function revokeRolesSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await revokeRoles.inner(sendTransactionSync_js_1.sendTransactionSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const events = revokeRoles.extractEvents(receipt.logs);
    const value = events.map((event) => event.args);
    return {
        receipt,
        value,
    };
}
async function setSupplyCap(client, parameters) {
    return setSupplyCap.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (setSupplyCap) {
    async function inner(action, client, parameters) {
        const { supplyCap, token, ...rest } = parameters;
        const call = setSupplyCap.call({ supplyCap, token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    setSupplyCap.inner = inner;
    function call(args) {
        const { token, supplyCap } = args;
        return (0, utils_js_1.defineCall)({
            address: tempo_1.TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'setSupplyCap',
            args: [supplyCap],
        });
    }
    setSupplyCap.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip20,
            logs,
            eventName: 'SupplyCapUpdate',
        });
        if (!log)
            throw new Error('`SupplyCapUpdate` event not found.');
        return log;
    }
    setSupplyCap.extractEvent = extractEvent;
})(setSupplyCap || (exports.setSupplyCap = setSupplyCap = {}));
async function setSupplyCapSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await setSupplyCap.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = setSupplyCap.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function setRoleAdmin(client, parameters) {
    return setRoleAdmin.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (setRoleAdmin) {
    async function inner(action, client, parameters) {
        const { adminRole, role, token, ...rest } = parameters;
        const call = setRoleAdmin.call({ adminRole, role, token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    setRoleAdmin.inner = inner;
    function call(args) {
        const { token, role, adminRole } = args;
        const roleHash = tempo_1.TokenRole.serialize(role);
        const adminRoleHash = tempo_1.TokenRole.serialize(adminRole);
        return (0, utils_js_1.defineCall)({
            address: tempo_1.TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'setRoleAdmin',
            args: [roleHash, adminRoleHash],
        });
    }
    setRoleAdmin.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip20,
            logs,
            eventName: 'RoleAdminUpdated',
        });
        if (!log)
            throw new Error('`RoleAdminUpdated` event not found.');
        return log;
    }
    setRoleAdmin.extractEvent = extractEvent;
})(setRoleAdmin || (exports.setRoleAdmin = setRoleAdmin = {}));
async function setRoleAdminSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await setRoleAdmin.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = setRoleAdmin.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function transfer(client, parameters) {
    return transfer.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (transfer) {
    async function inner(action, client, parameters) {
        const { amount, from, memo, token, to, ...rest } = parameters;
        const call = transfer.call({ amount, from, memo, token, to });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    transfer.inner = inner;
    function call(args) {
        const { amount, from, memo, token, to } = args;
        const callArgs = (() => {
            if (memo && from)
                return {
                    functionName: 'transferFromWithMemo',
                    args: [from, to, amount, Hex.padLeft(memo, 32)],
                };
            if (memo)
                return {
                    functionName: 'transferWithMemo',
                    args: [to, amount, Hex.padLeft(memo, 32)],
                };
            if (from)
                return {
                    functionName: 'transferFrom',
                    args: [from, to, amount],
                };
            return {
                functionName: 'transfer',
                args: [to, amount],
            };
        })();
        return (0, utils_js_1.defineCall)({
            address: tempo_1.TokenId.toAddress(token),
            abi: Abis.tip20,
            ...callArgs,
        });
    }
    transfer.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip20,
            logs,
            eventName: 'Transfer',
        });
        if (!log)
            throw new Error('`Transfer` event not found.');
        return log;
    }
    transfer.extractEvent = extractEvent;
})(transfer || (exports.transfer = transfer = {}));
async function transferSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await transfer.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = transfer.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function unpause(client, parameters) {
    return unpause.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (unpause) {
    async function inner(action, client, parameters) {
        const { token, ...rest } = parameters;
        const call = unpause.call({ token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    unpause.inner = inner;
    function call(args) {
        const { token } = args;
        return (0, utils_js_1.defineCall)({
            address: tempo_1.TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'unpause',
            args: [],
        });
    }
    unpause.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip20,
            logs,
            eventName: 'PauseStateUpdate',
        });
        if (!log)
            throw new Error('`PauseStateUpdate` event not found.');
        return log;
    }
    unpause.extractEvent = extractEvent;
})(unpause || (exports.unpause = unpause = {}));
async function unpauseSync(client, parameters) {
    const { throwOnReceiptRevert = true, ...rest } = parameters;
    const receipt = await unpause.inner(writeContractSync_js_1.writeContractSync, client, {
        ...rest,
        throwOnReceiptRevert,
    });
    const { args } = unpause.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function prepareUpdateQuoteToken(client, parameters) {
    return prepareUpdateQuoteToken.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (prepareUpdateQuoteToken) {
    async function inner(action, client, parameters) {
        const { quoteToken, token, ...rest } = parameters;
        const call = prepareUpdateQuoteToken.call({ quoteToken, token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    prepareUpdateQuoteToken.inner = inner;
    function call(args) {
        const { token, quoteToken } = args;
        return (0, utils_js_1.defineCall)({
            address: tempo_1.TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'setNextQuoteToken',
            args: [tempo_1.TokenId.toAddress(quoteToken)],
        });
    }
    prepareUpdateQuoteToken.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip20,
            logs,
            eventName: 'NextQuoteTokenSet',
        });
        if (!log)
            throw new Error('`NextQuoteTokenSet` event not found.');
        return log;
    }
    prepareUpdateQuoteToken.extractEvent = extractEvent;
})(prepareUpdateQuoteToken || (exports.prepareUpdateQuoteToken = prepareUpdateQuoteToken = {}));
async function prepareUpdateQuoteTokenSync(client, parameters) {
    const receipt = await prepareUpdateQuoteToken.inner(writeContractSync_js_1.writeContractSync, client, parameters);
    const { args } = prepareUpdateQuoteToken.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
async function updateQuoteToken(client, parameters) {
    return updateQuoteToken.inner(writeContract_js_1.writeContract, client, parameters);
}
(function (updateQuoteToken) {
    async function inner(action, client, parameters) {
        const { token, ...rest } = parameters;
        const call = updateQuoteToken.call({ token });
        return (await action(client, {
            ...rest,
            ...call,
        }));
    }
    updateQuoteToken.inner = inner;
    function call(args) {
        const { token } = args;
        return (0, utils_js_1.defineCall)({
            address: tempo_1.TokenId.toAddress(token),
            abi: Abis.tip20,
            functionName: 'completeQuoteTokenUpdate',
            args: [],
        });
    }
    updateQuoteToken.call = call;
    function extractEvent(logs) {
        const [log] = (0, parseEventLogs_js_1.parseEventLogs)({
            abi: Abis.tip20,
            logs,
            eventName: 'QuoteTokenUpdate',
        });
        if (!log)
            throw new Error('`QuoteTokenUpdateCompleted` event not found.');
        return log;
    }
    updateQuoteToken.extractEvent = extractEvent;
})(updateQuoteToken || (exports.updateQuoteToken = updateQuoteToken = {}));
async function updateQuoteTokenSync(client, parameters) {
    const receipt = await updateQuoteToken.inner(writeContractSync_js_1.writeContractSync, client, parameters);
    const { args } = updateQuoteToken.extractEvent(receipt.logs);
    return {
        ...args,
        receipt,
    };
}
function watchApprove(client, parameters) {
    const { onApproval, token, ...rest } = parameters;
    return (0, watchContractEvent_js_1.watchContractEvent)(client, {
        ...rest,
        address: tempo_1.TokenId.toAddress(token),
        abi: Abis.tip20,
        eventName: 'Approval',
        onLogs: (logs) => {
            for (const log of logs)
                onApproval(log.args, log);
        },
        strict: true,
    });
}
function watchBurn(client, parameters) {
    const { onBurn, token, ...rest } = parameters;
    return (0, watchContractEvent_js_1.watchContractEvent)(client, {
        ...rest,
        address: tempo_1.TokenId.toAddress(token),
        abi: Abis.tip20,
        eventName: 'Burn',
        onLogs: (logs) => {
            for (const log of logs)
                onBurn(log.args, log);
        },
        strict: true,
    });
}
function watchCreate(client, parameters) {
    const { onTokenCreated, ...rest } = parameters;
    return (0, watchContractEvent_js_1.watchContractEvent)(client, {
        ...rest,
        address: Addresses.tip20Factory,
        abi: Abis.tip20Factory,
        eventName: 'TokenCreated',
        onLogs: (logs) => {
            for (const log of logs)
                onTokenCreated(log.args, log);
        },
        strict: true,
    });
}
function watchMint(client, parameters) {
    const { onMint, token, ...rest } = parameters;
    return (0, watchContractEvent_js_1.watchContractEvent)(client, {
        ...rest,
        address: tempo_1.TokenId.toAddress(token),
        abi: Abis.tip20,
        eventName: 'Mint',
        onLogs: (logs) => {
            for (const log of logs)
                onMint(log.args, log);
        },
        strict: true,
    });
}
function watchAdminRole(client, parameters) {
    const { onRoleAdminUpdated, token, ...rest } = parameters;
    return (0, watchContractEvent_js_1.watchContractEvent)(client, {
        ...rest,
        address: tempo_1.TokenId.toAddress(token),
        abi: Abis.tip20,
        eventName: 'RoleAdminUpdated',
        onLogs: (logs) => {
            for (const log of logs)
                onRoleAdminUpdated(log.args, log);
        },
        strict: true,
    });
}
function watchRole(client, parameters) {
    const { onRoleUpdated, token, ...rest } = parameters;
    return (0, watchContractEvent_js_1.watchContractEvent)(client, {
        ...rest,
        address: tempo_1.TokenId.toAddress(token),
        abi: Abis.tip20,
        eventName: 'RoleMembershipUpdated',
        onLogs: (logs) => {
            for (const log of logs) {
                const type = log.args.hasRole ? 'granted' : 'revoked';
                onRoleUpdated({ ...log.args, type }, log);
            }
        },
        strict: true,
    });
}
function watchTransfer(client, parameters) {
    const { onTransfer, token, ...rest } = parameters;
    return (0, watchContractEvent_js_1.watchContractEvent)(client, {
        ...rest,
        address: tempo_1.TokenId.toAddress(token),
        abi: Abis.tip20,
        eventName: 'Transfer',
        onLogs: (logs) => {
            for (const log of logs)
                onTransfer(log.args, log);
        },
        strict: true,
    });
}
function watchUpdateQuoteToken(client, parameters) {
    const { onUpdateQuoteToken, token, ...rest } = parameters;
    const address = tempo_1.TokenId.toAddress(token);
    return (0, watchContractEvent_js_1.watchContractEvent)(client, {
        ...rest,
        address,
        abi: Abis.tip20,
        onLogs: (logs) => {
            for (const log of logs) {
                if (log.eventName !== 'NextQuoteTokenSet' &&
                    log.eventName !== 'QuoteTokenUpdate')
                    continue;
                onUpdateQuoteToken({
                    ...log.args,
                    completed: log.eventName === 'QuoteTokenUpdate',
                }, log);
            }
        },
        strict: true,
    });
}
//# sourceMappingURL=token.js.map