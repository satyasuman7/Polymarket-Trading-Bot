"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalance = getBalance;
const abis_js_1 = require("../../constants/abis.js");
const decodeFunctionResult_js_1 = require("../../utils/abi/decodeFunctionResult.js");
const encodeFunctionData_js_1 = require("../../utils/abi/encodeFunctionData.js");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
const getAction_js_1 = require("../../utils/getAction.js");
const call_js_1 = require("./call.js");
async function getBalance(client, { address, blockNumber, blockTag = client.experimental_blockTag ?? 'latest', }) {
    if (client.batch?.multicall && client.chain?.contracts?.multicall3) {
        const multicall3Address = client.chain.contracts.multicall3.address;
        const calldata = (0, encodeFunctionData_js_1.encodeFunctionData)({
            abi: abis_js_1.multicall3Abi,
            functionName: 'getEthBalance',
            args: [address],
        });
        const { data } = await (0, getAction_js_1.getAction)(client, call_js_1.call, 'call')({
            to: multicall3Address,
            data: calldata,
            blockNumber,
            blockTag,
        });
        return (0, decodeFunctionResult_js_1.decodeFunctionResult)({
            abi: abis_js_1.multicall3Abi,
            functionName: 'getEthBalance',
            args: [address],
            data: data || '0x',
        });
    }
    const blockNumberHex = typeof blockNumber === 'bigint' ? (0, toHex_js_1.numberToHex)(blockNumber) : undefined;
    const balance = await client.request({
        method: 'eth_getBalance',
        params: [address, blockNumberHex || blockTag],
    });
    return BigInt(balance);
}
//# sourceMappingURL=getBalance.js.map