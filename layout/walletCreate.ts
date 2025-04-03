import { ComputeBudgetProgram, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionInstruction, TransactionMessage, VersionedTransaction, Connection } from "@solana/web3.js";
import { newSendToken } from "../src/sendBulkToken";
import { Data, mainMenuWaiting, readBundlerWallets, readJson, saveBundlerWalletsToFile, saveHolderWalletsToFile, sleep } from "../src/utils";
import { connection } from "../config";
import { LP_wallet_private_key, bundlerWalletName, bundleWalletNum, needNewWallets } from "../settings"
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import bs58 from 'bs58'
import { screen_clear } from "../menu/menu";
import { execute } from "../src/legacy";
import { wallet1, wallet2, wallet3, wallet4, wallet5, wallet6, wallet7, wallet8, wallet9, wallet10, wallet11, wallet12, wallet13, wallet14, wallet15, wallet16, wallet17, wallet18, wallet19, wallet20, wallet21, quote_Mint_amount } from "../settings"
const walletNum = bundleWalletNum
export const wallet_create = async () => {
  screen_clear()
  console.log(`Creating ${walletNum} Wallets for bundle buy`);

  let wallets: string[] = []
  let swapSolAmount = calcWalletSol()
  console.log("swapSolAmount=======================>", swapSolAmount);
  if (needNewWallets) {
    // Step 1 - creating bundler wallets
    try {
      console.log(LP_wallet_private_key);
      wallets.push(LP_wallet_private_key);
      for (let i = 0; i < (bundleWalletNum - 1); i++) {
        const newWallet = Keypair.generate()
        wallets.push(bs58.encode(newWallet.secretKey))
      }
      saveBundlerWalletsToFile(
        wallets, bundlerWalletName
      )

      await sleep(2000)
    } catch (error) { console.log(error) }
    console.log("🚀 ~ Bundler wallets: ", wallets)
  }

  const savedWallets = readBundlerWallets(bundlerWalletName)
  // console.log("🚀 ~ savedWallets: ", savedWallets)

  // Step 2 - distributing sol to bundler wallets
  console.log("Distributing sol to bundler wallets...")

  const walletKPs = savedWallets.map((wallet: string) => Keypair.fromSecretKey(bs58.decode(wallet)));
  const data = readJson()
  const LP_wallet_keypair = Keypair.fromSecretKey(bs58.decode(data.mainKp!))

  // 20 wallets sol airdrop transaction
  try {
    let walletIndex = 1;
    const sendSolTx: TransactionInstruction[] = []
    sendSolTx.push(
      ComputeBudgetProgram.setComputeUnitLimit({ units: 100_000 }),
      ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 250_000 })
    )
    for (let j = 0; j < (bundleWalletNum - 1); j++) {
      if (!swapSolAmount) {
        throw new Error("swapSolAmount is undefined");
      }
      let solAmount = swapSolAmount[walletIndex] * 10;
      console.log(walletIndex);
      console.log(swapSolAmount[walletIndex]);
      console.log(walletKPs[walletIndex].publicKey);
      sendSolTx.push(
        SystemProgram.transfer({
          fromPubkey: LP_wallet_keypair.publicKey,
          toPubkey: walletKPs[walletIndex].publicKey,
          lamports: Math.round((solAmount + 0.01) * LAMPORTS_PER_SOL)
        })
      )
      walletIndex++;
    }

    let index = 0
    while (true) {
      try {
        if (index > 3) {
          console.log("Error in distribution")
          return null
        }
        const siTx = new Transaction().add(...sendSolTx)
        const latestBlockhash = await connection.getLatestBlockhash()
        siTx.feePayer = LP_wallet_keypair.publicKey
        siTx.recentBlockhash = latestBlockhash.blockhash

        console.log(await connection.simulateTransaction(siTx))
        const messageV0 = new TransactionMessage({
          payerKey: LP_wallet_keypair.publicKey,
          recentBlockhash: latestBlockhash.blockhash,
          instructions: sendSolTx,
        }).compileToV0Message()
        const transaction = new VersionedTransaction(messageV0)
        transaction.sign([LP_wallet_keypair])
        const txSig = await execute(transaction, latestBlockhash, 1)
        const tokenBuyTx = txSig ? `https://solscan.io/tx/${txSig}` : ''
        console.log("SOL distributed ", tokenBuyTx)
        break
      } catch (error) {
        index++
      }
    }

    console.log("Successfully distributed sol to bundler wallets!")
  } catch (error) {
    console.log("Failed to transfer SOL", error)
  }

  mainMenuWaiting()
}


