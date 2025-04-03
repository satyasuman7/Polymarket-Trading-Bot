import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import { UserToken } from './src/types';

// **************************************************** //
// ***************   SETTINGS   *********************** //
// **************************************************** //
// SD, You should set following values before you run the program.

// settings about token you are going to Mint
export const tokens: UserToken[] = [
  {
    name: 'Hello',
    symbol: 'Hello',
    decimals: 9,
    description: "Hello, World!",
    uiAmount: 10 ** 9,
    image: "./src/images/1.jpg",
    extensions: {
      website: "https://www.soldev.app/",
      twitter: "https://x.com/mklrwt013",
      telegram: "https://t.me/Tiffanystones"
    },
    tags: [
      "Meme",
      "Tokenization"
    ],
    creator: {
      name: "",
      site: "https://www.soldev.app/"
    }
  }
]

// Main wallet to create token and pool, and so on
export const LP_wallet_private_key = "5Fpf8MX9MGWrgMNTDjR2XtuVAWSj5FKBa5tEZSGbW4o5vWU1aTqjbDjhzBtiubarqhVryw6jok6tyEoingDavpL9";
export const LP_wallet_keypair = Keypair.fromSecretKey(new Uint8Array(bs58.decode(LP_wallet_private_key)));

// amount of baseToken to put into the pool (0.5 is 50%, 1 is 100%)
export const input_baseMint_tokens_percentage = 1 //ABC-Mint amount of tokens you want to add in Lp e.g. 1 = 100%. 0.9= 90%


// defalut amount of Sol to bundle buy with wallets (0.01 is 0.01sol)
export const defaltSwapSolAmount = 0.001

// number of wallets in each transaction
export const batchSize = 7

// number of wallets to bundle buy
export const bundleWalletNum = batchSize * 3

// name of file to save bundler wallets
export const bundlerWalletName = "wallets"

// percent of LP tokens to burn
export const burnLpQuantityPercent = 70   // 70 is 70% of total lp token supply

// whether you distribute the sol to existing wallets or new wallets
export const needNewWallets = true
// amount of Sol to put into the Pool as liquidity
export let quote_Mint_amount = 1; //COIN-SOL, amount of SOL u want to add to Pool amount
//each wallet token percent
export const wallet1 = 12
export const wallet2 = 1
export const wallet3 = 1.45
export const wallet4 = 1
export const wallet5 = 2.1
export const wallet6 = 1.4
export const wallet7 = 2.1
export const wallet8 = 1.15
export const wallet9 = 1.3
export const wallet10 = 1.5
export const wallet11 = 1.26
export const wallet12 = 1.6
export const wallet13 = 0.9
export const wallet14 = 0.98
export const wallet15 = 1.23
export const wallet16 = 1.12
export const wallet17 = 1.13
export const wallet18 = 1.24
export const wallet19 = 1.25
export const wallet20 = 1.32
export const wallet21 = 1.11
