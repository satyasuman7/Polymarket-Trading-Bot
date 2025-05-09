import { PublicKey, TransactionInstruction, SystemProgram, LAMPORTS_PER_SOL,   TransactionMessage,
    ComputeBudgetProgram,
    VersionedTransaction, } from '@solana/web3.js';
import { connection, wallet_1 } from './constants';
import { AnchorProvider } from "@coral-xyz/anchor";
import { PumpSwapSDK } from './pumpswap';

async function buy_example(){

  const pumpswap_sdk = new PumpSwapSDK();
  pumpswap_sdk.buy(new PublicKey(""), wallet_1.publicKey, 0.22); // 0.22 sol

}
buy_example();