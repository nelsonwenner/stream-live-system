import * as tslib_1 from "tslib";
/**
 * Thrown when consumer specifies driver type that does not exist or supported.
 */
var MissingDriverError = /** @class */ (function (_super) {
    tslib_1.__extends(MissingDriverError, _super);
    function MissingDriverError(driverType) {
        var _this = _super.call(this) || this;
        _this.name = "MissingDriverError";
        Object.setPrototypeOf(_this, MissingDriverError.prototype);
        _this.message = "Wrong driver: \"" + driverType + "\" given. Supported drivers are: \"cordova\", \"expo\", \"mariadb\", \"mongodb\", \"mssql\", \"mysql\", \"oracle\", \"postgres\", \"sqlite\", \"sqljs\", \"react-native\".";
        return _this;
    }
    return MissingDriverError;
}(Error));
export { MissingDriverError };

//# sourceMappingURL=MissingDriverError.js.map
