import { Program } from "@coral-xyz/anchor";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import {PumpSwap, IDL} from "./IDL";
import { connection } from "./constants";
const PUMP_AMM_PROGRAM_ID: PublicKey = new PublicKey('pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA');
const WSOL_TOKEN_ACCOUNT: PublicKey = new PublicKey('So11111111111111111111111111111111111111112');
const program = new Program(IDL, {
    connection,
  });

  interface Pool {
    address: PublicKey;
    is_native_base: boolean;
    poolData: any;
}

interface PoolWithPrice extends Pool {
    price: number;
    reserves: {
        native: number;
        token: number;
    }
}

const getPoolsWithBaseMint = async (mintAddress: PublicKey) => {
    const response = await connection.getProgramAccounts(PUMP_AMM_PROGRAM_ID, {
        filters: [
            { "dataSize": 211 },
            {
              "memcmp": {
                "offset": 43,
                "bytes": mintAddress.toBase58()
              }
            }
          ]
        }
    )

    const mappedPools = response.map((pool) => {
        const data = Buffer.from(pool.account.data);
        const poolData = program.coder.accounts.decode('pool', data);
        return {
            address: pool.pubkey,
            is_native_base: false,
            poolData
        };
    })

    return mappedPools;
}

const getPoolsWithQuoteMint = async (mintAddress: PublicKey) => {
    const response = await connection.getProgramAccounts(PUMP_AMM_PROGRAM_ID, {
        filters: [
            { "dataSize": 211 },
            {
              "memcmp": {
                "offset": 75,
                "bytes": mintAddress.toBase58()
              }
            }
          ]
        }
    )

    const mappedPools = response.map((pool) => {
        const data = Buffer.from(pool.account.data);
        const poolData = program.coder.accounts.decode('pool', data);
        return {
            address: pool.pubkey,
            is_native_base: true,
            poolData
        };
    })

    return mappedPools;
}

const getPoolsWithBaseMintQuoteWSOL = async (mintAddress: PublicKey) => {
    const response = await connection.getProgramAccounts(PUMP_AMM_PROGRAM_ID, {
        filters: [
            { "dataSize": 211 },
            {
              "memcmp": {
                "offset": 43,
                "bytes": mintAddress.toBase58()
              }
            },
            {
                "memcmp": {
                  "offset": 75,
                  "bytes": WSOL_TOKEN_ACCOUNT.toBase58()
                }
            }
          ]
        }
    )

    const mappedPools = response.map((pool) => {
        const data = Buffer.from(pool.account.data);
        const poolData = program.coder.accounts.decode('pool', data);
        return {
            address: pool.pubkey,
            is_native_base: true,
            poolData
        };
    })

    return mappedPools;
}

const getPriceAndLiquidity = async (pool: Pool) => {
    const wsolAddress = pool.poolData.poolQuoteTokenAccount;
    const tokenAddress = pool.poolData.poolBaseTokenAccount;
   
    const wsolBalance = await connection.getTokenAccountBalance(wsolAddress);
    const tokenBalance = await connection.getTokenAccountBalance(tokenAddress);

    const price = wsolBalance.value.uiAmount! / tokenBalance.value.uiAmount!;

    return {
        ...pool,
        price,
        reserves: {
            native: wsolBalance.value.uiAmount!,
            token: tokenBalance.value.uiAmount!
        }
    } as PoolWithPrice;
}
const getPoolsWithPrices = async (mintAddress: PublicKey) => {
    const [poolsWithBaseMint, poolsWithQuoteMint] = await Promise.all([
        getPoolsWithBaseMint(mintAddress),
        getPoolsWithQuoteMint(mintAddress)
    ])
    //const poolsWithBaseMinQuoteWSOL = await getPoolsWithBaseMintQuoteWSOL(mintAddress)
    const pools = [...poolsWithBaseMint, ...poolsWithQuoteMint];

    const results = await Promise.all(pools.map(getPriceAndLiquidity));

    const sortedByHighestLiquidity = results.sort((a, b) => b.reserves.native - a.reserves.native);

    return sortedByHighestLiquidity;
}
export const calculateWithSlippageBuy = (
    amount: bigint,
    basisPoints: bigint
  ) => {
    return amount - (amount * basisPoints) / 10000n;
  };
export const getBuyTokenAmount = async (solAmount: bigint, mint:PublicKey) => {
    const pool_detail = await getPoolsWithPrices(mint);
    const sol_reserve = BigInt(pool_detail[0].reserves.native *LAMPORTS_PER_SOL);
    const token_reserve = BigInt(pool_detail[0].reserves.token * 10**6);
    const product = sol_reserve * token_reserve;
    let new_sol_reserve = sol_reserve + solAmount;
    let new_token_reserve = product / new_sol_reserve + 1n;
    let amount_to_be_purchased = token_reserve - new_token_reserve;

    return amount_to_be_purchased;
}

export const getPumpSwapPool = async (mint:PublicKey) => {
    const pools = await getPoolsWithBaseMintQuoteWSOL(mint);
    return pools[0].address;
}

export const getPrice = async (mint:PublicKey) => {
    const pools = await getPoolsWithPrices(mint)
    return pools[0].price;
}
async function main(){
    const mint = new PublicKey("");   
    // console.log(await getBuyTokenAmount(BigInt(0.1*LAMPORTS_PER_SOL), mint));
    // console.log(await getPumpSwapPool(mint))
    console.log(await getPrice(mint));

}
// main();