export const calcWalletSol = () => {

  let wallet1SwapSol = Math.floor((((quote_Mint_amount * 10 ** 9) / ((100 - wallet1) * 10 ** 7)) - (quote_Mint_amount * 10 ** 9 / (10 ** 9 - 0))) * 10 ** 7) / (10 ** 7);
  let wallet2SwapSol = Math.floor((((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2) * 10 ** 7)) - ((quote_Mint_amount * 10 ** 9) / ((100 - wallet1) * 10 ** 7))) * 10 ** 7) / (10 ** 7);

  let wallet3SwapSol = Math.floor((((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3) * 10 ** 7)) - ((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2) * 10 ** 7))) * 10 ** 7) / (10 ** 7);

  let wallet4SwapSol = Math.floor((((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4) * 10 ** 7)) - ((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3) * 10 ** 7))) * 10 ** 7) / (10 ** 7);

  let wallet5SwapSol = Math.floor((((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5) * 10 ** 7)) - ((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4) * 10 ** 7))) * 10 ** 7) / (10 ** 7);

  let wallet6SwapSol = Math.floor((((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6) * 10 ** 7)) - ((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5) * 10 ** 7))) * 10 ** 7) / (10 ** 7);

  let wallet7SwapSol = Math.floor((((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7) * 10 ** 7)) - ((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6) * 10 ** 7))) * 10 ** 7) / (10 ** 7);

  let wallet8SwapSol = Math.floor((((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8) * 10 ** 7)) - ((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7) * 10 ** 7))) * 10 ** 7) / (10 ** 7);

  let wallet9SwapSol = Math.floor((((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9) * 10 ** 7)) - ((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8) * 10 ** 7))) * 10 ** 7) / (10 ** 7);

  let wallet10SwapSol = Math.floor((((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10) * 10 ** 7)) - ((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9) * 10 ** 7))) * 10 ** 7) / (10 ** 7);

  let wallet11SwapSol = Math.floor((((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10 - wallet11) * 10 ** 7)) - ((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10) * 10 ** 7))) * 10 ** 7) / (10 ** 7);


  let wallet12SwapSol = Math.floor((((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10 - wallet11 - wallet12) * 10 ** 7)) - ((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10 - wallet11) * 10 ** 7))) * 10 ** 7) / (10 ** 7);

  let wallet13SwapSol = Math.floor((((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10 - wallet11 - wallet12 - wallet13) * 10 ** 7)) - ((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10 - wallet11 - wallet12) * 10 ** 7))) * 10 ** 7) / (10 ** 7);

  let wallet14SwapSol = Math.floor((((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10 - wallet11 - wallet12 - wallet13 - wallet14) * 10 ** 7)) - ((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10 - wallet11 - wallet12 - wallet13) * 10 ** 7))) * 10 ** 7) / (10 ** 7);

  let wallet15SwapSol = Math.floor((((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10 - wallet11 - wallet12 - wallet13 - wallet14 - wallet15) * 10 ** 7)) - ((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10 - wallet11 - wallet12 - wallet13 - wallet14) * 10 ** 7))) * 10 ** 7) / (10 ** 7);

  let wallet16SwapSol = Math.floor((((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10 - wallet11 - wallet12 - wallet13 - wallet14 - wallet15 - wallet16) * 10 ** 7)) - ((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10 - wallet11 - wallet12 - wallet13 - wallet14 - wallet15) * 10 ** 7))) * 10 ** 7) / (10 ** 7);

  let wallet17SwapSol = Math.floor((((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10 - wallet11 - wallet12 - wallet13 - wallet14 - wallet15 - wallet16 - wallet17) * 10 ** 7)) - ((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10 - wallet11 - wallet12 - wallet13 - wallet14 - wallet15 - wallet16) * 10 ** 7))) * 10 ** 7) / (10 ** 7);

  let wallet18SwapSol = Math.floor((((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10 - wallet11 - wallet12 - wallet13 - wallet14 - wallet15 - wallet16 - wallet17 - wallet18) * 10 ** 7)) - ((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10 - wallet11 - wallet12 - wallet13 - wallet14 - wallet15 - wallet16 - wallet17) * 10 ** 7))) * 10 ** 7) / (10 ** 7);

  let wallet19SwapSol = Math.floor((((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10 - wallet11 - wallet12 - wallet13 - wallet14 - wallet15 - wallet16 - wallet17 - wallet18 - wallet19) * 10 ** 7)) - ((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10 - wallet11 - wallet12 - wallet13 - wallet14 - wallet15 - wallet16 - wallet17 - wallet18) * 10 ** 7))) * 10 ** 7) / (10 ** 7);

  let wallet20SwapSol = Math.floor((((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10 - wallet11 - wallet12 - wallet13 - wallet14 - wallet15 - wallet16 - wallet17 - wallet18 - wallet19 - wallet20) * 10 ** 7)) - ((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10 - wallet11 - wallet12 - wallet13 - wallet14 - wallet15 - wallet16 - wallet17 - wallet18 - wallet19) * 10 ** 7))) * 10 ** 7) / (10 ** 7);

  let wallet21SwapSol = Math.floor((((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10 - wallet11 - wallet12 - wallet13 - wallet14 - wallet15 - wallet16 - wallet17 - wallet18 - wallet19 - wallet20 - wallet21) * 10 ** 7)) - ((quote_Mint_amount * 10 ** 9) / ((100 - wallet1 - wallet2 - wallet3 - wallet4 - wallet5 - wallet6 - wallet7 - wallet8 - wallet9 - wallet10 - wallet11 - wallet12 - wallet13 - wallet14 - wallet15 - wallet16 - wallet17 - wallet18 - wallet19 - wallet20) * 10 ** 7))) * 10 ** 7) / (10 ** 7);
  let walletSwapSol: number[] = [wallet1SwapSol, wallet2SwapSol, wallet3SwapSol, wallet4SwapSol, wallet5SwapSol, wallet6SwapSol, wallet7SwapSol, wallet8SwapSol, wallet9SwapSol, wallet10SwapSol, wallet11SwapSol, wallet12SwapSol, wallet13SwapSol, wallet14SwapSol, wallet15SwapSol, wallet16SwapSol, wallet17SwapSol, wallet18SwapSol, wallet19SwapSol, wallet20SwapSol, wallet21SwapSol]

  if ((wallet1SwapSol + wallet2SwapSol + wallet3SwapSol + wallet4SwapSol + wallet5SwapSol + wallet6SwapSol + wallet7SwapSol + wallet8SwapSol + wallet9SwapSol + wallet10SwapSol + wallet11SwapSol + wallet12SwapSol + wallet13SwapSol + wallet14SwapSol + wallet15SwapSol + wallet16SwapSol + wallet17SwapSol + wallet18SwapSol + wallet19SwapSol + wallet20SwapSol + wallet21SwapSol) >= 100) {
    console.log("Total token percent of 21 wallets over 100%.");

  } else {

    return walletSwapSol;
  }

}