"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TypeOrmModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const entities_metadata_storage_1 = require("./entities-metadata.storage");
const typeorm_core_module_1 = require("./typeorm-core.module");
const typeorm_constants_1 = require("./typeorm.constants");
const typeorm_providers_1 = require("./typeorm.providers");
let TypeOrmModule = TypeOrmModule_1 = class TypeOrmModule {
    static forRoot(options) {
        return {
            module: TypeOrmModule_1,
            imports: [typeorm_core_module_1.TypeOrmCoreModule.forRoot(options)],
        };
    }
    static forFeature(entities = [], connection = typeorm_constants_1.DEFAULT_CONNECTION_NAME) {
        const providers = typeorm_providers_1.createTypeOrmProviders(entities, connection);
        entities_metadata_storage_1.EntitiesMetadataStorage.addEntitiesByConnection(connection, entities);
        return {
            module: TypeOrmModule_1,
            providers: providers,
            exports: providers,
        };
    }
    static forRootAsync(options) {
        return {
            module: TypeOrmModule_1,
            imports: [typeorm_core_module_1.TypeOrmCoreModule.forRootAsync(options)],
        };
    }
};
TypeOrmModule = TypeOrmModule_1 = __decorate([
    common_1.Module({})
], TypeOrmModule);
exports.TypeOrmModule = TypeOrmModule;
