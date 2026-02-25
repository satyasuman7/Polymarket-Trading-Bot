"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fund = fund;
exports.fundSync = fundSync;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const waitForTransactionReceipt_js_1 = require("../../actions/public/waitForTransactionReceipt.js");
async function fund(client, parameters) {
    const account = (0, parseAccount_js_1.parseAccount)(parameters.account);
    return client.request({
        method: 'tempo_fundAddress',
        params: [account.address],
    });
}
async function fundSync(client, parameters) {
    const { timeout = 10_000 } = parameters;
    const account = (0, parseAccount_js_1.parseAccount)(parameters.account);
    const hashes = await client.request({
        method: 'tempo_fundAddress',
        params: [account.address],
    });
    const receipts = await Promise.all(hashes.map((hash) => (0, waitForTransactionReceipt_js_1.waitForTransactionReceipt)(client, {
        hash,
        checkReplacement: false,
        timeout,
    })));
    return receipts;
}
//# sourceMappingURL=faucet.js.map