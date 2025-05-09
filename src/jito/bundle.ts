import { 
    Connection,
    PublicKey, 
    Keypair, 
    VersionedTransaction, 
    MessageV0,
    LAMPORTS_PER_SOL
  } 
  from '@solana/web3.js';
  import { Bundle } from './types';
  import { searcherClient } from 'jito-ts/dist/sdk/block-engine/searcher';
  import {
  ChannelCredentials,
  ChannelOptions,
  ClientReadableStream,
  ServiceError,
  } from '@grpc/grpc-js';
  import { SearcherServiceClient } from 'jito-ts/dist/gen/block-engine/searcher'
  import {SearcherClient} from "./searcher-client";
  import {JITO_TIPS, connection, wsol}from "../constants";
  import { logger, writeLineToLogFile } from '../utils';
  import { onBundleResult} from "./utils"
  const blockEngineUrl = process.env.BLOCK_ENGINE_URL || '';
  logger.info(`BLOCK_ENGINE_URL: ${blockEngineUrl}`);


  export const searcherClientAdv = (
    url: string,
    authKeypair: Keypair | undefined,
    grpcOptions?: Partial<ChannelOptions>
  ): SearcherServiceClient => {
  const client: SearcherServiceClient = new SearcherServiceClient(
    url,
    ChannelCredentials.createSsl(),
    { ...grpcOptions }
  );
  
  return client;
  }

  // build a searcher client
  const searcher_client:any = searcherClientAdv(blockEngineUrl, undefined,   {
    "grpc.max_receive_message_length": 64 * 1024 * 1024, // 64MiB
  });

  // construct a searcher bot
  const searcher_bot =  new SearcherClient(searcher_client);
  // Get Tip Accounts
  let tipAccounts: string[] = [];
  (async () => {
    tipAccounts = await searcher_bot.getTipAccounts();
  })();
  
  // Send bundle to Jito
  export async function sendBundle(isSell: boolean, latestBlockhash: string, transaction: VersionedTransaction, poolId: PublicKey, masterKeypair: Keypair) {
  
  try {
    const _tipAccount = tipAccounts[Math.floor(Math.random() * 6)];
    const tipAccount = new PublicKey(_tipAccount);
    const b:Bundle = new Bundle([transaction], 4);
    let jito_tips = 0.0001
    b.addTipTx(
      masterKeypair,
      jito_tips*LAMPORTS_PER_SOL,    
      tipAccount,
      latestBlockhash
    );
    logger.info(
      {
        status:`sending bundle.`
      }
    )
    const uuid = await searcher_bot.sendBundle(b);
    logger.info(
      {
        dexscreener:`https://dexscreener.com/solana/${poolId.toBase58()}?maker=${masterKeypair.publicKey.toBase58()}`
      }
    );
    return uuid;
  }catch (error) {
      logger.error(`error sending bundle: ${error}`);
      
    } 
    return ""; 
  
  }
  
  
