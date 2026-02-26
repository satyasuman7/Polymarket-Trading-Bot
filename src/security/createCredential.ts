import { ApiKeyCreds, ClobClient, Chain } from "@polymarket/clob-client";
import { writeFileSync, existsSync, readFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { Wallet } from "@ethersproject/wallet";
import { config } from "../config";

export async function createCredential(): Promise<ApiKeyCreds | null> {
    const privateKey = config.privateKey;
    if (!privateKey) return (console.log(`[ERROR] PRIVATE_KEY not found`), null);

    // Check if credentials already exist
    // const credentialPath = resolve(process.cwd(), "src/data/credential.json");
    // if (existsSync(credentialPath)) {
    //     console.log(`[INFO] Credentials already exist. Returning existing credentials.`);
    //     return JSON.parse(readFileSync(credentialPath, "utf-8"));
    // }

    try {
        const wallet = new Wallet(privateKey);
        console.log(`[INFO] wallet address ${wallet.address}`);
        const chainId = (config.chainId || Chain.POLYGON) as Chain;
        const host = config.clobApiUrl;
        
        // Create temporary ClobClient just for credential creation
        const clobClient = new ClobClient(host, chainId, wallet);
        const credential = await clobClient.createOrDeriveApiKey();
        
        await saveCredential(credential);
        console.log(`[SUCCESS] Credential created successfully`);
        return credential;
    } catch (error) {
        console.log(`[ERROR] createCredential error`, error);
        console.log(`[ERROR] Error creating credential: ${error instanceof Error ? error.message : String(error)}`);
        return null;
    }
}   

export async function saveCredential(credential: ApiKeyCreds) {
    const credentialPath = resolve(process.cwd(), "src/data/credential.json");
    const credentialDir = dirname(credentialPath);
    
    // Create directory if it doesn't exist
    if (!existsSync(credentialDir)) {
        mkdirSync(credentialDir, { recursive: true });
    }
    
    writeFileSync(credentialPath, JSON.stringify(credential, null, 2));
}