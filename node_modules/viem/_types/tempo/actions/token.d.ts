import type { Address } from 'abitype';
import * as Hex from 'ox/Hex';
import { TokenId, TokenRole } from 'ox/tempo';
import type { Account } from '../../accounts/types.js';
import type { ReadContractReturnType } from '../../actions/public/readContract.js';
import type { WatchContractEventParameters, WatchContractEventReturnType } from '../../actions/public/watchContractEvent.js';
import { sendTransaction } from '../../actions/wallet/sendTransaction.js';
import { type SendTransactionSyncParameters, sendTransactionSync } from '../../actions/wallet/sendTransactionSync.js';
import type { WriteContractReturnType } from '../../actions/wallet/writeContract.js';
import { writeContract } from '../../actions/wallet/writeContract.js';
import { writeContractSync } from '../../actions/wallet/writeContractSync.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { BaseErrorType } from '../../errors/base.js';
import type { Chain } from '../../types/chain.js';
import type { ExtractAbiItem, GetEventArgs } from '../../types/contract.js';
import type { Log, Log as viem_Log } from '../../types/log.js';
import type { Compute, OneOf, UnionOmit } from '../../types/utils.js';
import * as Abis from '../Abis.js';
import type { GetAccountParameter, ReadParameters, WriteParameters } from '../internal/types.js';
import type { TransactionReceipt } from '../Transaction.js';
/**
 * Approves a spender to transfer TIP20 tokens on behalf of the caller.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.approve(client, {
 *   spender: '0x...',
 *   amount: 100n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function approve<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: approve.Parameters<chain, account>): Promise<approve.ReturnValue>;
export declare namespace approve {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Amount of tokens to approve. */
        amount: bigint;
        /** Address of the spender. */
        spender: Address;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: approve.Parameters<chain, account>, args: Args): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `approve` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.token.approve.call({
     *       spender: '0x20c0...beef',
     *       amount: 100n,
     *       token: '0x20c0...babe',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "approve";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "spender";
            }, {
                readonly type: "uint256";
                readonly name: "amount";
            }];
            readonly outputs: readonly [{
                readonly type: "bool";
            }];
        }];
        functionName: "approve";
    } & {
        args: readonly [spender: `0x${string}`, amount: bigint];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "name";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "symbol";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "decimals";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint8";
        }];
    }, {
        readonly name: "totalSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "quoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "nextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "balanceOf";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transfer";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "approve";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "spender";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "allowance";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
        }, {
            readonly type: "address";
            readonly name: "spender";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transferFrom";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "mint";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "currency";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "supplyCap";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "paused";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "transferPolicyId";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "burnBlocked";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "mintWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burnWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferFromWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "changeTransferPolicyId";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "newPolicyId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setSupplyCap";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "newSupplyCap";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "pause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "unpause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "setNextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "newQuoteToken";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "completeQuoteTokenUpdate";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "PAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "UNPAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "ISSUER_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "BURN_BLOCKED_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "distributeReward";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRewardRecipient";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "recipient";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "claimRewards";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "optedInSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "globalRewardPerToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "userRewardInfo";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "rewardRecipient";
            }, {
                readonly type: "uint256";
                readonly name: "rewardPerToken";
            }, {
                readonly type: "uint256";
                readonly name: "rewardBalance";
            }];
        }];
    }, {
        readonly name: "getPendingRewards";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "Transfer";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Approval";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "spender";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Mint";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Burn";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "BurnBlocked";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "TransferWithMemo";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
            readonly indexed: true;
        }];
    }, {
        readonly name: "TransferPolicyUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint64";
            readonly name: "newPolicyId";
            readonly indexed: true;
        }];
    }, {
        readonly name: "SupplyCapUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "newSupplyCap";
            readonly indexed: true;
        }];
    }, {
        readonly name: "PauseStateUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "isPaused";
        }];
    }, {
        readonly name: "NextQuoteTokenSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "nextQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "QuoteTokenUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "newQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "RewardDistributed";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "funder";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "RewardRecipientSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "holder";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "recipient";
            readonly indexed: true;
        }];
    }, {
        readonly name: "InsufficientBalance";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "available";
        }, {
            readonly type: "uint256";
            readonly name: "required";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
    }, {
        readonly name: "InsufficientAllowance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "SupplyCapExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidSupplyCap";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidPayload";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "StringTooLong";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PolicyForbids";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidRecipient";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ContractPaused";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidCurrency";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidQuoteToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TransfersDisabled";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidAmount";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "NoOptedInSupply";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ProtectedAddress";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Uninitialized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidTransferPolicyId";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "hasRole";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "getRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "grantRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "revokeRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "renounceRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "bytes32";
            readonly name: "adminRole";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "RoleMembershipUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "hasRole";
        }];
    }, {
        readonly name: "RoleAdminUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "bytes32";
            readonly name: "newAdminRole";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "Approval">;
}
/**
 * Approves a spender to transfer TIP20 tokens on behalf of the caller.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.approveSync(client, {
 *   spender: '0x...',
 *   amount: 100n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function approveSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: approveSync.Parameters<chain, account>): Promise<approveSync.ReturnValue>;
export declare namespace approveSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = approve.Parameters<chain, account>;
    type Args = approve.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.tip20, 'Approval', {
        IndexedOnly: false;
        Required: true;
    }> & {
        /** Transaction receipt. */
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
}
/**
 * Burns TIP20 tokens from a blocked address.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.burnBlocked(client, {
 *   from: '0x...',
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function burnBlocked<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: burnBlocked.Parameters<chain, account>): Promise<burnBlocked.ReturnValue>;
export declare namespace burnBlocked {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Amount of tokens to burn. */
        amount: bigint;
        /** Address to burn tokens from. */
        from: Address;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: burnBlocked.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `burnBlocked` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.token.burnBlocked.call({
     *       from: '0x20c0...beef',
     *       amount: 100n,
     *       token: '0x20c0...babe',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "burnBlocked";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "from";
            }, {
                readonly type: "uint256";
                readonly name: "amount";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "burnBlocked";
    } & {
        args: readonly [from: `0x${string}`, amount: bigint];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "name";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "symbol";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "decimals";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint8";
        }];
    }, {
        readonly name: "totalSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "quoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "nextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "balanceOf";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transfer";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "approve";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "spender";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "allowance";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
        }, {
            readonly type: "address";
            readonly name: "spender";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transferFrom";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "mint";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "currency";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "supplyCap";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "paused";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "transferPolicyId";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "burnBlocked";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "mintWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burnWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferFromWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "changeTransferPolicyId";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "newPolicyId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setSupplyCap";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "newSupplyCap";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "pause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "unpause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "setNextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "newQuoteToken";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "completeQuoteTokenUpdate";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "PAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "UNPAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "ISSUER_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "BURN_BLOCKED_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "distributeReward";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRewardRecipient";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "recipient";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "claimRewards";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "optedInSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "globalRewardPerToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "userRewardInfo";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "rewardRecipient";
            }, {
                readonly type: "uint256";
                readonly name: "rewardPerToken";
            }, {
                readonly type: "uint256";
                readonly name: "rewardBalance";
            }];
        }];
    }, {
        readonly name: "getPendingRewards";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "Transfer";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Approval";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "spender";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Mint";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Burn";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "BurnBlocked";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "TransferWithMemo";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
            readonly indexed: true;
        }];
    }, {
        readonly name: "TransferPolicyUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint64";
            readonly name: "newPolicyId";
            readonly indexed: true;
        }];
    }, {
        readonly name: "SupplyCapUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "newSupplyCap";
            readonly indexed: true;
        }];
    }, {
        readonly name: "PauseStateUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "isPaused";
        }];
    }, {
        readonly name: "NextQuoteTokenSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "nextQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "QuoteTokenUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "newQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "RewardDistributed";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "funder";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "RewardRecipientSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "holder";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "recipient";
            readonly indexed: true;
        }];
    }, {
        readonly name: "InsufficientBalance";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "available";
        }, {
            readonly type: "uint256";
            readonly name: "required";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
    }, {
        readonly name: "InsufficientAllowance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "SupplyCapExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidSupplyCap";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidPayload";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "StringTooLong";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PolicyForbids";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidRecipient";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ContractPaused";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidCurrency";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidQuoteToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TransfersDisabled";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidAmount";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "NoOptedInSupply";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ProtectedAddress";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Uninitialized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidTransferPolicyId";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "hasRole";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "getRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "grantRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "revokeRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "renounceRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "bytes32";
            readonly name: "adminRole";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "RoleMembershipUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "hasRole";
        }];
    }, {
        readonly name: "RoleAdminUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "bytes32";
            readonly name: "newAdminRole";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "BurnBlocked">;
}
/**
 * Burns TIP20 tokens from a blocked address.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.burnBlockedSync(client, {
 *   from: '0x...',
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function burnBlockedSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: burnBlockedSync.Parameters<chain, account>): Promise<burnBlockedSync.ReturnValue>;
export declare namespace burnBlockedSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = burnBlocked.Parameters<chain, account>;
    type Args = burnBlocked.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.tip20, 'BurnBlocked', {
        IndexedOnly: false;
        Required: true;
    }> & {
        /** Transaction receipt. */
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
}
/**
 * Burns TIP20 tokens from the caller's balance.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.burn(client, {
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function burn<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: burn.Parameters<chain, account>): Promise<burn.ReturnValue>;
export declare namespace burn {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Amount of tokens to burn. */
        amount: bigint;
        /** Memo to include in the transfer. */
        memo?: Hex.Hex | undefined;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: burn.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `burn` or `burnWithMemo` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.token.burn.call({
     *       amount: 100n,
     *       token: '0x20c0...babe',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "burn";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "uint256";
                readonly name: "amount";
            }];
            readonly outputs: readonly [];
        } | {
            readonly name: "burnWithMemo";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "uint256";
                readonly name: "amount";
            }, {
                readonly type: "bytes32";
                readonly name: "memo";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "burn" | "burnWithMemo";
    } & {
        args: readonly [amount: bigint] | readonly [amount: bigint, memo: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "name";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "symbol";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "decimals";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint8";
        }];
    }, {
        readonly name: "totalSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "quoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "nextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "balanceOf";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transfer";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "approve";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "spender";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "allowance";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
        }, {
            readonly type: "address";
            readonly name: "spender";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transferFrom";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "mint";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "currency";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "supplyCap";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "paused";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "transferPolicyId";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "burnBlocked";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "mintWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burnWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferFromWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "changeTransferPolicyId";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "newPolicyId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setSupplyCap";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "newSupplyCap";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "pause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "unpause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "setNextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "newQuoteToken";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "completeQuoteTokenUpdate";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "PAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "UNPAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "ISSUER_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "BURN_BLOCKED_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "distributeReward";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRewardRecipient";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "recipient";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "claimRewards";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "optedInSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "globalRewardPerToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "userRewardInfo";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "rewardRecipient";
            }, {
                readonly type: "uint256";
                readonly name: "rewardPerToken";
            }, {
                readonly type: "uint256";
                readonly name: "rewardBalance";
            }];
        }];
    }, {
        readonly name: "getPendingRewards";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "Transfer";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Approval";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "spender";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Mint";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Burn";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "BurnBlocked";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "TransferWithMemo";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
            readonly indexed: true;
        }];
    }, {
        readonly name: "TransferPolicyUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint64";
            readonly name: "newPolicyId";
            readonly indexed: true;
        }];
    }, {
        readonly name: "SupplyCapUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "newSupplyCap";
            readonly indexed: true;
        }];
    }, {
        readonly name: "PauseStateUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "isPaused";
        }];
    }, {
        readonly name: "NextQuoteTokenSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "nextQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "QuoteTokenUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "newQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "RewardDistributed";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "funder";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "RewardRecipientSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "holder";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "recipient";
            readonly indexed: true;
        }];
    }, {
        readonly name: "InsufficientBalance";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "available";
        }, {
            readonly type: "uint256";
            readonly name: "required";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
    }, {
        readonly name: "InsufficientAllowance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "SupplyCapExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidSupplyCap";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidPayload";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "StringTooLong";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PolicyForbids";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidRecipient";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ContractPaused";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidCurrency";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidQuoteToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TransfersDisabled";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidAmount";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "NoOptedInSupply";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ProtectedAddress";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Uninitialized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidTransferPolicyId";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "hasRole";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "getRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "grantRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "revokeRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "renounceRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "bytes32";
            readonly name: "adminRole";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "RoleMembershipUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "hasRole";
        }];
    }, {
        readonly name: "RoleAdminUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "bytes32";
            readonly name: "newAdminRole";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "Burn">;
}
/**
 * Burns TIP20 tokens from the caller's balance.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.burnSync(client, {
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function burnSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: burnSync.Parameters<chain, account>): Promise<burnSync.ReturnValue>;
export declare namespace burnSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = burn.Parameters<chain, account>;
    type Args = burn.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.tip20, 'Burn', {
        IndexedOnly: false;
        Required: true;
    }> & {
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
}
/**
 * Changes the transfer policy ID for a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.changeTransferPolicy(client, {
 *   token: '0x...',
 *   policyId: 1n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function changeTransferPolicy<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: changeTransferPolicy.Parameters<chain, account>): Promise<changeTransferPolicy.ReturnValue>;
export declare namespace changeTransferPolicy {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** New transfer policy ID. */
        policyId: bigint;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: changeTransferPolicy.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `changeTransferPolicyId` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.token.changeTransferPolicy.call({
     *       token: '0x20c0...babe',
     *       policyId: 1n,
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "changeTransferPolicyId";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "uint64";
                readonly name: "newPolicyId";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "changeTransferPolicyId";
    } & {
        args: readonly [bigint];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "name";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "symbol";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "decimals";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint8";
        }];
    }, {
        readonly name: "totalSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "quoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "nextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "balanceOf";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transfer";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "approve";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "spender";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "allowance";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
        }, {
            readonly type: "address";
            readonly name: "spender";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transferFrom";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "mint";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "currency";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "supplyCap";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "paused";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "transferPolicyId";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "burnBlocked";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "mintWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burnWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferFromWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "changeTransferPolicyId";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "newPolicyId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setSupplyCap";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "newSupplyCap";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "pause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "unpause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "setNextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "newQuoteToken";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "completeQuoteTokenUpdate";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "PAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "UNPAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "ISSUER_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "BURN_BLOCKED_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "distributeReward";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRewardRecipient";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "recipient";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "claimRewards";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "optedInSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "globalRewardPerToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "userRewardInfo";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "rewardRecipient";
            }, {
                readonly type: "uint256";
                readonly name: "rewardPerToken";
            }, {
                readonly type: "uint256";
                readonly name: "rewardBalance";
            }];
        }];
    }, {
        readonly name: "getPendingRewards";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "Transfer";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Approval";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "spender";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Mint";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Burn";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "BurnBlocked";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "TransferWithMemo";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
            readonly indexed: true;
        }];
    }, {
        readonly name: "TransferPolicyUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint64";
            readonly name: "newPolicyId";
            readonly indexed: true;
        }];
    }, {
        readonly name: "SupplyCapUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "newSupplyCap";
            readonly indexed: true;
        }];
    }, {
        readonly name: "PauseStateUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "isPaused";
        }];
    }, {
        readonly name: "NextQuoteTokenSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "nextQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "QuoteTokenUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "newQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "RewardDistributed";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "funder";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "RewardRecipientSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "holder";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "recipient";
            readonly indexed: true;
        }];
    }, {
        readonly name: "InsufficientBalance";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "available";
        }, {
            readonly type: "uint256";
            readonly name: "required";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
    }, {
        readonly name: "InsufficientAllowance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "SupplyCapExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidSupplyCap";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidPayload";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "StringTooLong";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PolicyForbids";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidRecipient";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ContractPaused";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidCurrency";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidQuoteToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TransfersDisabled";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidAmount";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "NoOptedInSupply";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ProtectedAddress";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Uninitialized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidTransferPolicyId";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "hasRole";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "getRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "grantRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "revokeRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "renounceRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "bytes32";
            readonly name: "adminRole";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "RoleMembershipUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "hasRole";
        }];
    }, {
        readonly name: "RoleAdminUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "bytes32";
            readonly name: "newAdminRole";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "TransferPolicyUpdate">;
}
/**
 * Changes the transfer policy ID for a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.changeTransferPolicySync(client, {
 *   token: '0x...',
 *   policyId: 1n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function changeTransferPolicySync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: changeTransferPolicySync.Parameters<chain, account>): Promise<changeTransferPolicySync.ReturnValue>;
export declare namespace changeTransferPolicySync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = changeTransferPolicy.Parameters<chain, account>;
    type Args = changeTransferPolicy.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.tip20, 'TransferPolicyUpdate', {
        IndexedOnly: false;
        Required: true;
    }> & {
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
}
/**
 * Creates a new TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.create(client, {
 *   name: 'My Token',
 *   symbol: 'MTK',
 *   currency: 'USD',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function create<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: create.Parameters<chain, account>): Promise<create.ReturnValue>;
export declare namespace create {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Omit<Args, 'admin'> & (account extends Account ? {
        admin?: Account | Address | undefined;
    } : {
        admin: Account | Address;
    });
    type Args = {
        /** Admin address. */
        admin: Address;
        /** Currency (e.g. "USD"). */
        currency: string;
        /** Token name. */
        name: string;
        /** Quote token. */
        quoteToken?: TokenId.TokenIdOrAddress | undefined;
        /** Unique salt. @default Hex.random(32) */
        salt?: Hex.Hex | undefined;
        /** Token symbol. */
        symbol: string;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: any): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `createToken` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.token.create.call({
     *       name: 'My Token',
     *       symbol: 'MTK',
     *       currency: 'USD',
     *       admin: '0xfeed...fede',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "createToken";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "string";
                readonly name: "name";
            }, {
                readonly type: "string";
                readonly name: "symbol";
            }, {
                readonly type: "string";
                readonly name: "currency";
            }, {
                readonly type: "address";
                readonly name: "quoteToken";
            }, {
                readonly type: "address";
                readonly name: "admin";
            }, {
                readonly type: "bytes32";
                readonly name: "salt";
            }];
            readonly outputs: readonly [{
                readonly type: "address";
            }];
        }];
        functionName: "createToken";
    } & {
        args: readonly [name: string, symbol: string, currency: string, quoteToken: `0x${string}`, admin: `0x${string}`, salt: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the `TokenCreated` event from logs.
     *
     * @param logs - The logs.
     * @returns The `TokenCreated` event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "createToken";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "string";
            readonly name: "name";
        }, {
            readonly type: "string";
            readonly name: "symbol";
        }, {
            readonly type: "string";
            readonly name: "currency";
        }, {
            readonly type: "address";
            readonly name: "quoteToken";
        }, {
            readonly type: "address";
            readonly name: "admin";
        }, {
            readonly type: "bytes32";
            readonly name: "salt";
        }];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "isTIP20";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "getTokenAddress";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "sender";
        }, {
            readonly type: "bytes32";
            readonly name: "salt";
        }];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "TokenCreated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
            readonly indexed: true;
        }, {
            readonly type: "string";
            readonly name: "name";
        }, {
            readonly type: "string";
            readonly name: "symbol";
        }, {
            readonly type: "string";
            readonly name: "currency";
        }, {
            readonly type: "address";
            readonly name: "quoteToken";
        }, {
            readonly type: "address";
            readonly name: "admin";
        }, {
            readonly type: "bytes32";
            readonly name: "salt";
        }];
    }, {
        readonly name: "AddressReserved";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "AddressNotReserved";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidQuoteToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TokenAlreadyExists";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }];
    }], "TokenCreated">;
}
/**
 * Creates a new TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.createSync(client, {
 *   name: 'My Token',
 *   symbol: 'MTK',
 *   currency: 'USD',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function createSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: createSync.Parameters<chain, account>): Promise<createSync.ReturnValue>;
export declare namespace createSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = create.Parameters<chain, account>;
    type Args = create.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.tip20Factory, 'TokenCreated', {
        IndexedOnly: false;
        Required: true;
    }> & {
        /** Token ID. */
        tokenId: TokenId.TokenId;
        /** Transaction receipt. */
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
}
/**
 * Gets TIP20 token allowance.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const allowance = await Actions.token.getAllowance(client, {
 *   spender: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The token allowance.
 */
