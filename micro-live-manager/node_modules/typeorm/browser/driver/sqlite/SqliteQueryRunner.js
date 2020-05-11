import * as tslib_1 from "tslib";
import { QueryRunnerAlreadyReleasedError } from "../../error/QueryRunnerAlreadyReleasedError";
import { QueryFailedError } from "../../error/QueryFailedError";
import { AbstractSqliteQueryRunner } from "../sqlite-abstract/AbstractSqliteQueryRunner";
import { Broadcaster } from "../../subscriber/Broadcaster";
/**
 * Runs queries on a single sqlite database connection.
 *
 * Does not support compose primary keys with autoincrement field.
 * todo: need to throw exception for this case.
 */
var SqliteQueryRunner = /** @class */ (function (_super) {
    tslib_1.__extends(SqliteQueryRunner, _super);
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function SqliteQueryRunner(driver) {
        var _this = _super.call(this) || this;
        _this.driver = driver;
        _this.connection = driver.connection;
        _this.broadcaster = new Broadcaster(_this);
        return _this;
    }
    /**
     * Executes a given SQL query.
     */
    SqliteQueryRunner.prototype.query = function (query, parameters) {
        var _this = this;
        if (this.isReleased)
            throw new QueryRunnerAlreadyReleasedError();
        var connection = this.driver.connection;
        return new Promise(function (ok, fail) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var handler, databaseConnection, queryStartTime, isInsertQuery;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handler = function (err, result) {
                            // log slow queries if maxQueryExecution time is set
                            var maxQueryExecutionTime = connection.options.maxQueryExecutionTime;
                            var queryEndTime = +new Date();
                            var queryExecutionTime = queryEndTime - queryStartTime;
                            if (maxQueryExecutionTime && queryExecutionTime > maxQueryExecutionTime)
                                connection.logger.logQuerySlow(queryExecutionTime, query, parameters, this);
                            if (err) {
                                connection.logger.logQueryError(err, query, parameters, this);
                                fail(new QueryFailedError(query, parameters, err));
                            }
                            else {
                                ok(isInsertQuery ? this["lastID"] : result);
                            }
                        };
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        databaseConnection = _a.sent();
                        this.driver.connection.logger.logQuery(query, parameters, this);
                        queryStartTime = +new Date();
                        isInsertQuery = query.substr(0, 11) === "INSERT INTO";
                        if (isInsertQuery) {
                            databaseConnection.run(query, parameters, handler);
                        }
                        else {
                            databaseConnection.all(query, parameters, handler);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return SqliteQueryRunner;
}(AbstractSqliteQueryRunner));
export { SqliteQueryRunner };

//# sourceMappingURL=SqliteQueryRunner.js.map
