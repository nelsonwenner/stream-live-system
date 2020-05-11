import * as tslib_1 from "tslib";
import { Connection } from "../../connection/Connection";
/**
 * Organizes communication with MySQL DBMS.
 */
var AuroraDataApiConnection = /** @class */ (function (_super) {
    tslib_1.__extends(AuroraDataApiConnection, _super);
    function AuroraDataApiConnection(options, queryRunner) {
        var _this = _super.call(this, options) || this;
        _this.queryRunnter = queryRunner;
        return _this;
    }
    AuroraDataApiConnection.prototype.createQueryRunner = function (mode) {
        if (mode === void 0) { mode = "master"; }
        return this.queryRunnter;
    };
    return AuroraDataApiConnection;
}(Connection));
export { AuroraDataApiConnection };

//# sourceMappingURL=AuroraDataApiConnection.js.map
