
import { Bundle } from 'jito-ts/dist/sdk/block-engine/types';
import { SearcherClient, searcherClient } from 'jito-ts/dist/sdk/block-engine/searcher';
import { logger } from '../utils/logger';
import { VersionedTransaction } from '@solana/web3.js';
import { Meta, Packet } from './packet';
import {writeLineToLogFile} from "../utils"

export async function onBundleResult(c: SearcherClient){
    c.onBundleResult(
        (result) => {
            logger.info(`received bundle result: ${result}`);
            console.log(result);
            //writeLineToLogFile(`received bundle result: ${result}`);
        },
        (e) => {
            logger.error(`received error ${e} when listening the bundle result`);
            //writeLineToLogFile(`received error ${e} when listening the bundle result`);
        }
    )
}
export const serializeTransactions = (
    txs: VersionedTransaction[]
  ): Packet[] => {
    return txs.map(tx => {
      const data = tx.serialize();
  
      return {
        data,
        meta: {
          port: 0,
          addr: '0.0.0.0',
          senderStake: 0,
          size: data.length,
          flags: undefined,
        } as Meta,
      } as Packet;
    });
  };