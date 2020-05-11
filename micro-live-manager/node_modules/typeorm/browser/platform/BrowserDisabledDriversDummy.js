/**
 * Dummy driver classes for replacement via `package.json` in browser builds.
 * Using those classes reduces the build size by one third.
 *
 * If we don't include those dummy classes (and just disable the driver import
 * with `false` in `package.json`) typeorm will throw an error on runtime,
 * even if those driver are not used.
 */
/**
 * DO NOT IMPORT THIS CLASS -
 * This is a dummy class for replacement via `package.json` in browser builds
 */
var MongoDriver = /** @class */ (function () {
    function MongoDriver() {
    }
    return MongoDriver;
}());
export { MongoDriver };
/**
 * DO NOT IMPORT THIS CLASS -
 * This is a dummy class for replacement via `package.json` in browser builds
 */
var MongoQueryRunner = /** @class */ (function () {
    function MongoQueryRunner() {
    }
    return MongoQueryRunner;
}());
export { MongoQueryRunner };
/**
 * DO NOT IMPORT THIS CLASS -
 * This is a dummy class for replacement via `package.json` in browser builds
 */
var MongoEntityManager = /** @class */ (function () {
    function MongoEntityManager() {
    }
    return MongoEntityManager;
}());
export { MongoEntityManager };
/**
 * DO NOT IMPORT THIS CLASS -
 * This is a dummy class for replacement via `package.json` in browser builds
 */
var MongoRepository = /** @class */ (function () {
    function MongoRepository() {
    }
    return MongoRepository;
}());
export { MongoRepository };
/**
 * DO NOT IMPORT THIS CLASS -
 * This is a dummy class for replacement via `package.json` in browser builds
 */
var PostgresDriver = /** @class */ (function () {
    function PostgresDriver() {
    }
    return PostgresDriver;
}());
export { PostgresDriver };
/**
 * DO NOT IMPORT THIS CLASS -
 * This is a dummy class for replacement via `package.json` in browser builds
 */
var SqlServerDriver = /** @class */ (function () {
    function SqlServerDriver() {
    }
    return SqlServerDriver;
}());
export { SqlServerDriver };
/**
 * DO NOT IMPORT THIS CLASS -
 * This is a dummy class for replacement via `package.json` in browser builds
 */
var SapDriver = /** @class */ (function () {
    function SapDriver() {
    }
    return SapDriver;
}());
export { SapDriver };
/**
 * DO NOT IMPORT THIS CLASS -
 * This is a dummy class for replacement via `package.json` in browser builds
 */
var MysqlDriver = /** @class */ (function () {
    function MysqlDriver() {
    }
    return MysqlDriver;
}());
export { MysqlDriver };
/**
 * DO NOT IMPORT THIS CLASS -
 * This is a dummy class for replacement via `package.json` in browser builds
 */
var OracleDriver = /** @class */ (function () {
    function OracleDriver() {
    }
    return OracleDriver;
}());
export { OracleDriver };

//# sourceMappingURL=BrowserDisabledDriversDummy.js.map
