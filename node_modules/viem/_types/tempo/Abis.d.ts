export declare const tip20: readonly [{
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
}];
export declare const stablecoinDex: readonly [{
    readonly name: "createPair";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "base";
    }];
    readonly outputs: readonly [{
        readonly type: "bytes32";
        readonly name: "key";
    }];
}, {
    readonly name: "place";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "token";
    }, {
        readonly type: "uint128";
        readonly name: "amount";
    }, {
        readonly type: "bool";
        readonly name: "isBid";
    }, {
        readonly type: "int16";
        readonly name: "tick";
    }];
    readonly outputs: readonly [{
        readonly type: "uint128";
        readonly name: "orderId";
    }];
}, {
    readonly name: "placeFlip";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "token";
    }, {
        readonly type: "uint128";
        readonly name: "amount";
    }, {
        readonly type: "bool";
        readonly name: "isBid";
    }, {
        readonly type: "int16";
        readonly name: "tick";
    }, {
        readonly type: "int16";
        readonly name: "flipTick";
    }];
    readonly outputs: readonly [{
        readonly type: "uint128";
        readonly name: "orderId";
    }];
}, {
    readonly name: "cancel";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "uint128";
        readonly name: "orderId";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "cancelStaleOrder";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "uint128";
        readonly name: "orderId";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "swapExactAmountIn";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "tokenIn";
    }, {
        readonly type: "address";
        readonly name: "tokenOut";
    }, {
        readonly type: "uint128";
        readonly name: "amountIn";
    }, {
        readonly type: "uint128";
        readonly name: "minAmountOut";
    }];
    readonly outputs: readonly [{
        readonly type: "uint128";
        readonly name: "amountOut";
    }];
}, {
    readonly name: "swapExactAmountOut";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "tokenIn";
    }, {
        readonly type: "address";
        readonly name: "tokenOut";
    }, {
        readonly type: "uint128";
        readonly name: "amountOut";
    }, {
        readonly type: "uint128";
        readonly name: "maxAmountIn";
    }];
    readonly outputs: readonly [{
        readonly type: "uint128";
        readonly name: "amountIn";
    }];
}, {
    readonly name: "quoteSwapExactAmountIn";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "tokenIn";
    }, {
        readonly type: "address";
        readonly name: "tokenOut";
    }, {
        readonly type: "uint128";
        readonly name: "amountIn";
    }];
    readonly outputs: readonly [{
        readonly type: "uint128";
        readonly name: "amountOut";
    }];
}, {
    readonly name: "quoteSwapExactAmountOut";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "tokenIn";
    }, {
        readonly type: "address";
        readonly name: "tokenOut";
    }, {
        readonly type: "uint128";
        readonly name: "amountOut";
    }];
    readonly outputs: readonly [{
        readonly type: "uint128";
        readonly name: "amountIn";
    }];
}, {
    readonly name: "balanceOf";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "user";
    }, {
        readonly type: "address";
        readonly name: "token";
    }];
    readonly outputs: readonly [{
        readonly type: "uint128";
    }];
}, {
    readonly name: "withdraw";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "token";
    }, {
        readonly type: "uint128";
        readonly name: "amount";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "getOrder";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "uint128";
        readonly name: "orderId";
    }];
    readonly outputs: readonly [{
        readonly type: "tuple";
        readonly components: readonly [{
            readonly type: "uint128";
            readonly name: "orderId";
        }, {
            readonly type: "address";
            readonly name: "maker";
        }, {
            readonly type: "bytes32";
            readonly name: "bookKey";
        }, {
            readonly type: "bool";
            readonly name: "isBid";
        }, {
            readonly type: "int16";
            readonly name: "tick";
        }, {
            readonly type: "uint128";
            readonly name: "amount";
        }, {
            readonly type: "uint128";
            readonly name: "remaining";
        }, {
            readonly type: "uint128";
            readonly name: "prev";
        }, {
            readonly type: "uint128";
            readonly name: "next";
        }, {
            readonly type: "bool";
            readonly name: "isFlip";
        }, {
            readonly type: "int16";
            readonly name: "flipTick";
        }];
    }];
}, {
    readonly name: "getTickLevel";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "base";
    }, {
        readonly type: "int16";
        readonly name: "tick";
    }, {
        readonly type: "bool";
        readonly name: "isBid";
    }];
    readonly outputs: readonly [{
        readonly type: "uint128";
        readonly name: "head";
    }, {
        readonly type: "uint128";
        readonly name: "tail";
    }, {
        readonly type: "uint128";
        readonly name: "totalLiquidity";
    }];
}, {
    readonly name: "pairKey";
    readonly type: "function";
    readonly stateMutability: "pure";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "tokenA";
    }, {
        readonly type: "address";
        readonly name: "tokenB";
    }];
    readonly outputs: readonly [{
        readonly type: "bytes32";
    }];
}, {
    readonly name: "nextOrderId";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "uint128";
    }];
}, {
    readonly name: "books";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "pairKey";
    }];
    readonly outputs: readonly [{
        readonly type: "tuple";
        readonly components: readonly [{
            readonly type: "address";
            readonly name: "base";
        }, {
            readonly type: "address";
            readonly name: "quote";
        }, {
            readonly type: "int16";
            readonly name: "bestBidTick";
        }, {
            readonly type: "int16";
            readonly name: "bestAskTick";
        }];
    }];
}, {
    readonly name: "MIN_TICK";
    readonly type: "function";
    readonly stateMutability: "pure";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "int16";
    }];
}, {
    readonly name: "MAX_TICK";
    readonly type: "function";
    readonly stateMutability: "pure";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "int16";
    }];
}, {
    readonly name: "TICK_SPACING";
    readonly type: "function";
    readonly stateMutability: "pure";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "int16";
    }];
}, {
    readonly name: "PRICE_SCALE";
    readonly type: "function";
    readonly stateMutability: "pure";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "uint32";
    }];
}, {
    readonly name: "MIN_ORDER_AMOUNT";
    readonly type: "function";
    readonly stateMutability: "pure";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "uint128";
    }];
}, {
    readonly name: "MIN_PRICE";
    readonly type: "function";
    readonly stateMutability: "pure";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "uint32";
    }];
}, {
    readonly name: "MAX_PRICE";
    readonly type: "function";
    readonly stateMutability: "pure";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "uint32";
    }];
}, {
    readonly name: "tickToPrice";
    readonly type: "function";
    readonly stateMutability: "pure";
    readonly inputs: readonly [{
        readonly type: "int16";
        readonly name: "tick";
    }];
    readonly outputs: readonly [{
        readonly type: "uint32";
        readonly name: "price";
    }];
}, {
    readonly name: "priceToTick";
    readonly type: "function";
    readonly stateMutability: "pure";
    readonly inputs: readonly [{
        readonly type: "uint32";
        readonly name: "price";
    }];
    readonly outputs: readonly [{
        readonly type: "int16";
        readonly name: "tick";
    }];
}, {
    readonly name: "PairCreated";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "key";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "base";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "quote";
        readonly indexed: true;
    }];
}, {
    readonly name: "OrderPlaced";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "uint128";
        readonly name: "orderId";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "maker";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "token";
        readonly indexed: true;
    }, {
        readonly type: "uint128";
        readonly name: "amount";
    }, {
        readonly type: "bool";
        readonly name: "isBid";
    }, {
        readonly type: "int16";
        readonly name: "tick";
    }, {
        readonly type: "bool";
        readonly name: "isFlipOrder";
    }, {
        readonly type: "int16";
        readonly name: "flipTick";
    }];
}, {
    readonly name: "OrderFilled";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "uint128";
        readonly name: "orderId";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "maker";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "taker";
        readonly indexed: true;
    }, {
        readonly type: "uint128";
        readonly name: "amountFilled";
    }, {
        readonly type: "bool";
        readonly name: "partialFill";
    }];
}, {
    readonly name: "OrderCancelled";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "uint128";
        readonly name: "orderId";
        readonly indexed: true;
    }];
}, {
    readonly name: "Unauthorized";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "PairDoesNotExist";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "PairAlreadyExists";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "OrderDoesNotExist";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "IdenticalTokens";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InvalidToken";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "TickOutOfBounds";
    readonly type: "error";
    readonly inputs: readonly [{
        readonly type: "int16";
        readonly name: "tick";
    }];
}, {
    readonly name: "InvalidTick";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InvalidFlipTick";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InsufficientBalance";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InsufficientLiquidity";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InsufficientOutput";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "MaxInputExceeded";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "BelowMinimumOrderSize";
    readonly type: "error";
    readonly inputs: readonly [{
        readonly type: "uint128";
        readonly name: "amount";
    }];
}, {
    readonly name: "InvalidBaseToken";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "OrderNotStale";
    readonly type: "error";
    readonly inputs: readonly [];
}];
export declare const feeManager: readonly [{
    readonly name: "userTokens";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "user";
    }];
    readonly outputs: readonly [{
        readonly type: "address";
    }];
}, {
    readonly name: "validatorTokens";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "validator";
    }];
    readonly outputs: readonly [{
        readonly type: "address";
    }];
}, {
    readonly name: "setUserToken";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "token";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "setValidatorToken";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "token";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "distributeFees";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "validator";
    }, {
        readonly type: "address";
        readonly name: "token";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "collectedFees";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "validator";
    }, {
        readonly type: "address";
        readonly name: "token";
    }];
    readonly outputs: readonly [{
        readonly type: "uint256";
    }];
}, {
    readonly name: "UserTokenSet";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "user";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "token";
        readonly indexed: true;
    }];
}, {
    readonly name: "ValidatorTokenSet";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "validator";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "token";
        readonly indexed: true;
    }];
}, {
    readonly name: "FeesDistributed";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "validator";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "token";
        readonly indexed: true;
    }, {
        readonly type: "uint256";
        readonly name: "amount";
    }];
}, {
    readonly name: "OnlyValidator";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "OnlySystemContract";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InvalidToken";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "PoolDoesNotExist";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InsufficientFeeTokenBalance";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InternalError";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "CannotChangeWithinBlock";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "CannotChangeWithPendingFees";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "TokenPolicyForbids";
    readonly type: "error";
    readonly inputs: readonly [];
}];
export declare const feeAmm: readonly [{
    readonly name: "M";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "uint256";
    }];
}, {
    readonly name: "N";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "uint256";
    }];
}, {
    readonly name: "SCALE";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "uint256";
    }];
}, {
    readonly name: "MIN_LIQUIDITY";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "uint256";
    }];
}, {
    readonly name: "getPoolId";
    readonly type: "function";
    readonly stateMutability: "pure";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "userToken";
    }, {
        readonly type: "address";
        readonly name: "validatorToken";
    }];
    readonly outputs: readonly [{
        readonly type: "bytes32";
    }];
}, {
    readonly name: "getPool";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "userToken";
    }, {
        readonly type: "address";
        readonly name: "validatorToken";
    }];
    readonly outputs: readonly [{
        readonly type: "tuple";
        readonly components: readonly [{
            readonly type: "uint128";
            readonly name: "reserveUserToken";
        }, {
            readonly type: "uint128";
            readonly name: "reserveValidatorToken";
        }];
    }];
}, {
    readonly name: "pools";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "poolId";
    }];
    readonly outputs: readonly [{
        readonly type: "tuple";
        readonly components: readonly [{
            readonly type: "uint128";
            readonly name: "reserveUserToken";
        }, {
            readonly type: "uint128";
            readonly name: "reserveValidatorToken";
        }];
    }];
}, {
    readonly name: "mint";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "userToken";
    }, {
        readonly type: "address";
        readonly name: "validatorToken";
    }, {
        readonly type: "uint256";
        readonly name: "amountValidatorToken";
    }, {
        readonly type: "address";
        readonly name: "to";
    }];
    readonly outputs: readonly [{
        readonly type: "uint256";
        readonly name: "liquidity";
    }];
}, {
    readonly name: "burn";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "userToken";
    }, {
        readonly type: "address";
        readonly name: "validatorToken";
    }, {
        readonly type: "uint256";
        readonly name: "liquidity";
    }, {
        readonly type: "address";
        readonly name: "to";
    }];
    readonly outputs: readonly [{
        readonly type: "uint256";
        readonly name: "amountUserToken";
    }, {
        readonly type: "uint256";
        readonly name: "amountValidatorToken";
    }];
}, {
    readonly name: "totalSupply";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "poolId";
    }];
    readonly outputs: readonly [{
        readonly type: "uint256";
    }];
}, {
    readonly name: "liquidityBalances";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "poolId";
    }, {
        readonly type: "address";
        readonly name: "user";
    }];
    readonly outputs: readonly [{
        readonly type: "uint256";
    }];
}, {
    readonly name: "rebalanceSwap";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "userToken";
    }, {
        readonly type: "address";
        readonly name: "validatorToken";
    }, {
        readonly type: "uint256";
        readonly name: "amountOut";
    }, {
        readonly type: "address";
        readonly name: "to";
    }];
    readonly outputs: readonly [{
        readonly type: "uint256";
        readonly name: "amountIn";
    }];
}, {
    readonly name: "Mint";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "sender";
    }, {
        readonly type: "address";
        readonly name: "to";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "userToken";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "validatorToken";
        readonly indexed: true;
    }, {
        readonly type: "uint256";
        readonly name: "amountValidatorToken";
    }, {
        readonly type: "uint256";
        readonly name: "liquidity";
    }];
}, {
    readonly name: "Burn";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "sender";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "userToken";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "validatorToken";
        readonly indexed: true;
    }, {
        readonly type: "uint256";
        readonly name: "amountUserToken";
    }, {
        readonly type: "uint256";
        readonly name: "amountValidatorToken";
    }, {
        readonly type: "uint256";
        readonly name: "liquidity";
    }, {
        readonly type: "address";
        readonly name: "to";
    }];
}, {
    readonly name: "RebalanceSwap";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "userToken";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "validatorToken";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "swapper";
        readonly indexed: true;
    }, {
        readonly type: "uint256";
        readonly name: "amountIn";
    }, {
        readonly type: "uint256";
        readonly name: "amountOut";
    }];
}, {
    readonly name: "IdenticalAddresses";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InvalidToken";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InsufficientLiquidity";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InsufficientReserves";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InvalidAmount";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "DivisionByZero";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InvalidSwapCalculation";
    readonly type: "error";
    readonly inputs: readonly [];
}];
export declare const accountKeychain: readonly [{
    readonly name: "authorizeKey";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "keyId";
    }, {
        readonly type: "uint8";
        readonly name: "signatureType";
    }, {
        readonly type: "uint64";
        readonly name: "expiry";
    }, {
        readonly type: "bool";
        readonly name: "enforceLimits";
    }, {
        readonly type: "tuple[]";
        readonly name: "limits";
        readonly components: readonly [{
            readonly type: "address";
            readonly name: "token";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "revokeKey";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "keyId";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "updateSpendingLimit";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "keyId";
    }, {
        readonly type: "address";
        readonly name: "token";
    }, {
        readonly type: "uint256";
        readonly name: "newLimit";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "getKey";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "account";
    }, {
        readonly type: "address";
        readonly name: "keyId";
    }];
    readonly outputs: readonly [{
        readonly type: "tuple";
        readonly components: readonly [{
            readonly type: "uint8";
            readonly name: "signatureType";
        }, {
            readonly type: "address";
            readonly name: "keyId";
        }, {
            readonly type: "uint64";
            readonly name: "expiry";
        }, {
            readonly type: "bool";
            readonly name: "enforceLimits";
        }, {
            readonly type: "bool";
            readonly name: "isRevoked";
        }];
    }];
}, {
    readonly name: "getRemainingLimit";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "account";
    }, {
        readonly type: "address";
        readonly name: "keyId";
    }, {
        readonly type: "address";
        readonly name: "token";
    }];
    readonly outputs: readonly [{
        readonly type: "uint256";
    }];
}, {
    readonly name: "getTransactionKey";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "address";
    }];
}, {
    readonly name: "KeyAuthorized";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "account";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "publicKey";
        readonly indexed: true;
    }, {
        readonly type: "uint8";
        readonly name: "signatureType";
    }, {
        readonly type: "uint64";
        readonly name: "expiry";
    }];
}, {
    readonly name: "KeyRevoked";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "account";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "publicKey";
        readonly indexed: true;
    }];
}, {
    readonly name: "SpendingLimitUpdated";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "account";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "publicKey";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "token";
        readonly indexed: true;
    }, {
        readonly type: "uint256";
        readonly name: "newLimit";
    }];
}, {
    readonly name: "UnauthorizedCaller";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "KeyAlreadyExists";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "KeyNotFound";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "KeyExpired";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "SpendingLimitExceeded";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InvalidSignatureType";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "ZeroPublicKey";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "ExpiryInPast";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "KeyAlreadyRevoked";
    readonly type: "error";
    readonly inputs: readonly [];
}];
export declare const nonce: readonly [{
    readonly name: "getNonce";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "account";
    }, {
        readonly type: "uint256";
        readonly name: "nonceKey";
    }];
    readonly outputs: readonly [{
        readonly type: "uint64";
        readonly name: "nonce";
    }];
}, {
    readonly name: "NonceIncremented";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "account";
        readonly indexed: true;
    }, {
        readonly type: "uint256";
        readonly name: "nonceKey";
        readonly indexed: true;
    }, {
        readonly type: "uint64";
        readonly name: "newNonce";
    }];
}, {
    readonly name: "ProtocolNonceNotSupported";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InvalidNonceKey";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "NonceOverflow";
    readonly type: "error";
    readonly inputs: readonly [];
}];
export declare const tip20Factory: readonly [{
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
}];
export declare const tip403Registry: readonly [{
    readonly name: "policyIdCounter";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "uint64";
    }];
}, {
    readonly name: "policyExists";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "uint64";
        readonly name: "policyId";
    }];
    readonly outputs: readonly [{
        readonly type: "bool";
    }];
}, {
    readonly name: "policyData";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "uint64";
        readonly name: "policyId";
    }];
    readonly outputs: readonly [{
        readonly type: "uint8";
        readonly name: "policyType";
    }, {
        readonly type: "address";
        readonly name: "admin";
    }];
}, {
    readonly name: "isAuthorized";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "uint64";
        readonly name: "policyId";
    }, {
        readonly type: "address";
        readonly name: "user";
    }];
    readonly outputs: readonly [{
        readonly type: "bool";
    }];
}, {
    readonly name: "createPolicy";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "admin";
    }, {
        readonly type: "uint8";
        readonly name: "policyType";
    }];
    readonly outputs: readonly [{
        readonly type: "uint64";
    }];
}, {
    readonly name: "createPolicyWithAccounts";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "admin";
    }, {
        readonly type: "uint8";
        readonly name: "policyType";
    }, {
        readonly type: "address[]";
        readonly name: "accounts";
    }];
    readonly outputs: readonly [{
        readonly type: "uint64";
    }];
}, {
    readonly name: "setPolicyAdmin";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "uint64";
        readonly name: "policyId";
    }, {
        readonly type: "address";
        readonly name: "admin";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "modifyPolicyWhitelist";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "uint64";
        readonly name: "policyId";
    }, {
        readonly type: "address";
        readonly name: "account";
    }, {
        readonly type: "bool";
        readonly name: "allowed";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "modifyPolicyBlacklist";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "uint64";
        readonly name: "policyId";
    }, {
        readonly type: "address";
        readonly name: "account";
    }, {
        readonly type: "bool";
        readonly name: "restricted";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "PolicyAdminUpdated";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "uint64";
        readonly name: "policyId";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "updater";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "admin";
        readonly indexed: true;
    }];
}, {
    readonly name: "PolicyCreated";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "uint64";
        readonly name: "policyId";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "updater";
        readonly indexed: true;
    }, {
        readonly type: "uint8";
        readonly name: "policyType";
    }];
}, {
    readonly name: "WhitelistUpdated";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "uint64";
        readonly name: "policyId";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "updater";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "account";
        readonly indexed: true;
    }, {
        readonly type: "bool";
        readonly name: "allowed";
    }];
}, {
    readonly name: "BlacklistUpdated";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "uint64";
        readonly name: "policyId";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "updater";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "account";
        readonly indexed: true;
    }, {
        readonly type: "bool";
        readonly name: "restricted";
    }];
}, {
    readonly name: "Unauthorized";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "IncompatiblePolicyType";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "PolicyNotFound";
    readonly type: "error";
    readonly inputs: readonly [];
}];
export declare const validator: readonly [{
    readonly name: "getValidators";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "tuple[]";
        readonly name: "validators";
        readonly components: readonly [{
            readonly type: "bytes32";
            readonly name: "publicKey";
        }, {
            readonly type: "bool";
            readonly name: "active";
        }, {
            readonly type: "uint64";
            readonly name: "index";
        }, {
            readonly type: "address";
            readonly name: "validatorAddress";
        }, {
            readonly type: "string";
            readonly name: "inboundAddress";
        }, {
            readonly type: "string";
            readonly name: "outboundAddress";
        }];
    }];
}, {
    readonly name: "addValidator";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "newValidatorAddress";
    }, {
        readonly type: "bytes32";
        readonly name: "publicKey";
    }, {
        readonly type: "bool";
        readonly name: "active";
    }, {
        readonly type: "string";
        readonly name: "inboundAddress";
    }, {
        readonly type: "string";
        readonly name: "outboundAddress";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "updateValidator";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "newValidatorAddress";
    }, {
        readonly type: "bytes32";
        readonly name: "publicKey";
    }, {
        readonly type: "string";
        readonly name: "inboundAddress";
    }, {
        readonly type: "string";
        readonly name: "outboundAddress";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "changeValidatorStatus";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "validator";
    }, {
        readonly type: "bool";
        readonly name: "active";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "owner";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "address";
    }];
}, {
    readonly name: "changeOwner";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "newOwner";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "getNextFullDkgCeremony";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "uint64";
    }];
}, {
    readonly name: "setNextFullDkgCeremony";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "uint64";
        readonly name: "epoch";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "validatorsArray";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "uint256";
        readonly name: "index";
    }];
    readonly outputs: readonly [{
        readonly type: "address";
    }];
}, {
    readonly name: "validators";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "validator";
    }];
    readonly outputs: readonly [{
        readonly type: "tuple";
        readonly components: readonly [{
            readonly type: "bytes32";
            readonly name: "publicKey";
        }, {
            readonly type: "bool";
            readonly name: "active";
        }, {
            readonly type: "uint64";
            readonly name: "index";
        }, {
            readonly type: "address";
            readonly name: "validatorAddress";
        }, {
            readonly type: "string";
            readonly name: "inboundAddress";
        }, {
            readonly type: "string";
            readonly name: "outboundAddress";
        }];
    }];
}, {
    readonly name: "validatorCount";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "uint64";
    }];
}, {
    readonly name: "Unauthorized";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "ValidatorAlreadyExists";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "ValidatorNotFound";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InvalidPublicKey";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "NotHostPort";
    readonly type: "error";
    readonly inputs: readonly [{
        readonly type: "string";
        readonly name: "field";
    }, {
        readonly type: "string";
        readonly name: "input";
    }, {
        readonly type: "string";
        readonly name: "backtrace";
    }];
}, {
    readonly name: "NotIpPort";
    readonly type: "error";
    readonly inputs: readonly [{
        readonly type: "string";
        readonly name: "field";
    }, {
        readonly type: "string";
        readonly name: "input";
    }, {
        readonly type: "string";
        readonly name: "backtrace";
    }];
}];
//# sourceMappingURL=Abis.d.ts.map