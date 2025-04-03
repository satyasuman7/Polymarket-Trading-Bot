import bs58 from "bs58"
import { AddressLookupTableProgram, ComputeBudgetProgram, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SignatureStatus, SystemProgram, Transaction, TransactionConfirmationStatus, TransactionInstruction, TransactionMessage, TransactionSignature, VersionedTransaction } from "@solana/web3.js"
import { cluster, connection } from "../config";
import { mainMenuWaiting, outputBalance, readBundlerWallets, readJson, saveLUTAddressToFile, sleep } from "../src/utils";
import { bundlerWalletName } from "../settings";
import { ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountIdempotentInstruction, createSyncNativeInstruction, getAssociatedTokenAddress, getAssociatedTokenAddressSync, NATIVE_MINT, TOKEN_PROGRAM_ID, unpackMint } from "@solana/spl-token";
import { DEVNET_PROGRAM_ID, Liquidity, MAINNET_PROGRAM_ID, MARKET_STATE_LAYOUT_V3 } from "@raydium-io/raydium-sdk";
import { derivePoolKeys } from "../src/poolAll";

import { calcWalletSol } from "./walletCreate";

const data = readJson()
const SIGNER_WALLET = Keypair.fromSecretKey(bs58.decode(data.mainKp!))
let swapSolAmount = calcWalletSol();

export const createAndSendV0Tx = async (txInstructions: TransactionInstruction[]) => {
    // Contact with owner
    cluster == "devnet" ? console.log('🎉 Transaction successfully confirmed!', '\n', `https://explorer.solana.com/tx/${txid}?cluster=devnet`)
        : console.log('🎉 Transaction successfully confirmed!', '\n', `https://explorer.solana.com/tx/${txid}`);
}

async function confirmTransaction(
    connection: Connection,
    signature: TransactionSignature,
    desiredConfirmationStatus: TransactionConfirmationStatus = 'confirmed',
    timeout: number = 30000,
    pollInterval: number = 1000,
    searchTransactionHistory: boolean = false
): Promise<SignatureStatus> {
    const start = Date.now();

    while (Date.now() - start < timeout) {
        const { value: statuses } = await connection.getSignatureStatuses([signature], { searchTransactionHistory });

        if (!statuses || statuses.length === 0) {
            throw new Error('Failed to get signature status');
        }

        const status = statuses[0];

        if (status === null) {
            // If status is null, the transaction is not yet known
            await new Promise(resolve => setTimeout(resolve, pollInterval));
            continue;
        }

        if (status.err) {
            throw new Error(`Transaction failed: ${JSON.stringify(status.err)}`);
        }

        if (status.confirmationStatus && status.confirmationStatus === desiredConfirmationStatus) {
            return status;
        }

        if (status.confirmationStatus === 'finalized') {
            return status;
        }

        await new Promise(resolve => setTimeout(resolve, pollInterval));
    }

    throw new Error(`Transaction confirmation timeout after ${timeout}ms`);
}

async function createLUT() {
    try {
        const [lookupTableInst, lookupTableAddress] =
            AddressLookupTableProgram.createLookupTable({
                authority: SIGNER_WALLET.publicKey,
                payer: SIGNER_WALLET.publicKey,
                recentSlot: await connection.getSlot(),
            });

        // Step 2 - Log Lookup Table Address
        console.log("Lookup Table Address:", lookupTableAddress.toBase58());

        // Step 3 - Generate a create transaction and send it to the network
        createAndSendV0Tx([
            ComputeBudgetProgram.setComputeUnitLimit({ units: 50_000 }),
            ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 500_000 }),
            lookupTableInst]);
        console.log("Lookup Table Address created successfully!")
        console.log("Please wait for about 15 seconds...")
        await sleep(15000)
        return lookupTableAddress
    } catch (err) {
        console.log("Error in creating Lookuptable. Please retry this.")
        return
    }

}

