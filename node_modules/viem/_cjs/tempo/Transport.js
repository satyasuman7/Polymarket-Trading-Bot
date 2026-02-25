"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withFeePayer = withFeePayer;
exports.walletNamespaceCompat = walletNamespaceCompat;
const Address = require("ox/Address");
const Hash = require("ox/Hash");
const Hex = require("ox/Hex");
const Provider = require("ox/Provider");
const RpcRequest = require("ox/RpcRequest");
const getTransactionReceipt_js_1 = require("../actions/public/getTransactionReceipt.js");
const sendTransaction_js_1 = require("../actions/wallet/sendTransaction.js");
const sendTransactionSync_js_1 = require("../actions/wallet/sendTransactionSync.js");
const createClient_js_1 = require("../clients/createClient.js");
const createTransport_js_1 = require("../clients/transports/createTransport.js");
const Transaction = require("./Transaction.js");
function withFeePayer(defaultTransport, relayTransport, parameters) {
    const { policy = 'sign-only' } = parameters ?? {};
    return (config) => {
        const transport_default = defaultTransport(config);
        const transport_relay = relayTransport(config);
        return (0, createTransport_js_1.createTransport)({
            key: withFeePayer.type,
            name: 'Relay Proxy',
            async request({ method, params }, options) {
                if (method === 'eth_sendRawTransactionSync' ||
                    method === 'eth_sendRawTransaction') {
                    const serialized = params[0];
                    const transaction = Transaction.deserialize(serialized);
                    if (transaction.feePayerSignature === null) {
                        if (policy === 'sign-and-broadcast')
                            return transport_relay.request({ method, params }, options);
                        {
                            const signedTransaction = await transport_relay.request({
                                method: 'eth_signRawTransaction',
                                params: [serialized],
                            }, options);
                            return transport_default.request({ method, params: [signedTransaction] }, options);
                        }
                    }
                }
                return (await transport_default.request({ method, params }, options));
            },
            type: withFeePayer.type,
        });
    };
}
function walletNamespaceCompat(transport, options) {
    const { account } = options;
    const sendCallsMagic = Hash.keccak256(Hex.fromString('TEMPO_5792'));
    return (options) => {
        const t = transport(options);
        const chain = options.chain;
        return {
            ...t,
            async request(args) {
                const request = RpcRequest.from(args);
                const client = (0, createClient_js_1.createClient)({
                    chain,
                    transport,
                });
                if (request.method === 'wallet_sendCalls') {
                    const params = request.params[0] ?? {};
                    const { capabilities, chainId, from } = params;
                    const { sync, ...properties } = capabilities ?? {};
                    if (!chainId)
                        throw new Provider.UnsupportedChainIdError();
                    if (Number(chainId) !== client.chain.id)
                        throw new Provider.UnsupportedChainIdError();
                    if (from && !Address.isEqual(from, account.address))
                        throw new Provider.DisconnectedError();
                    const calls = (params.calls ?? []).map((call) => ({
                        to: call.to,
                        value: call.value ? BigInt(call.value) : undefined,
                        data: call.data,
                    }));
                    const hash = await (async () => {
                        if (!sync)
                            return (0, sendTransaction_js_1.sendTransaction)(client, {
                                account,
                                ...(properties ? properties : {}),
                                calls,
                            });
                        const { transactionHash } = await (0, sendTransactionSync_js_1.sendTransactionSync)(client, {
                            account,
                            ...(properties ? properties : {}),
                            calls,
                        });
                        return transactionHash;
                    })();
                    const id = Hex.concat(hash, Hex.padLeft(chainId, 32), sendCallsMagic);
                    return {
                        capabilities: { sync },
                        id,
                    };
                }
                if (request.method === 'wallet_getCallsStatus') {
                    const [id] = request.params ?? [];
                    if (!id)
                        throw new Error('`id` not found');
                    if (!id.endsWith(sendCallsMagic.slice(2)))
                        throw new Error('`id` not supported');
                    Hex.assert(id);
                    const hash = Hex.slice(id, 0, 32);
                    const chainId = Hex.slice(id, 32, 64);
                    const receipt = await (0, getTransactionReceipt_js_1.getTransactionReceipt)(client, { hash });
                    return {
                        atomic: true,
                        chainId: Number(chainId),
                        id,
                        receipts: [receipt],
                        status: receipt.status === 'success' ? 200 : 500,
                        version: '2.0.0',
                    };
                }
                return t.request(args);
            },
        };
    };
}
//# sourceMappingURL=Transport.js.map