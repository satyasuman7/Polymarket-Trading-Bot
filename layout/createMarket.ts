import { Keypair, PublicKey } from "@solana/web3.js"
import base58 from "bs58"

import { tokens } from "../settings"
import { createMarket } from "../src/createMarket"
import { mainMenuWaiting, outputBalance, readJson, retrieveEnvVariable, saveDataToFile, sleep } from "../src/utils"
import { PoolInfo, UserToken } from '../src/types'
import {
  getWalletTokenAccount,
} from "../src/get_balance";
import { init } from ".."

type WalletTokenAccounts = Awaited<ReturnType<typeof getWalletTokenAccount>>

const recoveryMode = retrieveEnvVariable("RECOVERY_MODE") == "true"

const execute = async (token: UserToken) => {
  let params: PoolInfo
  try {
    // contact with savant-cat
  } catch (error) {
    console.log("Error happened in one of the token flow", error)
    await sleep(3000)
  }
}

export const create_market = async () => {
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    console.log(`Market ${i + 1} is to be created`)
    await execute(token)
    console.log("One Market process is ended, and go for next one")
    mainMenuWaiting()
  }
}
