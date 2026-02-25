"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateOperatorFee = estimateOperatorFee;
const estimateGas_js_1 = require("../../actions/public/estimateGas.js");
const readContract_js_1 = require("../../actions/public/readContract.js");
const getChainContractAddress_js_1 = require("../../utils/chain/getChainContractAddress.js");
const abis_js_1 = require("../abis.js");
const contracts_js_1 = require("../contracts.js");
async function estimateOperatorFee(client, args) {
    const { chain = client.chain, l1BlockAddress: l1BlockAddress_ } = args;
    const l1BlockAddress = (() => {
        if (l1BlockAddress_)
            return l1BlockAddress_;
        if (chain?.contracts?.l1Block)
            return (0, getChainContractAddress_js_1.getChainContractAddress)({
                chain,
                contract: 'l1Block',
            });
        return contracts_js_1.contracts.l1Block.address;
    })();
    try {
        const [operatorFeeScalar, operatorFeeConstant] = await Promise.all([
            (0, readContract_js_1.readContract)(client, {
                abi: abis_js_1.l1BlockAbi,
                address: l1BlockAddress,
                functionName: 'operatorFeeScalar',
            }),
            (0, readContract_js_1.readContract)(client, {
                abi: abis_js_1.l1BlockAbi,
                address: l1BlockAddress,
                functionName: 'operatorFeeConstant',
            }),
        ]);
        const gasUsed = await (0, estimateGas_js_1.estimateGas)(client, args);
        const scaledFee = (gasUsed * BigInt(operatorFeeScalar)) / 1000000n;
        return scaledFee + BigInt(operatorFeeConstant);
    }
    catch {
        return 0n;
    }
}
//# sourceMappingURL=estimateOperatorFee.js.map