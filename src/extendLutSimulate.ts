import { AddressLookupTableProgram, ComputeBudgetProgram, Keypair, PublicKey, sendAndConfirmRawTransaction, Transaction, TransactionInstruction, TransactionMessage, VersionedTransaction } from "@solana/web3.js"
import {
    DEVNET_PROGRAM_ID,
    jsonInfo2PoolKeys,
    Liquidity,
    MAINNET_PROGRAM_ID,
    MARKET_STATE_LAYOUT_V3, LiquidityPoolKeys,
    Token, TokenAmount, ZERO, ONE, TEN,
    TOKEN_PROGRAM_ID, parseBigNumberish, bool,
    buildSimpleTransaction,
    TxVersion,
    Percent
} from "@raydium-io/raydium-sdk"
import { getAssociatedTokenAddress, getAssociatedTokenAddressSync, getMint, NATIVE_MINT, unpackMint } from "@solana/spl-token";
import bs58 from "bs58"
import BN from "bn.js"

import { mainMenuWaiting, outputBalance, readBundlerWallets, readJson, readLUTAddressFromFile, readWallets, retrieveEnvVariable, saveDataToFile, sleep } from "./utils"
import {
    getTokenAccountBalance,
    assert,
    getWalletTokenAccount,
} from "./get_balance";
import { build_swap_instructions, build_create_pool_instructions } from "./build_a_sendtxn";
import {
    connection,
    addLookupTableInfo, cluster,
    lookupTableCache,
    delay_pool_open_time, DEFAULT_TOKEN
} from "../config";
import {
    quote_Mint_amount,
    input_baseMint_tokens_percentage,
    // swapWallets,
    defaltSwapSolAmount,
    bundlerWalletName,
    batchSize
} from "../settings"

import { createAndSendV0Tx } from "../layout/createLutAta";
// import { createLookupTable } from "../layout/createLUT";
import { calcWalletSol } from "../layout/walletCreate";

const programId = cluster == "devnet" ? DEVNET_PROGRAM_ID : MAINNET_PROGRAM_ID

let swapSolAmount = calcWalletSol();

export async function extendLutSimulate() {
    // Contact with savant-cat
}