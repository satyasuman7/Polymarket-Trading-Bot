import type { Method } from "axios";
import type { DropNotificationParams, GetRfqQuotesParams, GetRfqRequestsParams, OrdersScoringParams, SimpleHeaders } from "../types.ts";
export declare const GET = "GET";
export declare const POST = "POST";
export declare const DELETE = "DELETE";
export declare const PUT = "PUT";
export declare const request: (endpoint: string, method: Method, headers?: SimpleHeaders, data?: any, params?: any) => Promise<any>;
export type QueryParams = Record<string, any>;
export interface RequestOptions {
    headers?: SimpleHeaders;
    data?: any;
    params?: QueryParams;
}
export declare const post: (endpoint: string, options?: RequestOptions, retryOnError?: boolean) => Promise<any>;
export declare const get: (endpoint: string, options?: RequestOptions) => Promise<any>;
export declare const del: (endpoint: string, options?: RequestOptions) => Promise<any>;
export declare const put: (endpoint: string, options?: RequestOptions) => Promise<any>;
export declare const parseOrdersScoringParams: (orderScoringParams?: OrdersScoringParams) => QueryParams;
export declare const parseDropNotificationParams: (dropNotificationParams?: DropNotificationParams) => QueryParams;
export declare const parseRfqQuotesParams: (rfqQuotesParams?: GetRfqQuotesParams) => QueryParams;
export declare const parseRfqRequestsParams: (rfqRequestsParams?: GetRfqRequestsParams) => QueryParams;
