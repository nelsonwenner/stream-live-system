import * as tslib_1 from "tslib";
/**
 */
var QueryRunnerAlreadyReleasedError = /** @class */ (function (_super) {
    tslib_1.__extends(QueryRunnerAlreadyReleasedError, _super);
    function QueryRunnerAlreadyReleasedError() {
        var _this = _super.call(this) || this;
        _this.name = "QueryRunnerAlreadyReleasedError";
        Object.setPrototypeOf(_this, QueryRunnerAlreadyReleasedError.prototype);
        _this.message = "Query runner already released. Cannot run queries anymore.";
        return _this;
    }
    return QueryRunnerAlreadyReleasedError;
}(Error));
export { QueryRunnerAlreadyReleasedError };

//# sourceMappingURL=QueryRunnerAlreadyReleasedError.js.map
