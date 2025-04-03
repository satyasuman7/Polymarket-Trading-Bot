# solana-raydium-bundler
solana raydium bundler: raydium jito bundler bundling on raydium. It bundles buy/sell to 20 wallets. It uses jito for bundling. This missed some essential parts, so if you need full code or want guide / custom requirements, ping me on telegram[https://t.me/SavantCat].

## Core functions
### Create Keypairs
This step is crucial if you want to ensure that there is no SOL in the wallets. It is not necessary for every launch but is recommended for initial setups or resets.

### Premarket
This is a multi-step process that needs to be done in a specific order:
1. **Execution Order:** Complete all steps from 2 to 6 in sequence.
2. **Bundle ID Check:** After each step, verify the Bundle ID to ensure it has landed correctly.
3. **Retry if Needed:** If the bundle does not land, increase the tip and retry. Exit if necessary.
4. **Verification:** Use the [Jito Block Explorer](https://explorer.jito.wtf/) to check if the bundle landed. Ignore the "Landed - no" indicator; instead, check if the first included transaction is confirmed.

### Create Pool
Creating a pool might require multiple attempts:
- **Spam the Function:** If the pool creation does not land on the first try, spam the function.
- **Increase the Tip:** A tip of 0.1 SOL or more is recommended for better chances of landing within the first few tries.

### Sell Features
Once the pool is live, you have two options for selling:
1. **Sell All Keypairs at Once (Step 4):** Use this step to sell all keypairs simultaneously and reclaim WSOL in Step 7 of Premarket (Step 2) after rugging.
2. **Sell in Percentages (Step 5):** You can sell small percentages of the supply on demand. This involves sending a specified percentage of every keypair's token balance to the fee payers, then selling it all in one singular bundle on one wallet.

### LP Remove
Removing LP is straightforward:
- **Non-Burn Removal:** If you do not burn your LP, it will simply be removed.

