import { PublicKey, TransactionInstruction, SystemProgram, LAMPORTS_PER_SOL,   TransactionMessage,
  ComputeBudgetProgram,
  VersionedTransaction, } from '@solana/web3.js';
import { connection, wallet_1 } from './constants';
import { PumpSwapSDK } from './pumpswap';



async function sell_example(){


  const pumpswap_sdk = new PumpSwapSDK();
  pumpswap_sdk.sell_percentage(new PublicKey(""), wallet_1.publicKey, 1); // 1 = 100%, sell all

}
sell_example();
