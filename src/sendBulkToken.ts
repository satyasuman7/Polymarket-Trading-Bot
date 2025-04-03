import { ComputeBudgetProgram, Keypair, PublicKey, Transaction, TransactionInstruction, TransactionMessage, VersionedTransaction, TransactionExpiredBlockheightExceededError } from "@solana/web3.js";
import { createAssociatedTokenAccountInstruction, createTransferCheckedInstruction, createTransferInstruction, getAssociatedTokenAddress, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { cluster, connection } from "../config";
import { sleep } from "./utils";
import { executeVersionedTx } from "./execute";
import { sendAndConfirmTransaction } from "@solana/web3.js";

interface Drop {
    walletAddress: PublicKey,
    tokenAmount: number
}

export async function newSendToken(
    walletKeypairs: Keypair[], tokensToSendArr: number[], walletKeypair: Keypair, mintAddress: PublicKey, tokenDecimal: number
) {
    try {
        const srcAta = await getAssociatedTokenAddress(mintAddress, walletKeypair.publicKey)
        if (tokensToSendArr.length !== walletKeypairs.length) {
            console.log("Number of wallets and token amounts array is not matching")
            throw new Error("Number of wallets and token amounts array is not matching")
        }

        const insts: TransactionInstruction[] = []
        for (let i = 0; i < walletKeypairs.length; i++) {
            const destKp = walletKeypairs[i]
            const amount = tokensToSendArr[i]
            console.log("token amount ", amount)

            const baseAta = await getAssociatedTokenAddress(mintAddress, destKp.publicKey)
            if (!await connection.getAccountInfo(baseAta)) {
                insts.push(
                    createAssociatedTokenAccountInstruction(
                        walletKeypair.publicKey,
                        baseAta,
                        destKp.publicKey,
                        mintAddress
                    )
                )
            }

            insts.push(
                createTransferCheckedInstruction(
                    srcAta,
                    mintAddress,
                    baseAta,
                    walletKeypair.publicKey,
                    Math.floor(amount * 10 ** tokenDecimal),
                    tokenDecimal
                )
            )
        }

        console.log("total number of instructions : ", insts.length)
        const txs = await makeTxs(insts, walletKeypair)
        if (!txs) {
            console.log("Transaction not retrieved from makeTxs function")
            throw new Error("Transaction not retrieved from makeTxs function")
        }
        try {
            await Promise.all(txs.map(async (transaction, i) => {
                await sleep(i * 200)
                // Assuming you have a function to send a transaction
                return handleTxs(transaction, walletKeypair)
            }));

        } catch (error) {
            console.log("Error in transaction confirmation part : ", error)
        }
    } catch (error) {
        console.log("New Send Token function error : ", error)
    }
}

const makeTxs = async (insts: TransactionInstruction[], mainKp: Keypair) => {
    try {

        const batchNum = 12
        const txNum = Math.ceil(insts.length / batchNum)
        const txs: Transaction[] = []
        for (let i = 0; i < txNum; i++) {
            const upperIndex = batchNum * (i + 1)
            const downIndex = batchNum * i
            const tx = new Transaction().add(
                ComputeBudgetProgram.setComputeUnitLimit({ units: 200_000 }),
                ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 100_000 })
            )

            for (let j = downIndex; j < upperIndex; j++)
                if (insts[j])
                    tx.add(insts[j])

            tx.recentBlockhash = (await connection.getLatestBlockhash("confirmed")).blockhash
            tx.feePayer = mainKp.publicKey
            console.log(await connection.simulateTransaction(tx))

            txs.push(tx)
        }
        if (txs.length == 0) {
            console.log("Empty instructions as input")
            throw new Error("Empty instructions as input")
        }
        return txs
    } catch (error) {
        console.log("MakeTxs ~ error:", error)
    }

}

const handleTxs = async (transaction: Transaction, mainKp: Keypair) => {
    const sig = await sendAndConfirmTransaction(connection, transaction, [mainKp], { skipPreflight: true })
    console.log(`https://solscan.io/tx/${sig}`);
}