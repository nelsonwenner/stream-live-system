import * as tslib_1 from "tslib";
/**
 */
var MetadataWithSuchNameAlreadyExistsError = /** @class */ (function (_super) {
    tslib_1.__extends(MetadataWithSuchNameAlreadyExistsError, _super);
    function MetadataWithSuchNameAlreadyExistsError(metadataType, name) {
        var _this = _super.call(this) || this;
        _this.name = "MetadataWithSuchNameAlreadyExistsError";
        Object.setPrototypeOf(_this, MetadataWithSuchNameAlreadyExistsError.prototype);
        _this.message = metadataType + " metadata with such name " + name + " already exists. " +
            "Do you apply decorator twice? Or maybe try to change a name?";
        return _this;
    }
    return MetadataWithSuchNameAlreadyExistsError;
}(Error));
export { MetadataWithSuchNameAlreadyExistsError };

//# sourceMappingURL=MetadataWithSuchNameAlreadyExistsError.js.map
