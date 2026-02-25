import { AbiDecodingDataSizeTooSmallError, AbiEventSignatureEmptyTopicsError, AbiEventSignatureNotFoundError, DecodeLogDataMismatch, DecodeLogTopicsMismatch, } from '../../errors/abi.js';
import { PositionOutOfBoundsError } from '../../errors/cursor.js';
import { size } from '../data/size.js';
import { toEventSelector, } from '../hash/toEventSelector.js';
import { decodeAbiParameters, } from './decodeAbiParameters.js';
import { formatAbiItem } from './formatAbiItem.js';
const docsPath = '/docs/contract/decodeEventLog';
export function decodeEventLog(parameters) {
    const { abi, data, strict: strict_, topics, } = parameters;
    const strict = strict_ ?? true;
    const [signature, ...argTopics] = topics;
    if (!signature)
        throw new AbiEventSignatureEmptyTopicsError({ docsPath });
    const abiItem = abi.find((x) => x.type === 'event' &&
        signature === toEventSelector(formatAbiItem(x)));
    if (!(abiItem && 'name' in abiItem) || abiItem.type !== 'event')
        throw new AbiEventSignatureNotFoundError(signature, { docsPath });
    const { name, inputs } = abiItem;
    const isUnnamed = inputs?.some((x) => !('name' in x && x.name));
    const args = isUnnamed ? [] : {};
    // Decode topics (indexed args).
    const indexedInputs = inputs
        .map((x, i) => [x, i])
        .filter(([x]) => 'indexed' in x && x.indexed);
    const missingIndexedInputs = [];
    for (let i = 0; i < indexedInputs.length; i++) {
        const [param, argIndex] = indexedInputs[i];
        const topic = argTopics[i];
        if (!topic) {
            if (strict)
                throw new DecodeLogTopicsMismatch({
                    abiItem,
                    param: param,
                });
            // Track missing indexed inputs to decode from data when strict is false
            missingIndexedInputs.push([param, argIndex]);
            continue;
        }
        args[isUnnamed ? argIndex : param.name || argIndex] = decodeTopic({
            param,
            value: topic,
        });
    }
    // Decode data (non-indexed args + missing indexed args when strict is false).
    const nonIndexedInputs = inputs.filter((x) => !('indexed' in x && x.indexed));
    // When strict is false, missing indexed inputs should be decoded from data
    const inputsToDecode = strict
        ? nonIndexedInputs
        : [...missingIndexedInputs.map(([param]) => param), ...nonIndexedInputs];
    if (inputsToDecode.length > 0) {
        if (data && data !== '0x') {
            try {
                const decodedData = decodeAbiParameters(inputsToDecode, data);
                if (decodedData) {
                    let dataIndex = 0;
                    // First, assign missing indexed parameters (when strict is false)
                    if (!strict) {
                        for (const [param, argIndex] of missingIndexedInputs) {
                            args[isUnnamed ? argIndex : param.name || argIndex] =
                                decodedData[dataIndex++];
                        }
                    }
                    // Then, assign non-indexed parameters
                    if (isUnnamed) {
                        for (let i = 0; i < inputs.length; i++)
                            if (args[i] === undefined && dataIndex < decodedData.length)
                                args[i] = decodedData[dataIndex++];
                    }
                    else
                        for (let i = 0; i < nonIndexedInputs.length; i++)
                            args[nonIndexedInputs[i].name] = decodedData[dataIndex++];
                }
            }
            catch (err) {
                if (strict) {
                    if (err instanceof AbiDecodingDataSizeTooSmallError ||
                        err instanceof PositionOutOfBoundsError)
                        throw new DecodeLogDataMismatch({
                            abiItem,
                            data: data,
                            params: inputsToDecode,
                            size: size(data),
                        });
                    throw err;
                }
            }
        }
        else if (strict) {
            throw new DecodeLogDataMismatch({
                abiItem,
                data: '0x',
                params: inputsToDecode,
                size: 0,
            });
        }
    }
    return {
        eventName: name,
        args: Object.values(args).length > 0 ? args : undefined,
    };
}
function decodeTopic({ param, value }) {
    if (param.type === 'string' ||
        param.type === 'bytes' ||
        param.type === 'tuple' ||
        param.type.match(/^(.*)\[(\d+)?\]$/))
        return value;
    const decodedArg = decodeAbiParameters([param], value) || [];
    return decodedArg[0];
}
//# sourceMappingURL=decodeEventLog.js.map