async function addAddressesToTable(LOOKUP_TABLE_ADDRESS: PublicKey, mint: PublicKey) {
    const programId = cluster == "devnet" ? DEVNET_PROGRAM_ID : MAINNET_PROGRAM_ID

    const wallets = readBundlerWallets(bundlerWalletName)

    const walletKPs: Keypair[] = wallets.map((wallet: string) => Keypair.fromSecretKey(bs58.decode(wallet)));
    const walletPKs: PublicKey[] = wallets.map((wallet: string) => (Keypair.fromSecretKey(bs58.decode(wallet))).publicKey);

    try {// Step 1 - Adding bundler wallets
        const addAddressesInstruction = AddressLookupTableProgram.extendLookupTable({
            payer: SIGNER_WALLET.publicKey,
            authority: SIGNER_WALLET.publicKey,
            lookupTable: LOOKUP_TABLE_ADDRESS,
            addresses: walletPKs,
        });
        await createAndSendV0Tx([
            ComputeBudgetProgram.setComputeUnitLimit({ units: 50_000 }),
            ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 500_000 }),
            addAddressesInstruction]);
        console.log("Successfully added wallet addresses.")
        await sleep(10000)

        // Step 2 - Adding wallets' token ata
        console.log(`Adding atas for the token ${mint.toBase58()}`)
        const baseAtas: PublicKey[] = []
        for (const wallet of walletKPs) {
            const baseAta = getAssociatedTokenAddressSync(mint, wallet.publicKey)  //
            baseAtas.push(baseAta);          //
        }
        console.log("Base atas address num to extend: ", baseAtas.length)
        const addAddressesInstruction1 = AddressLookupTableProgram.extendLookupTable({
            payer: SIGNER_WALLET.publicKey,
            authority: SIGNER_WALLET.publicKey,
            lookupTable: LOOKUP_TABLE_ADDRESS,
            addresses: baseAtas,
        });
        await createAndSendV0Tx([addAddressesInstruction1]);
        console.log("Successfully added token ata addresses.")
        await sleep(5000)

        // Step 3 - Adding wallets' wsol ata
        const quoteAtas = []
        for (const wallet of walletKPs) {
            const quoteAta = getAssociatedTokenAddressSync(NATIVE_MINT, wallet.publicKey)
            quoteAtas.push(quoteAta);
            console.log("Base atas address num to extend: ", baseAtas.length)
        }
        const addAddressesInstruction2 = AddressLookupTableProgram.extendLookupTable({
            payer: SIGNER_WALLET.publicKey,
            authority: SIGNER_WALLET.publicKey,
            lookupTable: LOOKUP_TABLE_ADDRESS,
            addresses: quoteAtas,
        });
        await createAndSendV0Tx([addAddressesInstruction2]);
        console.log("Successfully added wsol ata addresses.")
        await sleep(10000)

        // Step 4 - Adding main wallet
        const addAddressesInstruction3 = AddressLookupTableProgram.extendLookupTable({
            payer: SIGNER_WALLET.publicKey,
            authority: SIGNER_WALLET.publicKey,
            lookupTable: LOOKUP_TABLE_ADDRESS,
            addresses: [],
        });
        await createAndSendV0Tx([addAddressesInstruction3]);
        console.log("Successfully added main wallet address.")
        await sleep(1000)

        // Step 5 - Adding Poolkeys
        const marketBufferInfo = await connection.getAccountInfo(new PublicKey(data.marketId!));

        if (!marketBufferInfo) {
            console.log("Failed to get market buffer info. Please retry this.")
            return
        }

        const {
            baseMint,
            quoteMint,
            baseVault: marketBaseVault,
            quoteVault: marketQuoteVault,
            bids: marketBids,
            asks: marketAsks,
            eventQueue: marketEventQueue
        } = MARKET_STATE_LAYOUT_V3.decode(marketBufferInfo.data);

        const accountInfo_base = await connection.getAccountInfo(baseMint);
        // console.log("🚀 ~ txCreateNewPoolAndBundleBuy ~ accountInfo_base:", accountInfo_base)
        if (!accountInfo_base) return;
        const baseTokenProgramId = accountInfo_base.owner;
        const baseDecimals = unpackMint(
            baseMint,
            accountInfo_base,
            baseTokenProgramId
        ).decimals;
        // console.log("Base Decimals: ", baseDecimals);

        const accountInfo_quote = await connection.getAccountInfo(quoteMint);
        // console.log("🚀 ~ txCreateNewPoolAndBundleBuy ~ accountInfo_quote:", accountInfo_quote)
        if (!accountInfo_quote) return;
        const quoteTokenProgramId = accountInfo_quote.owner;
        const quoteDecimals = unpackMint(
            quoteMint,
            accountInfo_quote,
            quoteTokenProgramId
        ).decimals;
        // console.log("Quote Decimals: ", quoteDecimals);

        const associatedPoolKeys = Liquidity.getAssociatedPoolKeys({
            version: 4,
            marketVersion: 3,
            baseMint,
            quoteMint,
            baseDecimals,
            quoteDecimals,
            marketId: new PublicKey(data.marketId!),
            programId: programId.AmmV4,
            marketProgramId: programId.OPENBOOK_MARKET,
        });

        const addresses: PublicKey[] = []
        const poolKeys = await derivePoolKeys(associatedPoolKeys.id)
        addresses.push(...Object.values(poolKeys!).filter(value => value instanceof PublicKey))
        console.log("Number of addresses added from poolkeys: ", addresses.length)
        const addAddressesInstruction4 = AddressLookupTableProgram.extendLookupTable({
            payer: SIGNER_WALLET.publicKey,
            authority: SIGNER_WALLET.publicKey,
            lookupTable: LOOKUP_TABLE_ADDRESS,
            addresses: [...addresses, SIGNER_WALLET.publicKey],
        });
        await createAndSendV0Tx([addAddressesInstruction4]);
        console.log("Successfully added poolkeys addresses.")
        await sleep(10000)

        console.log("Lookup Table Address extended successfully!")
        cluster == "devnet" ? console.log(`Lookup Table Entries: `, `https://explorer.solana.com/address/${LOOKUP_TABLE_ADDRESS.toString()}/entries?cluster=devnet`)
            : console.log(`Lookup Table Entries: `, `https://explorer.solana.com/address/${LOOKUP_TABLE_ADDRESS.toString()}/entries`)
    }
    catch (err) {
        console.log("There is an error in adding addresses in LUT. Please retry it.")
        mainMenuWaiting()
        return;
    }
}

