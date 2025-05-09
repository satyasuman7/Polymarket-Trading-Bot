import { NATIVE_MINT, getOrCreateAssociatedTokenAccount, createSyncNativeInstruction,  } from "@solana/spl-token";
import { wallet_1, connection } from "../constants";
import { Transaction, SystemProgram, LAMPORTS_PER_SOL,  sendAndConfirmTransaction, ComputeBudgetProgram } from "@solana/web3.js";
import {getSPLTokenBalance} from "./utils";
import { program } from "commander";
import { logger } from "./logger";
let wrap_size = 0;
export async function wrap_sol(
    amount:number
){
    // wSol ATA 
    const wSolAta = await getOrCreateAssociatedTokenAccount(connection, wallet_1, NATIVE_MINT, wallet_1.publicKey);
    console.log(`wsol ATA: ${wSolAta.address.toBase58()}`);
    // wrap Sol
    let transaction = new Transaction().add(
        // trasnfer SOL
        SystemProgram.transfer({
          fromPubkey: wallet_1.publicKey,
          toPubkey: wSolAta.address,
          lamports: amount*LAMPORTS_PER_SOL,
        }),
        // sync wrapped SOL balance
        createSyncNativeInstruction(wSolAta.address)
    );


    // submit transaction
    const txSignature = await sendAndConfirmTransaction(connection, transaction, [wallet_1]);

    // validate transaction was successful
    try {
        const latestBlockhash = await connection.getLatestBlockhash();
        await connection.confirmTransaction({
            blockhash: latestBlockhash.blockhash,
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            signature: txSignature,
        }, 'confirmed');
    } catch (error) {
        console.log(`Error wrapping sol: ${error}`);
    };
    // await for 3 second
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await check_wsol_balance(wSolAta)

    return txSignature;
}

export async function check_wsol_balance(wSolAta:any){
    const wsolBalance = await getSPLTokenBalance(connection, NATIVE_MINT, wallet_1.publicKey);

    console.log(`new wsol balance: ${wsolBalance}`);
    return wsolBalance;
}

export async function main(){
    await wrap_sol(0.1);
    
}
//main();