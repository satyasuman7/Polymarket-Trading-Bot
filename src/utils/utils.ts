import { Logger } from 'pino';
import fs from "fs";
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import { logger } from './logger';
import bs58 from 'bs58';
import {connection} from "../constants"
import dotenv from 'dotenv';
import * as path from 'path';
const relativeDotenvPath = "../../.env";

// Resolve the absolute path
const absoluteDotenvPath = path.resolve(__dirname, relativeDotenvPath);
dotenv.config({
  path: absoluteDotenvPath,
});
const log_path =  ""
export const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");


export async function getSPLTokenBalance(connection:Connection, tokenAccount:PublicKey, payerPubKey:PublicKey) {
  try{
  const address = getAssociatedTokenAddressSync(tokenAccount, payerPubKey);
  const info = await connection.getTokenAccountBalance(address, "processed");
  if (info.value.uiAmount == null) throw new Error("No balance found");
  return info.value.uiAmount;
  }catch(err:any){
      logger.error(`Errr when checking token balance...`)
  }
  return 0;
}
export function retrieveEnvVariable(variableName: string, logger: Logger){
  const variable = process.env[variableName] || '';
  if (!variable) {
    logger.error(`${variableName} is not set`);
    process.exit(1);
  }
  return variable;
}

export function getKeypairByJsonPath(jsonPath: string): any {
  try {
    const keypairJson = fs.readFileSync(jsonPath, "utf-8");
    const data = JSON.parse(keypairJson);
    const mintKeypair = Keypair.fromSecretKey(Uint8Array.from(data));
    return mintKeypair
  } catch (e) {
    console.log(e);
  }
}
export async function printSOLBalance  (
  connection: Connection,
  pubKey: PublicKey,
  info = ""
) {
  const balance = await connection.getBalance(pubKey);
  console.log(
    `${info ? info + " " : ""}${pubKey.toBase58()}:`,
    balance / LAMPORTS_PER_SOL,
    `SOL`
  );
};

export async function getSOLBalance(connection:Connection, pubKey:PublicKey){
  const balance = await connection.getBalance(pubKey);
  return balance / LAMPORTS_PER_SOL;
}

export async function getSPLBalance  (
  connection: Connection,
  mintAddress: PublicKey,
  pubKey: PublicKey,
  allowOffCurve = false
): Promise<number> {  
  try {
    let ata = getAssociatedTokenAddressSync(mintAddress, pubKey, allowOffCurve);
    const balance = await connection.getTokenAccountBalance(ata, "confirmed");
    return balance.value.uiAmount || 0;
  } catch (e) {}
  return 0;
};
export async function printSPLBalance (
  connection: Connection,
  mintAddress: PublicKey,
  user: PublicKey,
  info = ""
) {
  const balance = await getSPLBalance(connection, mintAddress, user);
  if (balance === null) {
    console.log(
      `${info ? info + " " : ""}${user.toBase58()}:`,
      "No Account Found"
    );
  } else {
    console.log(`${info ? info + " " : ""}${user.toBase58()}:`, balance);
  }
};
export async function retriveWalletState(wallet_address: string) {
  try{
  const filters = [
    {
      dataSize: 165, //size of account (bytes)
    },
    {
      memcmp: {
        offset: 32, //location of our query in the account (bytes)
        bytes: wallet_address, //our search criteria, a base58 encoded string
      },
    },
  ];
  const accounts = await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID, //new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
    { filters: filters }
  );
  let results = {};
  const solBalance = await connection.getBalance(new PublicKey(wallet_address));
  accounts.forEach((account, i) => {
    //Parse the account data
    const parsedAccountInfo = account.account.data;
    const mintAddress = parsedAccountInfo["parsed"]["info"]["mint"];
    const tokenBalance =
      parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
    results[mintAddress] = tokenBalance;
  });
  results["SOL"] = solBalance / 10 ** 9;
  return results || {};
}catch(e){
  console.log(e)
}
return {};
}

export async function getDecimals(mintAddress: PublicKey): Promise<number> {
  const info:any = await connection.getParsedAccountInfo(mintAddress);
  const result = (info.value?.data).parsed.info.decimals || 0;
  return result;
}

export async function writeLineToLogFile(logMessage:string){
  fs.appendFile(log_path, `${logMessage}\n`, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    } else {
      //console.log('Log message written successfully.');
    }
  });
}


async function main(){

}
// main()