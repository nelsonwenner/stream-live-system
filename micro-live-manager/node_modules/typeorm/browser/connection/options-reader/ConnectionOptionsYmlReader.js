import { PlatformTools } from "../../platform/PlatformTools";
/**
 * Reads connection options defined in the yml file.
 */
var ConnectionOptionsYmlReader = /** @class */ (function () {
    function ConnectionOptionsYmlReader() {
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Reads connection options from given yml file.
     */
    ConnectionOptionsYmlReader.prototype.read = function (path) {
        var ymlParser = PlatformTools.load("js-yaml");
        var config = ymlParser.safeLoad(PlatformTools.readFileSync(path));
        return Object.keys(config).map(function (connectionName) {
            return Object.assign({ name: connectionName }, config[connectionName]);
        });
    };
    return ConnectionOptionsYmlReader;
}());
export { ConnectionOptionsYmlReader };

//# sourceMappingURL=ConnectionOptionsYmlReader.js.map