export declare function getAllowance<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: getAllowance.Parameters<account>): Promise<getAllowance.ReturnValue>;
export declare namespace getAllowance {
    type Parameters<account extends Account | undefined = Account | undefined> = ReadParameters & GetAccountParameter<account> & Omit<Args, 'account'> & {};
    type Args = {
        /** Account address. */
        account: Address;
        /** Address of the spender. */
        spender: Address;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = ReadContractReturnType<typeof Abis.tip20, 'allowance', never>;
    /**
     * Defines a call to the `allowance` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "allowance";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "owner";
            }, {
                readonly type: "address";
                readonly name: "spender";
            }];
            readonly outputs: readonly [{
                readonly type: "uint256";
            }];
        }];
        functionName: "allowance";
    } & {
        args: readonly [owner: `0x${string}`, spender: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
/**
 * Gets TIP20 token balance for an address.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const balance = await Actions.token.getBalance(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The token balance.
 */
export declare function getBalance<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: getBalance.Parameters<account>): Promise<getBalance.ReturnValue>;
export declare namespace getBalance {
    type Parameters<account extends Account | undefined = Account | undefined> = ReadParameters & GetAccountParameter<account> & Omit<Args, 'account'>;
    type Args = {
        /** Account address. */
        account: Address;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = ReadContractReturnType<typeof Abis.tip20, 'balanceOf', never>;
    /**
     * Defines a call to the `balanceOf` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "balanceOf";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "account";
            }];
            readonly outputs: readonly [{
                readonly type: "uint256";
            }];
        }];
        functionName: "balanceOf";
    } & {
        args: readonly [account: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
/**
 * Gets TIP20 token metadata including name, symbol, currency, decimals, and total supply.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const metadata = await Actions.token.getMetadata(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The token metadata.
 */
export declare function getMetadata<chain extends Chain | undefined>(client: Client<Transport, chain>, parameters: getMetadata.Parameters): Promise<getMetadata.ReturnValue>;
export declare namespace getMetadata {
    type Parameters = {
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = Compute<{
        /**
         * Currency (e.g. "USD").
         */
        currency: string;
        /**
         * Decimals of the token.
         */
        decimals: number;
        /**
         * Quote token.
         *
         * Returns `undefined` for the default quote token (`0x20c...0000`).
         */
        quoteToken?: Address | undefined;
        /**
         * Name of the token.
         */
        name: string;
        /**
         * Whether the token is paused.
         *
         * Returns `undefined` for the default quote token (`0x20c...0000`).
         */
        paused?: boolean | undefined;
        /**
         * Supply cap.
         *
         * Returns `undefined` for the default quote token (`0x20c...0000`).
         */
        supplyCap?: bigint | undefined;
        /**
         * Symbol of the token.
         */
        symbol: string;
        /**
         * Total supply of the token.
         */
        totalSupply: bigint;
        /**
         * Transfer policy ID.
         * 0="always-reject", 1="always-allow", >2=custom policy
         *
         * Returns `undefined` for the default quote token (`0x20c...0000`).
         */
        transferPolicyId?: bigint | undefined;
    }>;
}
/**
 * Gets the admin role for a specific role in a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const adminRole = await Actions.token.getRoleAdmin(client, {
 *   role: 'issuer',
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The admin role hash.
 */
export declare function getRoleAdmin<chain extends Chain | undefined>(client: Client<Transport, chain>, parameters: getRoleAdmin.Parameters): Promise<getRoleAdmin.ReturnValue>;
export declare namespace getRoleAdmin {
    type Parameters = ReadParameters & Args;
    type Args = {
        /** Role to get admin for. */
        role: TokenRole.TokenRole;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = ReadContractReturnType<typeof Abis.tip20, 'getRoleAdmin', never>;
    /**
     * Defines a call to the `getRoleAdmin` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "getRoleAdmin";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [{
                readonly type: "bytes32";
                readonly name: "role";
            }];
            readonly outputs: readonly [{
                readonly type: "bytes32";
            }];
        }];
        functionName: "getRoleAdmin";
    } & {
        args: readonly [role: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
/**
 * Checks if an account has a specific role for a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const hasRole = await Actions.token.hasRole(client, {
 *   account: '0x...',
 *   role: 'issuer',
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns Whether the account has the role.
 */
export declare function hasRole<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: hasRole.Parameters<account>): Promise<hasRole.ReturnValue>;
export declare namespace hasRole {
    type Parameters<account extends Account | undefined = Account | undefined> = ReadParameters & Omit<Args, 'account'> & GetAccountParameter<account>;
    type Args = {
        /** Account address to check. */
        account: Address;
        /** Role to check. */
        role: TokenRole.TokenRole;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = ReadContractReturnType<typeof Abis.tip20, 'hasRole', never>;
    /**
     * Defines a call to the `hasRole` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "hasRole";
            readonly type: "function";
            readonly stateMutability: "view";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "account";
            }, {
                readonly type: "bytes32";
                readonly name: "role";
            }];
            readonly outputs: readonly [{
                readonly type: "bool";
            }];
        }];
        functionName: "hasRole";
    } & {
        args: readonly [account: `0x${string}`, role: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
}
/**
 * Grants a role for a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.grantRoles(client, {
 *   token: '0x...',
 *   to: '0x...',
 *   roles: ['issuer'],
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function grantRoles<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: grantRoles.Parameters<chain, account>): Promise<grantRoles.ReturnValue>;
export declare namespace grantRoles {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Omit<Args, 'role'> & {
        /** Role to grant. */
        roles: readonly TokenRole.TokenRole[];
    };
    type Args = {
        /** Role to grant. */
        role: TokenRole.TokenRole;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
        /** Address to grant the role to. */
        to: Address;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof sendTransaction | typeof sendTransactionSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: grantRoles.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `grantRole` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.token.grantRoles.call({
     *       token: '0x20c0...babe',
     *       to: '0x20c0...beef',
     *       role: 'issuer',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "grantRole";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "bytes32";
                readonly name: "role";
            }, {
                readonly type: "address";
                readonly name: "account";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "grantRole";
    } & {
        args: readonly [role: `0x${string}`, account: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the events from the logs.
     *
     * @param logs - Logs.
     * @returns The events.
     */
    function extractEvents(logs: Log[]): import("../../utils/abi/parseEventLogs.js").ParseEventLogsReturnType<readonly [{
        readonly name: "name";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "symbol";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "decimals";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint8";
        }];
    }, {
        readonly name: "totalSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "quoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "nextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "balanceOf";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transfer";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "approve";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "spender";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "allowance";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
        }, {
            readonly type: "address";
            readonly name: "spender";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transferFrom";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "mint";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "currency";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "supplyCap";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "paused";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "transferPolicyId";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "burnBlocked";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "mintWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burnWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferFromWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "changeTransferPolicyId";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "newPolicyId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setSupplyCap";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "newSupplyCap";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "pause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "unpause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "setNextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "newQuoteToken";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "completeQuoteTokenUpdate";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "PAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "UNPAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "ISSUER_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "BURN_BLOCKED_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "distributeReward";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRewardRecipient";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "recipient";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "claimRewards";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "optedInSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "globalRewardPerToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "userRewardInfo";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "rewardRecipient";
            }, {
                readonly type: "uint256";
                readonly name: "rewardPerToken";
            }, {
                readonly type: "uint256";
                readonly name: "rewardBalance";
            }];
        }];
    }, {
        readonly name: "getPendingRewards";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "Transfer";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Approval";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "spender";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Mint";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Burn";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "BurnBlocked";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "TransferWithMemo";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
            readonly indexed: true;
        }];
    }, {
        readonly name: "TransferPolicyUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint64";
            readonly name: "newPolicyId";
            readonly indexed: true;
        }];
    }, {
        readonly name: "SupplyCapUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "newSupplyCap";
            readonly indexed: true;
        }];
    }, {
        readonly name: "PauseStateUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "isPaused";
        }];
    }, {
        readonly name: "NextQuoteTokenSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "nextQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "QuoteTokenUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "newQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "RewardDistributed";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "funder";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "RewardRecipientSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "holder";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "recipient";
            readonly indexed: true;
        }];
    }, {
        readonly name: "InsufficientBalance";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "available";
        }, {
            readonly type: "uint256";
            readonly name: "required";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
    }, {
        readonly name: "InsufficientAllowance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "SupplyCapExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidSupplyCap";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidPayload";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "StringTooLong";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PolicyForbids";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidRecipient";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ContractPaused";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidCurrency";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidQuoteToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TransfersDisabled";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidAmount";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "NoOptedInSupply";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ProtectedAddress";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Uninitialized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidTransferPolicyId";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "hasRole";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "getRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "grantRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "revokeRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "renounceRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "bytes32";
            readonly name: "adminRole";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "RoleMembershipUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "hasRole";
        }];
    }, {
        readonly name: "RoleAdminUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "bytes32";
            readonly name: "newAdminRole";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "RoleMembershipUpdated", true, "RoleMembershipUpdated">;
}
/**
 * Grants a role for a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.grantRolesSync(client, {
 *   token: '0x...',
 *   to: '0x...',
 *   roles: ['issuer'],
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function grantRolesSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: grantRolesSync.Parameters<chain, account>): Promise<grantRolesSync.ReturnValue>;
export declare namespace grantRolesSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = grantRoles.Parameters<chain, account>;
    type Args = grantRoles.Args;
    type ReturnValue = {
        receipt: TransactionReceipt;
        value: readonly GetEventArgs<typeof Abis.tip20, 'RoleMembershipUpdated', {
            IndexedOnly: false;
            Required: true;
        }>[];
    };
    type ErrorType = BaseErrorType;
}
/**
 * Mints TIP20 tokens to an address.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.mint(client, {
 *   to: '0x...',
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function mint<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: mint.Parameters<chain, account>): Promise<mint.ReturnValue>;
export declare namespace mint {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Amount of tokens to mint. */
        amount: bigint;
        /** Memo to include in the mint. */
        memo?: Hex.Hex | undefined;
        /** Address to mint tokens to. */
        to: Address;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: any): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `mint` or `mintWithMemo` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.token.mint.call({
     *       to: '0x20c0...beef',
     *       amount: 100n,
     *       token: '0x20c0...babe',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "mint";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "to";
            }, {
                readonly type: "uint256";
                readonly name: "amount";
            }];
            readonly outputs: readonly [];
        } | {
            readonly name: "mintWithMemo";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "to";
            }, {
                readonly type: "uint256";
                readonly name: "amount";
            }, {
                readonly type: "bytes32";
                readonly name: "memo";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "mint" | "mintWithMemo";
    } & {
        args: readonly [to: `0x${string}`, amount: bigint] | readonly [to: `0x${string}`, amount: bigint, memo: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "name";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "symbol";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "decimals";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint8";
        }];
    }, {
        readonly name: "totalSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "quoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "nextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "balanceOf";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transfer";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "approve";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "spender";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "allowance";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
        }, {
            readonly type: "address";
            readonly name: "spender";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transferFrom";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "mint";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "currency";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "supplyCap";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "paused";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "transferPolicyId";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "burnBlocked";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "mintWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burnWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferFromWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "changeTransferPolicyId";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "newPolicyId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setSupplyCap";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "newSupplyCap";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "pause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "unpause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "setNextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "newQuoteToken";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "completeQuoteTokenUpdate";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "PAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "UNPAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "ISSUER_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "BURN_BLOCKED_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "distributeReward";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRewardRecipient";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "recipient";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "claimRewards";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "optedInSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "globalRewardPerToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "userRewardInfo";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "rewardRecipient";
            }, {
                readonly type: "uint256";
                readonly name: "rewardPerToken";
            }, {
                readonly type: "uint256";
                readonly name: "rewardBalance";
            }];
        }];
    }, {
        readonly name: "getPendingRewards";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "Transfer";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Approval";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "spender";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Mint";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Burn";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "BurnBlocked";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "TransferWithMemo";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
            readonly indexed: true;
        }];
    }, {
        readonly name: "TransferPolicyUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint64";
            readonly name: "newPolicyId";
            readonly indexed: true;
        }];
    }, {
        readonly name: "SupplyCapUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "newSupplyCap";
            readonly indexed: true;
        }];
    }, {
        readonly name: "PauseStateUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "isPaused";
        }];
    }, {
        readonly name: "NextQuoteTokenSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "nextQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "QuoteTokenUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "newQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "RewardDistributed";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "funder";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "RewardRecipientSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "holder";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "recipient";
            readonly indexed: true;
        }];
    }, {
        readonly name: "InsufficientBalance";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "available";
        }, {
            readonly type: "uint256";
            readonly name: "required";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
    }, {
        readonly name: "InsufficientAllowance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "SupplyCapExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidSupplyCap";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidPayload";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "StringTooLong";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PolicyForbids";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidRecipient";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ContractPaused";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidCurrency";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidQuoteToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TransfersDisabled";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidAmount";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "NoOptedInSupply";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ProtectedAddress";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Uninitialized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidTransferPolicyId";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "hasRole";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "getRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "grantRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "revokeRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "renounceRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "bytes32";
            readonly name: "adminRole";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "RoleMembershipUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "hasRole";
        }];
    }, {
        readonly name: "RoleAdminUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "bytes32";
            readonly name: "newAdminRole";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "Mint">;
}
/**
 * Mints TIP20 tokens to an address.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.mintSync(client, {
 *   to: '0x...',
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function mintSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: mintSync.Parameters<chain, account>): Promise<mintSync.ReturnValue>;
export declare namespace mintSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = mint.Parameters<chain, account>;
    type Args = mint.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.tip20, 'Mint', {
        IndexedOnly: false;
        Required: true;
    }> & {
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
}
/**
 * Pauses a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.pause(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function pause<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: pause.Parameters<chain, account>): Promise<pause.ReturnValue>;
export declare namespace pause {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: pause.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `pause` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.token.pause.call({
     *       token: '0x20c0...babe',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "pause";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [];
            readonly outputs: readonly [];
        }];
        functionName: "pause";
    } & {
        args?: readonly [] | undefined;
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "name";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "symbol";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "decimals";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint8";
        }];
    }, {
        readonly name: "totalSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "quoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "nextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "balanceOf";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transfer";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "approve";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "spender";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "allowance";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
        }, {
            readonly type: "address";
            readonly name: "spender";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transferFrom";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "mint";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "currency";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "supplyCap";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "paused";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "transferPolicyId";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "burnBlocked";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "mintWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burnWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferFromWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "changeTransferPolicyId";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "newPolicyId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setSupplyCap";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "newSupplyCap";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "pause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "unpause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "setNextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "newQuoteToken";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "completeQuoteTokenUpdate";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "PAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "UNPAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "ISSUER_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "BURN_BLOCKED_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "distributeReward";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRewardRecipient";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "recipient";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "claimRewards";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "optedInSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "globalRewardPerToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "userRewardInfo";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "rewardRecipient";
            }, {
                readonly type: "uint256";
                readonly name: "rewardPerToken";
            }, {
                readonly type: "uint256";
                readonly name: "rewardBalance";
            }];
        }];
    }, {
        readonly name: "getPendingRewards";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "Transfer";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Approval";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "spender";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Mint";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Burn";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "BurnBlocked";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "TransferWithMemo";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
            readonly indexed: true;
        }];
    }, {
        readonly name: "TransferPolicyUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint64";
            readonly name: "newPolicyId";
            readonly indexed: true;
        }];
    }, {
        readonly name: "SupplyCapUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "newSupplyCap";
            readonly indexed: true;
        }];
    }, {
        readonly name: "PauseStateUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "isPaused";
        }];
    }, {
        readonly name: "NextQuoteTokenSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "nextQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "QuoteTokenUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "newQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "RewardDistributed";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "funder";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "RewardRecipientSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "holder";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "recipient";
            readonly indexed: true;
        }];
    }, {
        readonly name: "InsufficientBalance";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "available";
        }, {
            readonly type: "uint256";
            readonly name: "required";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
    }, {
        readonly name: "InsufficientAllowance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "SupplyCapExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidSupplyCap";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidPayload";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "StringTooLong";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PolicyForbids";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidRecipient";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ContractPaused";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidCurrency";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidQuoteToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TransfersDisabled";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidAmount";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "NoOptedInSupply";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ProtectedAddress";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Uninitialized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidTransferPolicyId";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "hasRole";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "getRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "grantRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "revokeRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "renounceRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "bytes32";
            readonly name: "adminRole";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "RoleMembershipUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "hasRole";
        }];
    }, {
        readonly name: "RoleAdminUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "bytes32";
            readonly name: "newAdminRole";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "PauseStateUpdate">;
}
/**
 * Pauses a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.pauseSync(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function pauseSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: pauseSync.Parameters<chain, account>): Promise<pauseSync.ReturnValue>;
export declare namespace pauseSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = pause.Parameters<chain, account>;
    type Args = pause.Args;
    type ReturnValue = GetEventArgs<typeof Abis.tip20, 'PauseStateUpdate', {
        IndexedOnly: false;
        Required: true;
    }> & {
        receipt: TransactionReceipt;
    };
    type ErrorType = BaseErrorType;
}
/**
 * Renounces a role for a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.renounceRoles(client, {
 *   token: '0x...',
 *   roles: ['issuer'],
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function renounceRoles<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: renounceRoles.Parameters<chain, account>): Promise<renounceRoles.ReturnValue>;
export declare namespace renounceRoles {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Omit<Args, 'role'> & {
        /** Roles to renounce. */
        roles: readonly TokenRole.TokenRole[];
    };
    type Args = {
        /** Role to renounce. */
        role: TokenRole.TokenRole;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof sendTransaction | typeof sendTransactionSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: renounceRoles.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `renounceRole` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.token.renounceRoles.call({
     *       token: '0x20c0...babe',
     *       role: 'issuer',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "renounceRole";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "bytes32";
                readonly name: "role";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "renounceRole";
    } & {
        args: readonly [role: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the events from the logs.
     *
     * @param logs - Logs.
     * @returns The events.
     */
    function extractEvents(logs: Log[]): import("../../utils/abi/parseEventLogs.js").ParseEventLogsReturnType<readonly [{
        readonly name: "name";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "symbol";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "decimals";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint8";
        }];
    }, {
        readonly name: "totalSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "quoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "nextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "balanceOf";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transfer";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "approve";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "spender";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "allowance";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
        }, {
            readonly type: "address";
            readonly name: "spender";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transferFrom";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "mint";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "currency";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "supplyCap";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "paused";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "transferPolicyId";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "burnBlocked";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "mintWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burnWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferFromWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "changeTransferPolicyId";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "newPolicyId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setSupplyCap";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "newSupplyCap";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "pause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "unpause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "setNextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "newQuoteToken";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "completeQuoteTokenUpdate";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "PAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "UNPAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "ISSUER_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "BURN_BLOCKED_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "distributeReward";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRewardRecipient";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "recipient";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "claimRewards";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "optedInSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "globalRewardPerToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "userRewardInfo";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "rewardRecipient";
            }, {
                readonly type: "uint256";
                readonly name: "rewardPerToken";
            }, {
                readonly type: "uint256";
                readonly name: "rewardBalance";
            }];
        }];
    }, {
        readonly name: "getPendingRewards";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "Transfer";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Approval";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "spender";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Mint";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Burn";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "BurnBlocked";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "TransferWithMemo";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
            readonly indexed: true;
        }];
    }, {
        readonly name: "TransferPolicyUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint64";
            readonly name: "newPolicyId";
            readonly indexed: true;
        }];
    }, {
        readonly name: "SupplyCapUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "newSupplyCap";
            readonly indexed: true;
        }];
    }, {
        readonly name: "PauseStateUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "isPaused";
        }];
    }, {
        readonly name: "NextQuoteTokenSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "nextQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "QuoteTokenUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "newQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "RewardDistributed";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "funder";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "RewardRecipientSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "holder";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "recipient";
            readonly indexed: true;
        }];
    }, {
        readonly name: "InsufficientBalance";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "available";
        }, {
            readonly type: "uint256";
            readonly name: "required";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
    }, {
        readonly name: "InsufficientAllowance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "SupplyCapExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidSupplyCap";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidPayload";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "StringTooLong";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PolicyForbids";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidRecipient";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ContractPaused";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidCurrency";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidQuoteToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TransfersDisabled";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidAmount";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "NoOptedInSupply";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ProtectedAddress";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Uninitialized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidTransferPolicyId";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "hasRole";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "getRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "grantRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "revokeRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "renounceRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "bytes32";
            readonly name: "adminRole";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "RoleMembershipUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "hasRole";
        }];
    }, {
        readonly name: "RoleAdminUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "bytes32";
            readonly name: "newAdminRole";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "RoleMembershipUpdated", true, "RoleMembershipUpdated">;
}
/**
 * Renounces a role for a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.renounceRolesSync(client, {
 *   token: '0x...',
 *   roles: ['issuer'],
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function renounceRolesSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: renounceRolesSync.Parameters<chain, account>): Promise<renounceRolesSync.ReturnValue>;
export declare namespace renounceRolesSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = renounceRoles.Parameters<chain, account>;
    type Args = renounceRoles.Args;
    type ReturnValue = {
        receipt: TransactionReceipt;
        value: readonly GetEventArgs<typeof Abis.tip20, 'RoleMembershipUpdated', {
            IndexedOnly: false;
            Required: true;
        }>[];
    };
    type ErrorType = BaseErrorType;
}
/**
 * Revokes a role for a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.revokeRoles(client, {
 *   token: '0x...',
 *   from: '0x...',
 *   roles: ['issuer'],
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function revokeRoles<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: revokeRoles.Parameters<chain, account>): Promise<revokeRoles.ReturnValue>;
export declare namespace revokeRoles {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = SendTransactionSyncParameters<chain, account> & Omit<Args, 'role'> & {
        /** Role to revoke. */
        roles: readonly TokenRole.TokenRole[];
    };
    type Args = {
        /** Address to revoke the role from. */
        from: Address;
        /** Role to revoke. */
        role: TokenRole.TokenRole;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof sendTransaction | typeof sendTransactionSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: revokeRoles.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `revokeRole` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.token.revokeRoles.call({
     *       token: '0x20c0...babe',
     *       from: '0x20c0...beef',
     *       role: 'issuer',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "revokeRole";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "bytes32";
                readonly name: "role";
            }, {
                readonly type: "address";
                readonly name: "account";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "revokeRole";
    } & {
        args: readonly [role: `0x${string}`, account: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the events from the logs.
     *
     * @param logs - Logs.
     * @returns The events.
     */
    function extractEvents(logs: Log[]): import("../../utils/abi/parseEventLogs.js").ParseEventLogsReturnType<readonly [{
        readonly name: "name";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "symbol";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "decimals";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint8";
        }];
    }, {
        readonly name: "totalSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "quoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "nextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "balanceOf";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transfer";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "approve";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "spender";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "allowance";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
        }, {
            readonly type: "address";
            readonly name: "spender";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transferFrom";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "mint";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "currency";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "supplyCap";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "paused";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "transferPolicyId";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "burnBlocked";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "mintWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burnWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferFromWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "changeTransferPolicyId";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "newPolicyId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setSupplyCap";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "newSupplyCap";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "pause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "unpause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "setNextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "newQuoteToken";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "completeQuoteTokenUpdate";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "PAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "UNPAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "ISSUER_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "BURN_BLOCKED_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "distributeReward";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRewardRecipient";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "recipient";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "claimRewards";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "optedInSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "globalRewardPerToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "userRewardInfo";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "rewardRecipient";
            }, {
                readonly type: "uint256";
                readonly name: "rewardPerToken";
            }, {
                readonly type: "uint256";
                readonly name: "rewardBalance";
            }];
        }];
    }, {
        readonly name: "getPendingRewards";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "Transfer";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Approval";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "spender";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Mint";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Burn";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "BurnBlocked";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "TransferWithMemo";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
            readonly indexed: true;
        }];
    }, {
        readonly name: "TransferPolicyUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint64";
            readonly name: "newPolicyId";
            readonly indexed: true;
        }];
    }, {
        readonly name: "SupplyCapUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "newSupplyCap";
            readonly indexed: true;
        }];
    }, {
        readonly name: "PauseStateUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "isPaused";
        }];
    }, {
        readonly name: "NextQuoteTokenSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "nextQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "QuoteTokenUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "newQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "RewardDistributed";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "funder";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "RewardRecipientSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "holder";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "recipient";
            readonly indexed: true;
        }];
    }, {
        readonly name: "InsufficientBalance";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "available";
        }, {
            readonly type: "uint256";
            readonly name: "required";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
    }, {
        readonly name: "InsufficientAllowance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "SupplyCapExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidSupplyCap";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidPayload";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "StringTooLong";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PolicyForbids";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidRecipient";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ContractPaused";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidCurrency";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidQuoteToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TransfersDisabled";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidAmount";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "NoOptedInSupply";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ProtectedAddress";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Uninitialized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidTransferPolicyId";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "hasRole";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "getRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "grantRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "revokeRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "renounceRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "bytes32";
            readonly name: "adminRole";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "RoleMembershipUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "hasRole";
        }];
    }, {
        readonly name: "RoleAdminUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "bytes32";
            readonly name: "newAdminRole";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "RoleMembershipUpdated", true, "RoleMembershipUpdated">;
}
/**
 * Revokes a role for a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.revokeRolesSync(client, {
 *   token: '0x...',
 *   from: '0x...',
 *   roles: ['issuer'],
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function revokeRolesSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: revokeRolesSync.Parameters<chain, account>): Promise<revokeRolesSync.ReturnValue>;
export declare namespace revokeRolesSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = revokeRoles.Parameters<chain, account>;
    type Args = revokeRoles.Args;
    type ReturnValue = {
        receipt: TransactionReceipt;
        value: readonly GetEventArgs<typeof Abis.tip20, 'RoleMembershipUpdated', {
            IndexedOnly: false;
            Required: true;
        }>[];
    };
    type ErrorType = BaseErrorType;
}
/**
 * Sets the supply cap for a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.setSupplyCap(client, {
 *   token: '0x...',
 *   supplyCap: 1000000n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function setSupplyCap<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: setSupplyCap.Parameters<chain, account>): Promise<setSupplyCap.ReturnValue>;
export declare namespace setSupplyCap {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** New supply cap. */
        supplyCap: bigint;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: setSupplyCap.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `setSupplyCap` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.token.setSupplyCap.call({
     *       token: '0x20c0...babe',
     *       supplyCap: 1000000n,
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "setSupplyCap";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "uint256";
                readonly name: "newSupplyCap";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "setSupplyCap";
    } & {
        args: readonly [bigint];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "name";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "symbol";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "decimals";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint8";
        }];
    }, {
        readonly name: "totalSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "quoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "nextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "balanceOf";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transfer";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "approve";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "spender";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "allowance";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
        }, {
            readonly type: "address";
            readonly name: "spender";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transferFrom";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "mint";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "currency";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "supplyCap";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "paused";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "transferPolicyId";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "burnBlocked";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "mintWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burnWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferFromWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "changeTransferPolicyId";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "newPolicyId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setSupplyCap";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "newSupplyCap";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "pause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "unpause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "setNextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "newQuoteToken";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "completeQuoteTokenUpdate";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "PAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "UNPAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "ISSUER_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "BURN_BLOCKED_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "distributeReward";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRewardRecipient";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "recipient";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "claimRewards";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "optedInSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "globalRewardPerToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "userRewardInfo";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "rewardRecipient";
            }, {
                readonly type: "uint256";
                readonly name: "rewardPerToken";
            }, {
                readonly type: "uint256";
                readonly name: "rewardBalance";
            }];
        }];
    }, {
        readonly name: "getPendingRewards";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "Transfer";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Approval";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "spender";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Mint";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Burn";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "BurnBlocked";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "TransferWithMemo";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
            readonly indexed: true;
        }];
    }, {
        readonly name: "TransferPolicyUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint64";
            readonly name: "newPolicyId";
            readonly indexed: true;
        }];
    }, {
        readonly name: "SupplyCapUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "newSupplyCap";
            readonly indexed: true;
        }];
    }, {
        readonly name: "PauseStateUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "isPaused";
        }];
    }, {
        readonly name: "NextQuoteTokenSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "nextQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "QuoteTokenUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "newQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "RewardDistributed";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "funder";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "RewardRecipientSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "holder";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "recipient";
            readonly indexed: true;
        }];
    }, {
        readonly name: "InsufficientBalance";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "available";
        }, {
            readonly type: "uint256";
            readonly name: "required";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
    }, {
        readonly name: "InsufficientAllowance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "SupplyCapExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidSupplyCap";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidPayload";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "StringTooLong";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PolicyForbids";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidRecipient";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ContractPaused";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidCurrency";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidQuoteToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TransfersDisabled";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidAmount";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "NoOptedInSupply";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ProtectedAddress";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Uninitialized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidTransferPolicyId";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "hasRole";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "getRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "grantRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "revokeRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "renounceRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "bytes32";
            readonly name: "adminRole";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "RoleMembershipUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "hasRole";
        }];
    }, {
        readonly name: "RoleAdminUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "bytes32";
            readonly name: "newAdminRole";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "SupplyCapUpdate">;
}
/**
 * Sets the supply cap for a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.setSupplyCapSync(client, {
 *   token: '0x...',
 *   supplyCap: 1000000n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function setSupplyCapSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: setSupplyCapSync.Parameters<chain, account>): Promise<setSupplyCapSync.ReturnValue>;
export declare namespace setSupplyCapSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = setSupplyCap.Parameters<chain, account>;
    type Args = setSupplyCap.Args;
    type ReturnValue = GetEventArgs<typeof Abis.tip20, 'SupplyCapUpdate', {
        IndexedOnly: false;
        Required: true;
    }> & {
        receipt: TransactionReceipt;
    };
    type ErrorType = BaseErrorType;
}
/**
 * Sets the admin role for a specific role in a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.setRoleAdmin(client, {
 *   token: '0x...',
 *   role: 'issuer',
 *   adminRole: 'admin',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function setRoleAdmin<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: setRoleAdmin.Parameters<chain, account>): Promise<setRoleAdmin.ReturnValue>;
export declare namespace setRoleAdmin {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** New admin role. */
        adminRole: TokenRole.TokenRole;
        /** Role to set admin for. */
        role: TokenRole.TokenRole;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: setRoleAdmin.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `setRoleAdmin` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.token.setRoleAdmin.call({
     *       token: '0x20c0...babe',
     *       role: 'issuer',
     *       adminRole: 'admin',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "setRoleAdmin";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "bytes32";
                readonly name: "role";
            }, {
                readonly type: "bytes32";
                readonly name: "adminRole";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "setRoleAdmin";
    } & {
        args: readonly [role: `0x${string}`, `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "name";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "symbol";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "decimals";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint8";
        }];
    }, {
        readonly name: "totalSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "quoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "nextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "balanceOf";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transfer";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "approve";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "spender";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "allowance";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
        }, {
            readonly type: "address";
            readonly name: "spender";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transferFrom";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "mint";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "currency";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "supplyCap";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "paused";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "transferPolicyId";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "burnBlocked";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "mintWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burnWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferFromWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "changeTransferPolicyId";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "newPolicyId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setSupplyCap";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "newSupplyCap";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "pause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "unpause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "setNextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "newQuoteToken";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "completeQuoteTokenUpdate";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "PAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "UNPAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "ISSUER_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "BURN_BLOCKED_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "distributeReward";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRewardRecipient";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "recipient";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "claimRewards";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "optedInSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "globalRewardPerToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "userRewardInfo";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "rewardRecipient";
            }, {
                readonly type: "uint256";
                readonly name: "rewardPerToken";
            }, {
                readonly type: "uint256";
                readonly name: "rewardBalance";
            }];
        }];
    }, {
        readonly name: "getPendingRewards";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "Transfer";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Approval";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "spender";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Mint";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Burn";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "BurnBlocked";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "TransferWithMemo";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
            readonly indexed: true;
        }];
    }, {
        readonly name: "TransferPolicyUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint64";
            readonly name: "newPolicyId";
            readonly indexed: true;
        }];
    }, {
        readonly name: "SupplyCapUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "newSupplyCap";
            readonly indexed: true;
        }];
    }, {
        readonly name: "PauseStateUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "isPaused";
        }];
    }, {
        readonly name: "NextQuoteTokenSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "nextQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "QuoteTokenUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "newQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "RewardDistributed";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "funder";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "RewardRecipientSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "holder";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "recipient";
            readonly indexed: true;
        }];
    }, {
        readonly name: "InsufficientBalance";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "available";
        }, {
            readonly type: "uint256";
            readonly name: "required";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
    }, {
        readonly name: "InsufficientAllowance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "SupplyCapExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidSupplyCap";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidPayload";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "StringTooLong";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PolicyForbids";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidRecipient";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ContractPaused";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidCurrency";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidQuoteToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TransfersDisabled";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidAmount";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "NoOptedInSupply";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ProtectedAddress";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Uninitialized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidTransferPolicyId";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "hasRole";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "getRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "grantRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "revokeRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "renounceRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "bytes32";
            readonly name: "adminRole";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "RoleMembershipUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "hasRole";
        }];
    }, {
        readonly name: "RoleAdminUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "bytes32";
            readonly name: "newAdminRole";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "RoleAdminUpdated">;
}
/**
 * Sets the admin role for a specific role in a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.setRoleAdminSync(client, {
 *   token: '0x...',
 *   role: 'issuer',
 *   adminRole: 'admin',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function setRoleAdminSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: setRoleAdminSync.Parameters<chain, account>): Promise<setRoleAdminSync.ReturnValue>;
export declare namespace setRoleAdminSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = setRoleAdmin.Parameters<chain, account>;
    type Args = setRoleAdmin.Args;
    type ReturnValue = GetEventArgs<typeof Abis.tip20, 'RoleAdminUpdated', {
        IndexedOnly: false;
        Required: true;
    }> & {
        receipt: TransactionReceipt;
    };
    type ErrorType = BaseErrorType;
}
/**
 * Transfers TIP20 tokens to another address.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.transfer(client, {
 *   to: '0x...',
 *   amount: 100n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function transfer<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: transfer.Parameters<chain, account>): Promise<transfer.ReturnValue>;
export declare namespace transfer {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Amount of tokens to transfer. */
        amount: bigint;
        /** Address to transfer tokens from. */
        from?: Address | undefined;
        /** Memo to include in the transfer. */
        memo?: Hex.Hex | undefined;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
        /** Address to transfer tokens to. */
        to: Address;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: transfer.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `transfer`, `transferFrom`, `transferWithMemo`, or `transferFromWithMemo` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.token.transfer.call({
     *       to: '0x20c0...beef',
     *       amount: 100n,
     *       token: '0x20c0...babe',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "transfer";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "to";
            }, {
                readonly type: "uint256";
                readonly name: "amount";
            }];
            readonly outputs: readonly [{
                readonly type: "bool";
            }];
        } | {
            readonly name: "transferFrom";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "from";
            }, {
                readonly type: "address";
                readonly name: "to";
            }, {
                readonly type: "uint256";
                readonly name: "amount";
            }];
            readonly outputs: readonly [{
                readonly type: "bool";
            }];
        } | {
            readonly name: "transferWithMemo";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "to";
            }, {
                readonly type: "uint256";
                readonly name: "amount";
            }, {
                readonly type: "bytes32";
                readonly name: "memo";
            }];
            readonly outputs: readonly [];
        } | {
            readonly name: "transferFromWithMemo";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "from";
            }, {
                readonly type: "address";
                readonly name: "to";
            }, {
                readonly type: "uint256";
                readonly name: "amount";
            }, {
                readonly type: "bytes32";
                readonly name: "memo";
            }];
            readonly outputs: readonly [{
                readonly type: "bool";
            }];
        }];
        functionName: "transfer" | "transferFrom" | "transferWithMemo" | "transferFromWithMemo";
    } & {
        args: readonly [to: `0x${string}`, amount: bigint] | readonly [to: `0x${string}`, amount: bigint, memo: `0x${string}`] | readonly [from: `0x${string}`, to: `0x${string}`, amount: bigint] | readonly [from: `0x${string}`, to: `0x${string}`, amount: bigint, memo: `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "name";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "symbol";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "decimals";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint8";
        }];
    }, {
        readonly name: "totalSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "quoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "nextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "balanceOf";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transfer";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "approve";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "spender";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "allowance";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
        }, {
            readonly type: "address";
            readonly name: "spender";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transferFrom";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "mint";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "currency";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "supplyCap";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "paused";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "transferPolicyId";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "burnBlocked";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "mintWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burnWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferFromWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "changeTransferPolicyId";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "newPolicyId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setSupplyCap";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "newSupplyCap";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "pause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "unpause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "setNextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "newQuoteToken";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "completeQuoteTokenUpdate";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "PAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "UNPAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "ISSUER_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "BURN_BLOCKED_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "distributeReward";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRewardRecipient";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "recipient";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "claimRewards";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "optedInSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "globalRewardPerToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "userRewardInfo";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "rewardRecipient";
            }, {
                readonly type: "uint256";
                readonly name: "rewardPerToken";
            }, {
                readonly type: "uint256";
                readonly name: "rewardBalance";
            }];
        }];
    }, {
        readonly name: "getPendingRewards";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "Transfer";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Approval";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "spender";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Mint";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Burn";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "BurnBlocked";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "TransferWithMemo";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
            readonly indexed: true;
        }];
    }, {
        readonly name: "TransferPolicyUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint64";
            readonly name: "newPolicyId";
            readonly indexed: true;
        }];
    }, {
        readonly name: "SupplyCapUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "newSupplyCap";
            readonly indexed: true;
        }];
    }, {
        readonly name: "PauseStateUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "isPaused";
        }];
    }, {
        readonly name: "NextQuoteTokenSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "nextQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "QuoteTokenUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "newQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "RewardDistributed";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "funder";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "RewardRecipientSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "holder";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "recipient";
            readonly indexed: true;
        }];
    }, {
        readonly name: "InsufficientBalance";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "available";
        }, {
            readonly type: "uint256";
            readonly name: "required";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
    }, {
        readonly name: "InsufficientAllowance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "SupplyCapExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidSupplyCap";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidPayload";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "StringTooLong";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PolicyForbids";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidRecipient";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ContractPaused";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidCurrency";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidQuoteToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TransfersDisabled";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidAmount";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "NoOptedInSupply";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ProtectedAddress";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Uninitialized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidTransferPolicyId";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "hasRole";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "getRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "grantRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "revokeRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "renounceRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "bytes32";
            readonly name: "adminRole";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "RoleMembershipUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "hasRole";
        }];
    }, {
        readonly name: "RoleAdminUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "bytes32";
            readonly name: "newAdminRole";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "Transfer">;
}
/**
 * Transfers TIP20 tokens to another address.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.transferSync(client, {
 *   to: '0x...',
 *   amount: 100n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function transferSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: transferSync.Parameters<chain, account>): Promise<transferSync.ReturnValue>;
export declare namespace transferSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = transfer.Parameters<chain, account>;
    type Args = transfer.Args;
    type ReturnValue = GetEventArgs<typeof Abis.tip20, 'Transfer', {
        IndexedOnly: false;
        Required: true;
    }> & {
        receipt: TransactionReceipt;
    };
    type ErrorType = BaseErrorType;
}
/**
 * Unpauses a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.unpause(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function unpause<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: unpause.Parameters<chain, account>): Promise<unpause.ReturnValue>;
export declare namespace unpause {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: unpause.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `unpause` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.token.unpause.call({
     *       token: '0x20c0...babe',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "unpause";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [];
            readonly outputs: readonly [];
        }];
        functionName: "unpause";
    } & {
        args?: readonly [] | undefined;
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "name";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "symbol";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "decimals";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint8";
        }];
    }, {
        readonly name: "totalSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "quoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "nextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "balanceOf";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transfer";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "approve";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "spender";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "allowance";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
        }, {
            readonly type: "address";
            readonly name: "spender";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transferFrom";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "mint";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "currency";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "supplyCap";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "paused";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "transferPolicyId";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "burnBlocked";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "mintWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burnWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferFromWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "changeTransferPolicyId";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "newPolicyId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setSupplyCap";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "newSupplyCap";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "pause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "unpause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "setNextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "newQuoteToken";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "completeQuoteTokenUpdate";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "PAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "UNPAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "ISSUER_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "BURN_BLOCKED_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "distributeReward";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRewardRecipient";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "recipient";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "claimRewards";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "optedInSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "globalRewardPerToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "userRewardInfo";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "rewardRecipient";
            }, {
                readonly type: "uint256";
                readonly name: "rewardPerToken";
            }, {
                readonly type: "uint256";
                readonly name: "rewardBalance";
            }];
        }];
    }, {
        readonly name: "getPendingRewards";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "Transfer";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Approval";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "spender";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Mint";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Burn";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "BurnBlocked";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "TransferWithMemo";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
            readonly indexed: true;
        }];
    }, {
        readonly name: "TransferPolicyUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint64";
            readonly name: "newPolicyId";
            readonly indexed: true;
        }];
    }, {
        readonly name: "SupplyCapUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "newSupplyCap";
            readonly indexed: true;
        }];
    }, {
        readonly name: "PauseStateUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "isPaused";
        }];
    }, {
        readonly name: "NextQuoteTokenSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "nextQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "QuoteTokenUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "newQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "RewardDistributed";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "funder";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "RewardRecipientSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "holder";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "recipient";
            readonly indexed: true;
        }];
    }, {
        readonly name: "InsufficientBalance";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "available";
        }, {
            readonly type: "uint256";
            readonly name: "required";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
    }, {
        readonly name: "InsufficientAllowance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "SupplyCapExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidSupplyCap";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidPayload";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "StringTooLong";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PolicyForbids";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidRecipient";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ContractPaused";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidCurrency";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidQuoteToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TransfersDisabled";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidAmount";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "NoOptedInSupply";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ProtectedAddress";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Uninitialized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidTransferPolicyId";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "hasRole";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "getRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "grantRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "revokeRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "renounceRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "bytes32";
            readonly name: "adminRole";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "RoleMembershipUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "hasRole";
        }];
    }, {
        readonly name: "RoleAdminUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "bytes32";
            readonly name: "newAdminRole";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "PauseStateUpdate">;
}
/**
 * Unpauses a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.unpauseSync(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function unpauseSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: unpauseSync.Parameters<chain, account>): Promise<unpauseSync.ReturnValue>;
export declare namespace unpauseSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = unpause.Parameters<chain, account>;
    type Args = unpause.Args;
    type ReturnValue = GetEventArgs<typeof Abis.tip20, 'PauseStateUpdate', {
        IndexedOnly: false;
        Required: true;
    }> & {
        receipt: TransactionReceipt;
    };
    type ErrorType = BaseErrorType;
}
/**
 * Updates the quote token for a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.prepareUpdateQuoteToken(client, {
 *   token: '0x...',
 *   quoteToken: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function prepareUpdateQuoteToken<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: prepareUpdateQuoteToken.Parameters<chain, account>): Promise<prepareUpdateQuoteToken.ReturnValue>;
export declare namespace prepareUpdateQuoteToken {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** New quote token address. */
        quoteToken: TokenId.TokenIdOrAddress;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: prepareUpdateQuoteToken.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `prepareUpdateQuoteToken` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.token.prepareUpdateQuoteToken.call({
     *       token: '0x20c0...babe',
     *       quoteToken: '0x20c0...cafe',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "setNextQuoteToken";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [{
                readonly type: "address";
                readonly name: "newQuoteToken";
            }];
            readonly outputs: readonly [];
        }];
        functionName: "setNextQuoteToken";
    } & {
        args: readonly [`0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "name";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "symbol";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "decimals";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint8";
        }];
    }, {
        readonly name: "totalSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "quoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "nextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "balanceOf";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transfer";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "approve";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "spender";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "allowance";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
        }, {
            readonly type: "address";
            readonly name: "spender";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transferFrom";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "mint";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "currency";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "supplyCap";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "paused";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "transferPolicyId";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "burnBlocked";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "mintWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burnWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferFromWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "changeTransferPolicyId";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "newPolicyId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setSupplyCap";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "newSupplyCap";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "pause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "unpause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "setNextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "newQuoteToken";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "completeQuoteTokenUpdate";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "PAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "UNPAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "ISSUER_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "BURN_BLOCKED_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "distributeReward";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRewardRecipient";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "recipient";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "claimRewards";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "optedInSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "globalRewardPerToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "userRewardInfo";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "rewardRecipient";
            }, {
                readonly type: "uint256";
                readonly name: "rewardPerToken";
            }, {
                readonly type: "uint256";
                readonly name: "rewardBalance";
            }];
        }];
    }, {
        readonly name: "getPendingRewards";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "Transfer";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Approval";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "spender";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Mint";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Burn";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "BurnBlocked";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "TransferWithMemo";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
            readonly indexed: true;
        }];
    }, {
        readonly name: "TransferPolicyUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint64";
            readonly name: "newPolicyId";
            readonly indexed: true;
        }];
    }, {
        readonly name: "SupplyCapUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "newSupplyCap";
            readonly indexed: true;
        }];
    }, {
        readonly name: "PauseStateUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "isPaused";
        }];
    }, {
        readonly name: "NextQuoteTokenSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "nextQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "QuoteTokenUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "newQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "RewardDistributed";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "funder";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "RewardRecipientSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "holder";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "recipient";
            readonly indexed: true;
        }];
    }, {
        readonly name: "InsufficientBalance";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "available";
        }, {
            readonly type: "uint256";
            readonly name: "required";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
    }, {
        readonly name: "InsufficientAllowance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "SupplyCapExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidSupplyCap";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidPayload";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "StringTooLong";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PolicyForbids";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidRecipient";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ContractPaused";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidCurrency";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidQuoteToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TransfersDisabled";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidAmount";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "NoOptedInSupply";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ProtectedAddress";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Uninitialized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidTransferPolicyId";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "hasRole";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "getRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "grantRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "revokeRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "renounceRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "bytes32";
            readonly name: "adminRole";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "RoleMembershipUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "hasRole";
        }];
    }, {
        readonly name: "RoleAdminUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "bytes32";
            readonly name: "newAdminRole";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "NextQuoteTokenSet">;
}
/**
 * Updates the quote token for a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.prepareUpdateQuoteTokenSync(client, {
 *   token: '0x...',
 *   quoteToken: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function prepareUpdateQuoteTokenSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: prepareUpdateQuoteTokenSync.Parameters<chain, account>): Promise<prepareUpdateQuoteTokenSync.ReturnValue>;
export declare namespace prepareUpdateQuoteTokenSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = prepareUpdateQuoteToken.Parameters<chain, account>;
    type Args = prepareUpdateQuoteToken.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.tip20, 'NextQuoteTokenSet', {
        IndexedOnly: false;
        Required: true;
    }> & {
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
}
/**
 * Updates the quote token for a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.updateQuoteToken(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function updateQuoteToken<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: updateQuoteToken.Parameters<chain, account>): Promise<updateQuoteToken.ReturnValue>;
export declare namespace updateQuoteToken {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = WriteParameters<chain, account> & Args;
    type Args = {
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = WriteContractReturnType;
    type ErrorType = BaseErrorType;
    /** @internal */
    function inner<action extends typeof writeContract | typeof writeContractSync, chain extends Chain | undefined, account extends Account | undefined>(action: action, client: Client<Transport, chain, account>, parameters: updateQuoteToken.Parameters<chain, account>): Promise<ReturnType<action>>;
    /**
     * Defines a call to the `updateQuoteToken` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'viem/chains'
     * import { Actions } from 'viem/tempo'
     *
     * const client = createClient({
     *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.token.updateQuoteToken.call({
     *       token: '0x20c0...babe',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly name: "completeQuoteTokenUpdate";
            readonly type: "function";
            readonly stateMutability: "nonpayable";
            readonly inputs: readonly [];
            readonly outputs: readonly [];
        }];
        functionName: "completeQuoteTokenUpdate";
    } & {
        args?: readonly [] | undefined;
    } & {
        address: Address;
    } & {
        data: import("../../index.js").Hex;
        to: Address;
    };
    /**
     * Extracts the event from the logs.
     *
     * @param logs - Logs.
     * @returns The event.
     */
    function extractEvent(logs: Log[]): Log<bigint, number, false, undefined, true, readonly [{
        readonly name: "name";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "symbol";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "decimals";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint8";
        }];
    }, {
        readonly name: "totalSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "quoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "nextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "address";
        }];
    }, {
        readonly name: "balanceOf";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transfer";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "approve";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "spender";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "allowance";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
        }, {
            readonly type: "address";
            readonly name: "spender";
        }];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "transferFrom";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "mint";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burn";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "currency";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "string";
        }];
    }, {
        readonly name: "supplyCap";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "paused";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "transferPolicyId";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint64";
        }];
    }, {
        readonly name: "burnBlocked";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "mintWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "burnWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "transferFromWithMemo";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "changeTransferPolicyId";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint64";
            readonly name: "newPolicyId";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setSupplyCap";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "newSupplyCap";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "pause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "unpause";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "setNextQuoteToken";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "newQuoteToken";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "completeQuoteTokenUpdate";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
    }, {
        readonly name: "PAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "UNPAUSE_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "ISSUER_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "BURN_BLOCKED_ROLE";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "distributeReward";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRewardRecipient";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "recipient";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "claimRewards";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "optedInSupply";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "globalRewardPerToken";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly type: "uint256";
        }];
    }, {
        readonly name: "userRewardInfo";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "rewardRecipient";
            }, {
                readonly type: "uint256";
                readonly name: "rewardPerToken";
            }, {
                readonly type: "uint256";
                readonly name: "rewardBalance";
            }];
        }];
    }, {
        readonly name: "getPendingRewards";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [{
            readonly type: "uint128";
        }];
    }, {
        readonly name: "Transfer";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Approval";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "owner";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "spender";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Mint";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "Burn";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "BurnBlocked";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "TransferWithMemo";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }, {
            readonly type: "bytes32";
            readonly name: "memo";
            readonly indexed: true;
        }];
    }, {
        readonly name: "TransferPolicyUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint64";
            readonly name: "newPolicyId";
            readonly indexed: true;
        }];
    }, {
        readonly name: "SupplyCapUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "newSupplyCap";
            readonly indexed: true;
        }];
    }, {
        readonly name: "PauseStateUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "isPaused";
        }];
    }, {
        readonly name: "NextQuoteTokenSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "nextQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "QuoteTokenUpdate";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "updater";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "newQuoteToken";
            readonly indexed: true;
        }];
    }, {
        readonly name: "RewardDistributed";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "funder";
            readonly indexed: true;
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }, {
        readonly name: "RewardRecipientSet";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "holder";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "recipient";
            readonly indexed: true;
        }];
    }, {
        readonly name: "InsufficientBalance";
        readonly type: "error";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "available";
        }, {
            readonly type: "uint256";
            readonly name: "required";
        }, {
            readonly type: "address";
            readonly name: "token";
        }];
    }, {
        readonly name: "InsufficientAllowance";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "SupplyCapExceeded";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidSupplyCap";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidPayload";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "StringTooLong";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "PolicyForbids";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidRecipient";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ContractPaused";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidCurrency";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidQuoteToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "TransfersDisabled";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidAmount";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "NoOptedInSupply";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "ProtectedAddress";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidToken";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "Uninitialized";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "InvalidTransferPolicyId";
        readonly type: "error";
        readonly inputs: readonly [];
    }, {
        readonly name: "hasRole";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "account";
        }, {
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bool";
        }];
    }, {
        readonly name: "getRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "view";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [{
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "grantRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "revokeRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "address";
            readonly name: "account";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "renounceRole";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "setRoleAdmin";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
        }, {
            readonly type: "bytes32";
            readonly name: "adminRole";
        }];
        readonly outputs: readonly [];
    }, {
        readonly name: "RoleMembershipUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "account";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }, {
            readonly type: "bool";
            readonly name: "hasRole";
        }];
    }, {
        readonly name: "RoleAdminUpdated";
        readonly type: "event";
        readonly inputs: readonly [{
            readonly type: "bytes32";
            readonly name: "role";
            readonly indexed: true;
        }, {
            readonly type: "bytes32";
            readonly name: "newAdminRole";
            readonly indexed: true;
        }, {
            readonly type: "address";
            readonly name: "sender";
            readonly indexed: true;
        }];
    }, {
        readonly name: "Unauthorized";
        readonly type: "error";
        readonly inputs: readonly [];
    }], "QuoteTokenUpdate">;
}
/**
 * Updates the quote token for a TIP20 token.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const result = await Actions.token.updateQuoteTokenSync(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction receipt and event data.
 */
export declare function updateQuoteTokenSync<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: updateQuoteTokenSync.Parameters<chain, account>): Promise<updateQuoteTokenSync.ReturnValue>;
export declare namespace updateQuoteTokenSync {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = updateQuoteToken.Parameters<chain, account>;
    type Args = updateQuoteToken.Args;
    type ReturnValue = Compute<GetEventArgs<typeof Abis.tip20, 'QuoteTokenUpdate', {
        IndexedOnly: false;
        Required: true;
    }> & {
        receipt: TransactionReceipt;
    }>;
    type ErrorType = BaseErrorType;
}
/**
 * Watches for TIP20 token approval events.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const unwatch = actions.token.watchApprove(client, {
 *   onApproval: (args, log) => {
 *     console.log('Approval:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchApprove<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchApprove.Parameters): WatchContractEventReturnType;
export declare namespace watchApprove {
    type Args = GetEventArgs<typeof Abis.tip20, 'Approval', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof Abis.tip20, 'Approval'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof Abis.tip20, 'Approval', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when tokens are approved. */
        onApproval: (args: Args, log: Log) => void;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
}
/**
 * Watches for TIP20 token burn events.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const unwatch = actions.token.watchBurn(client, {
 *   onBurn: (args, log) => {
 *     console.log('Burn:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchBurn<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchBurn.Parameters): WatchContractEventReturnType;
export declare namespace watchBurn {
    type Args = GetEventArgs<typeof Abis.tip20, 'Burn', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof Abis.tip20, 'Burn'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof Abis.tip20, 'Burn', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when tokens are burned. */
        onBurn: (args: Args, log: Log) => void;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
}
/**
 * Watches for new TIP20 tokens created.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const unwatch = actions.token.watchCreate(client, {
 *   onTokenCreated: (args, log) => {
 *     console.log('Token created:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchCreate<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchCreate.Parameters): WatchContractEventReturnType;
export declare namespace watchCreate {
    type Args = GetEventArgs<typeof Abis.tip20Factory, 'TokenCreated', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof Abis.tip20Factory, 'TokenCreated'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof Abis.tip20Factory, 'TokenCreated', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when a new TIP20 token is created. */
        onTokenCreated: (args: Args, log: Log) => void;
    };
}
/**
 * Watches for TIP20 token mint events.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const unwatch = actions.token.watchMint(client, {
 *   onMint: (args, log) => {
 *     console.log('Mint:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchMint<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchMint.Parameters): WatchContractEventReturnType;
export declare namespace watchMint {
    type Args = GetEventArgs<typeof Abis.tip20, 'Mint', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof Abis.tip20, 'Mint'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof Abis.tip20, 'Mint', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when tokens are minted. */
        onMint: (args: Args, log: Log) => void;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnValue = WatchContractEventReturnType;
}
/**
 * Watches for TIP20 token role admin updates.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const unwatch = actions.token.watchAdminRole(client, {
 *   onRoleAdminUpdated: (args, log) => {
 *     console.log('Role admin updated:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchAdminRole<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchAdminRole.Parameters): WatchContractEventReturnType;
export declare namespace watchAdminRole {
    type Args = GetEventArgs<typeof Abis.tip20, 'RoleAdminUpdated', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof Abis.tip20, 'RoleAdminUpdated'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof Abis.tip20, 'RoleAdminUpdated', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when a role admin is updated. */
        onRoleAdminUpdated: (args: Args, log: Log) => void;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
}
/**
 * Watches for TIP20 token role membership updates.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const unwatch = actions.token.watchRole(client, {
 *   onRoleUpdated: (args, log) => {
 *     console.log('Role updated:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchRole<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchRole.Parameters): WatchContractEventReturnType;
export declare namespace watchRole {
    type Args = GetEventArgs<typeof Abis.tip20, 'RoleMembershipUpdated', {
        IndexedOnly: false;
        Required: true;
    }> & {
        /** Type of role update. */
        type: 'granted' | 'revoked';
    };
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof Abis.tip20, 'RoleMembershipUpdated'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof Abis.tip20, 'RoleMembershipUpdated', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when a role membership is updated. */
        onRoleUpdated: (args: Args, log: Log) => void;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
}
/**
 * Watches for TIP20 token transfer events.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const unwatch = actions.token.watchTransfer(client, {
 *   onTransfer: (args, log) => {
 *     console.log('Transfer:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchTransfer<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchTransfer.Parameters): WatchContractEventReturnType;
export declare namespace watchTransfer {
    type Args = GetEventArgs<typeof Abis.tip20, 'Transfer', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof Abis.tip20, 'Transfer'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof Abis.tip20, 'Transfer', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when tokens are transferred. */
        onTransfer: (args: Args, log: Log) => void;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
}
/**
 * Watches for TIP20 token quote token update events.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'viem/tempo'
 *
 * const client = createClient({
 *   chain: tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })
 *   transport: http(),
 * })
 *
 * const unwatch = actions.token.watchUpdateQuoteToken(client, {
 *   onUpdateQuoteToken: (args, log) => {
 *     if (args.completed)
 *       console.log('quote token update completed:', args.newQuoteToken)
 *     else
 *       console.log('quote token update proposed:', args.newQuoteToken)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchUpdateQuoteToken<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchUpdateQuoteToken.Parameters): WatchContractEventReturnType;
export declare namespace watchUpdateQuoteToken {
    type Args = OneOf<GetEventArgs<typeof Abis.tip20, 'NextQuoteTokenSet', {
        IndexedOnly: false;
        Required: true;
    }> | GetEventArgs<typeof Abis.tip20, 'QuoteTokenUpdate', {
        IndexedOnly: false;
        Required: true;
    }>> & {
        /** Whether the update has been completed. */
        completed: boolean;
    };
    type Log = viem_Log;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof Abis.tip20, any, true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when a quote token update is proposed or completed. */
        onUpdateQuoteToken: (args: Args, log: Log) => void;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
}
//# sourceMappingURL=token.d.ts.map