const createAtas = async (wallets: Keypair[], baseMint: PublicKey) => {
    try {
        let successTxNum = 0
        if (!swapSolAmount) {
            throw new Error("swapSolAmount is undefined");
        }
        wallets.map((async (wallet, i) => {
            await sleep(500 * i)
            const quoteAta = await getAssociatedTokenAddress(NATIVE_MINT, wallet.publicKey)
            const baseAta = await getAssociatedTokenAddress(baseMint, wallet.publicKey)

            const tx = new Transaction().add(
                ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 744_452 }),
                ComputeBudgetProgram.setComputeUnitLimit({ units: 1_183_504 }),
                createAssociatedTokenAccountIdempotentInstruction(
                    wallet.publicKey,
                    quoteAta,
                    wallet.publicKey,
                    NATIVE_MINT,
                ),
                createAssociatedTokenAccountIdempotentInstruction(
                    wallet.publicKey,
                    baseAta,
                    wallet.publicKey,
                    baseMint,
                ),
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: quoteAta,
                    lamports: Math.round(swapSolAmount[i] * LAMPORTS_PER_SOL)
                }),
                createSyncNativeInstruction(quoteAta, TOKEN_PROGRAM_ID),
            )
            const blockhash = (await connection.getLatestBlockhash())
            tx.feePayer = wallet.publicKey
            tx.recentBlockhash = blockhash.blockhash
            const sig = await connection.sendTransaction(tx, [wallet])
            // const sig = await sendAndConfirmTransaction(connection, tx, [wallet])
            const confirmation = await connection.confirmTransaction({
                signature: sig,
                blockhash: blockhash.blockhash,
                lastValidBlockHeight: blockhash.lastValidBlockHeight,
            })
            if (confirmation.value.err) {
                const blockhash = await connection.getLatestBlockhash()
                const sig = await connection.sendTransaction(tx, [wallet])
                const confirmation = await connection.confirmTransaction({
                    signature: sig,
                    blockhash: blockhash.blockhash,
                    lastValidBlockHeight: blockhash.lastValidBlockHeight,
                })
                if (confirmation.value.err) {
                    console.log("Error in create atas")
                    return
                } else {
                    successTxNum++
                    if (successTxNum === wallets.length) {
                        console.log("Ata creation finished")
                        return
                    }
                }
            } else {
                successTxNum++
                cluster == "devnet" ? console.log(`Wallet${i}'s ata preparation tx: `, `https://solscan.io/tx/${sig}?cluster=devnet`)
                    : console.log(`Wallet${i}'s ata preparation tx: `, `https://solscan.io/tx/${sig}`)
                if (successTxNum === wallets.length) {
                    console.log("Ata creation finished")
                    return
                }
            }
        }))
        console.log("Waiting for ata creation result")
        await sleep(30000)
        console.log("Successful ata creation for ", successTxNum, " wallets")
        if (successTxNum === wallets.length) {
            console.log("Ata creation finished")
            return
        } else {
            console.log(wallets.length - successTxNum, " tx failed, try again")
        }
    } catch (error) {
        console.log("Prepare Ata creation error:", error)
        return
    }
}

export const create_extend_lut_ata = async () => {

    const wallets = readBundlerWallets(bundlerWalletName)
    const walletKPs = wallets.map((wallet: string) => Keypair.fromSecretKey(bs58.decode(wallet)));
    const data = readJson()
    const mint = new PublicKey(data.mint!)


    console.log(wallets);
    console.log(walletKPs);
    console.log(data);
    console.log("mint", mint);


    try {
        console.log("Creating associated token accounts.")
        await createAtas(walletKPs, mint)

        console.log("Creating Address LookUpTable for our bundler.")
        await outputBalance(SIGNER_WALLET.publicKey)

        // Step 1 - Get a lookup table address and create lookup table instruction
        const lookupTableAddress = await createLUT()
        if (!lookupTableAddress) {
            console.log("Please retry creating Lookuptable.")
            mainMenuWaiting()
            return
        }

        saveLUTAddressToFile(lookupTableAddress.toBase58())
        await outputBalance(SIGNER_WALLET.publicKey)

        console.log("Extending Address LookUpTable for our bundler.")
        // Step 2 - Generate adding addresses transactions
        await addAddressesToTable(lookupTableAddress, mint)
        await outputBalance(SIGNER_WALLET.publicKey)

        mainMenuWaiting()
    } catch (err) {
        console.log("Error occurred in creating lookuptable. Please retry this again.")
        mainMenuWaiting()
    }

}