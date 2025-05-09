
import { NATIVE_MINT, getOrCreateAssociatedTokenAccount, createCloseAccountInstruction } from "@solana/spl-token";
import { connection, wallet_1 } from "../constants";
import { Transaction, LAMPORTS_PER_SOL, sendAndConfirmTransaction, ComputeBudgetProgram } from "@solana/web3.js";
import { Keypair } from "@solana/web3.js";

export async function unwrapSol(wallet:Keypair){
    // wSol ATA
    const wSolAta = await getOrCreateAssociatedTokenAccount(connection, wallet, NATIVE_MINT, wallet.publicKey);

    // close wSol account instruction
    const transaction = new Transaction;
    transaction.add(
        createCloseAccountInstruction(
          wSolAta.address,
          wallet.publicKey,
          wallet.publicKey
        )
    );
    transaction.add(
        ComputeBudgetProgram.setComputeUnitPrice({
            microLamports: 0.005 * LAMPORTS_PER_SOL,
          })
    )

    // submit transaction
    const txSignature = await sendAndConfirmTransaction(connection, transaction, [wallet]);

    // validate transaction was successful
    try {
        const latestBlockhash = await connection.getLatestBlockhash();
        await connection.confirmTransaction({
            blockhash: latestBlockhash.blockhash,
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            signature: txSignature,
        }, 'confirmed');
    } catch (error) {
        console.log(`Error unwrapping sol: ${error}`);
    };
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const new_sol_balance = await connection.getBalance(wallet.publicKey);
    console.log(`new sol balance: ${new_sol_balance/LAMPORTS_PER_SOL}`);
    return txSignature;
}

async function main(){
    unwrapSol(wallet_1)
}

// main();
