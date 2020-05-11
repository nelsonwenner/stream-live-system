import * as tslib_1 from "tslib";
import { EntitySchema } from "../index";
/**
 * Thrown when repository for the given class is not found.
 */
var RepositoryNotTreeError = /** @class */ (function (_super) {
    tslib_1.__extends(RepositoryNotTreeError, _super);
    function RepositoryNotTreeError(target) {
        var _this = _super.call(this) || this;
        _this.name = "RepositoryNotTreeError";
        Object.setPrototypeOf(_this, RepositoryNotTreeError.prototype);
        var targetName;
        if (target instanceof EntitySchema) {
            targetName = target.options.name;
        }
        else if (typeof target === "function") {
            targetName = target.name;
        }
        else {
            targetName = target;
        }
        _this.message = "Repository of the \"" + targetName + "\" class is not a TreeRepository. Try to apply @Tree decorator on your entity.";
        return _this;
    }
    return RepositoryNotTreeError;
}(Error));
export { RepositoryNotTreeError };

//# sourceMappingURL=RepositoryNotTreeError.js.map
