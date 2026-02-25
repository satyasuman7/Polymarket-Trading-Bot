export var Side;
(function (Side) {
    Side["BUY"] = "BUY";
    Side["SELL"] = "SELL";
})(Side || (Side = {}));
export var OrderType;
(function (OrderType) {
    OrderType["GTC"] = "GTC";
    OrderType["FOK"] = "FOK";
    OrderType["GTD"] = "GTD";
    OrderType["FAK"] = "FAK";
})(OrderType || (OrderType = {}));
export var Chain;
(function (Chain) {
    Chain[Chain["POLYGON"] = 137] = "POLYGON";
    Chain[Chain["AMOY"] = 80002] = "AMOY";
})(Chain || (Chain = {}));
export var PriceHistoryInterval;
(function (PriceHistoryInterval) {
    PriceHistoryInterval["MAX"] = "max";
    PriceHistoryInterval["ONE_WEEK"] = "1w";
    PriceHistoryInterval["ONE_DAY"] = "1d";
    PriceHistoryInterval["SIX_HOURS"] = "6h";
    PriceHistoryInterval["ONE_HOUR"] = "1h";
})(PriceHistoryInterval || (PriceHistoryInterval = {}));
export var AssetType;
(function (AssetType) {
    AssetType["COLLATERAL"] = "COLLATERAL";
    AssetType["CONDITIONAL"] = "CONDITIONAL";
})(AssetType || (AssetType = {}));
export var RfqMatchType;
(function (RfqMatchType) {
    RfqMatchType["COMPLEMENTARY"] = "COMPLEMENTARY";
    RfqMatchType["MERGE"] = "MERGE";
    RfqMatchType["MINT"] = "MINT";
})(RfqMatchType || (RfqMatchType = {}));
//# sourceMappingURL=types.js.map