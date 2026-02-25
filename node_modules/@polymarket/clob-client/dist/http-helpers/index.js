/* eslint-disable max-depth */
import axios from "axios";
import { isBrowser } from "browser-or-node";
export const GET = "GET";
export const POST = "POST";
export const DELETE = "DELETE";
export const PUT = "PUT";
const overloadHeaders = (method, headers) => {
    if (isBrowser) {
        return;
    }
    if (!headers || typeof headers === undefined) {
        headers = {};
    }
    if (headers) {
        headers["User-Agent"] = `@polymarket/clob-client`;
        headers["Accept"] = "*/*";
        headers["Connection"] = "keep-alive";
        headers["Content-Type"] = "application/json";
        if (method === GET) {
            headers["Accept-Encoding"] = "gzip";
        }
    }
};
export const request = async (endpoint, method, headers, data, params) => {
    overloadHeaders(method, headers);
    return await axios({ method, url: endpoint, headers, data, params });
};
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
const isTransientAxiosError = (err) => {
    if (!axios.isAxiosError(err))
        return false;
    if (!err.response)
        return true; // network error
    const status = err.response.status ?? 0;
    if (status >= 500 && status < 600)
        return true; // 5xx
    const code = (err.code ?? "").toString();
    return ["ECONNABORTED", "ENETUNREACH", "EAI_AGAIN", "ETIMEDOUT"].includes(code);
};
export const post = async (endpoint, options, retryOnError) => {
    try {
        const resp = await request(endpoint, POST, options?.headers, options?.data, options?.params);
        return resp.data;
    }
    catch (err) {
        if (retryOnError && isTransientAxiosError(err)) {
            console.log("[CLOB Client] transient error, retrying once after 30 ms");
            await sleep(30);
            try {
                const resp = await request(endpoint, POST, options?.headers, options?.data, options?.params);
                return resp.data;
            }
            catch (retryErr) {
                return errorHandling(retryErr);
            }
        }
        return errorHandling(err);
    }
};
export const get = async (endpoint, options) => {
    try {
        const resp = await request(endpoint, GET, options?.headers, options?.data, options?.params);
        return resp.data;
    }
    catch (err) {
        return errorHandling(err);
    }
};
export const del = async (endpoint, options) => {
    try {
        const resp = await request(endpoint, DELETE, options?.headers, options?.data, options?.params);
        return resp.data;
    }
    catch (err) {
        return errorHandling(err);
    }
};
export const put = async (endpoint, options) => {
    try {
        const resp = await request(endpoint, PUT, options?.headers, options?.data, options?.params);
        return resp.data;
    }
    catch (err) {
        return errorHandling(err);
    }
};
const errorHandling = (err) => {
    if (axios.isAxiosError(err)) {
        if (err.response) {
            console.error("[CLOB Client] request error", JSON.stringify({
                status: err.response?.status,
                statusText: err.response?.statusText,
                data: err.response?.data,
                config: err.response?.config,
            }));
            if (err.response?.data) {
                if (typeof err.response?.data === "string" ||
                    err.response?.data instanceof String) {
                    return { error: err.response?.data, status: err.response?.status };
                }
                if (!Object.prototype.hasOwnProperty.call(err.response?.data, "error")) {
                    return { error: err.response?.data, status: err.response?.status };
                }
                // in this case the field 'error' is included
                return { ...err.response?.data, status: err.response?.status };
            }
        }
        if (err.message) {
            console.error("[CLOB Client] request error", JSON.stringify({
                error: err.message,
            }));
            return { error: err.message };
        }
    }
    console.error("[CLOB Client] request error", err);
    return { error: err };
};
export const parseOrdersScoringParams = (orderScoringParams) => {
    const params = {};
    if (orderScoringParams !== undefined) {
        if (orderScoringParams.orderIds !== undefined) {
            params["order_ids"] = orderScoringParams?.orderIds.join(",");
        }
    }
    return params;
};
export const parseDropNotificationParams = (dropNotificationParams) => {
    const params = {};
    if (dropNotificationParams !== undefined) {
        if (dropNotificationParams.ids !== undefined) {
            params["ids"] = dropNotificationParams?.ids.join(",");
        }
    }
    return params;
};
export const parseRfqQuotesParams = (rfqQuotesParams) => {
    if (!rfqQuotesParams)
        return {};
    const params = { ...rfqQuotesParams };
    // Convert array fields to comma-separated strings
    if (rfqQuotesParams.quoteIds) {
        params.quoteIds = rfqQuotesParams.quoteIds.join(",");
    }
    if (rfqQuotesParams.markets) {
        params.markets = rfqQuotesParams.markets.join(",");
    }
    if (rfqQuotesParams.requestIds) {
        params.requestIds = rfqQuotesParams.requestIds.join(",");
    }
    return params;
};
export const parseRfqRequestsParams = (rfqRequestsParams) => {
    if (!rfqRequestsParams)
        return {};
    const params = { ...rfqRequestsParams };
    // Convert array fields to comma-separated strings
    if (rfqRequestsParams.requestIds) {
        params.requestIds = rfqRequestsParams.requestIds.join(",");
    }
    if (rfqRequestsParams.markets) {
        params.markets = rfqRequestsParams.markets.join(",");
    }
    return params;
};
//# sourceMappingURL=index.js.map