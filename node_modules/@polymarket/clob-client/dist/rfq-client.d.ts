import type { CreateOrderOptions, RfqUserOrder, RfqUserQuote, CancelRfqQuoteParams, GetRfqQuotesParams, GetRfqBestQuoteParams, CancelRfqRequestParams, AcceptQuoteParams, ApproveOrderParams, GetRfqRequestsParams, RfqRequestsResponse, RfqQuotesResponse, RfqRequestResponse, RfqQuoteResponse, RfqQuote } from "./types.ts";
import type { IRfqClient, RfqDeps } from "./rfq-deps.ts";
/**
 * RfqClient provides RFQ (Request for Quote) functionality on top of a CLOB client.
 */
export declare class RfqClient implements IRfqClient {
    private readonly deps;
    constructor(deps: RfqDeps);
    /**
     * Creates and posts an RFQ request from user order parameters.
     * Converts the order into the proper RFQ request format with asset amounts and submits it.
     */
    createRfqRequest(userOrder: RfqUserOrder, options?: Partial<CreateOrderOptions>): Promise<RfqRequestResponse>;
    /**
     * Cancels an existing RFQ request
     */
    cancelRfqRequest(request: CancelRfqRequestParams): Promise<"OK">;
    /**
     * Gets RFQ requests with optional filtering parameters
     */
    getRfqRequests(params?: GetRfqRequestsParams): Promise<RfqRequestsResponse>;
    /**
     * Creates a quote in response to an RFQ request.
     * Converts user-friendly parameters into the proper RFQ quote format with asset amounts and submits it.
     */
    createRfqQuote(userQuote: RfqUserQuote, options?: Partial<CreateOrderOptions>): Promise<RfqQuoteResponse>;
    /**
     * Gets quotes on requests created by the authenticated user (requester view).
     * Returns quotes that others have made on your requests.
     */
    getRfqRequesterQuotes(params?: GetRfqQuotesParams): Promise<RfqQuotesResponse>;
    /**
     * Gets quotes created by the authenticated user (quoter view).
     * Returns quotes that you have made on others' requests.
     */
    getRfqQuoterQuotes(params?: GetRfqQuotesParams): Promise<RfqQuotesResponse>;
    /**
     * Gets the best quote for a given request ID
     */
    getRfqBestQuote(params?: GetRfqBestQuoteParams): Promise<RfqQuote>;
    /**
     * Cancels an existing quote
     */
    cancelRfqQuote(quote: CancelRfqQuoteParams): Promise<"OK">;
    /**
     * Gets the RFQ configuration from the server
     */
    rfqConfig(): Promise<any>;
    /**
     * Accepts a quote and creates an order (taker side)
     * This fetches the request details, creates an order, and submits the acceptance
     */
    acceptRfqQuote(payload: AcceptQuoteParams): Promise<"OK">;
    /**
     * Approves a quote and creates an order (maker side)
     * This fetches the quote details, creates an order, and submits the approval
     */
    approveRfqOrder(payload: ApproveOrderParams): Promise<"OK">;
    /**
     * Ensures L2 authentication is available for RFQ endpoints.
     */
    protected ensureL2Auth(): void;
    private getRequestOrderCreationPayload;
}
