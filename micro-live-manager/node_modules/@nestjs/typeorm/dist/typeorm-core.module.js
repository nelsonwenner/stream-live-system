"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var TypeOrmCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const rxjs_1 = require("rxjs");
const typeorm_1 = require("typeorm");
const typeorm_utils_1 = require("./common/typeorm.utils");
const entities_metadata_storage_1 = require("./entities-metadata.storage");
const typeorm_constants_1 = require("./typeorm.constants");
let TypeOrmCoreModule = TypeOrmCoreModule_1 = class TypeOrmCoreModule {
    constructor(options, moduleRef) {
        this.options = options;
        this.moduleRef = moduleRef;
    }
    static forRoot(options = {}) {
        const typeOrmModuleOptions = {
            provide: typeorm_constants_1.TYPEORM_MODULE_OPTIONS,
            useValue: options,
        };
        const connectionProvider = {
            provide: typeorm_utils_1.getConnectionToken(options),
            useFactory: () => __awaiter(this, void 0, void 0, function* () { return yield this.createConnectionFactory(options); }),
        };
        const entityManagerProvider = this.createEntityManagerProvider(options);
        return {
            module: TypeOrmCoreModule_1,
            providers: [
                entityManagerProvider,
                connectionProvider,
                typeOrmModuleOptions,
            ],
            exports: [entityManagerProvider, connectionProvider],
        };
    }
    static forRootAsync(options) {
        const connectionProvider = {
            provide: typeorm_utils_1.getConnectionToken(options),
            useFactory: (typeOrmOptions) => __awaiter(this, void 0, void 0, function* () {
                if (options.name) {
                    return yield this.createConnectionFactory(Object.assign(Object.assign({}, typeOrmOptions), { name: options.name }));
                }
                return yield this.createConnectionFactory(typeOrmOptions);
            }),
            inject: [typeorm_constants_1.TYPEORM_MODULE_OPTIONS],
        };
        const entityManagerProvider = {
            provide: typeorm_utils_1.getEntityManagerToken(options),
            useFactory: (connection) => connection.manager,
            inject: [typeorm_utils_1.getConnectionToken(options)],
        };
        const asyncProviders = this.createAsyncProviders(options);
        return {
            module: TypeOrmCoreModule_1,
            imports: options.imports,
            providers: [
                ...asyncProviders,
                entityManagerProvider,
                connectionProvider,
                {
                    provide: typeorm_constants_1.TYPEORM_MODULE_ID,
                    useValue: typeorm_utils_1.generateString(),
                },
            ],
            exports: [entityManagerProvider, connectionProvider],
        };
    }
    onApplicationShutdown() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.options.keepConnectionAlive) {
                return;
            }
            const connection = this.moduleRef.get(typeorm_utils_1.getConnectionToken(this.options));
            connection && (yield connection.close());
        });
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        const useClass = options.useClass;
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: useClass,
                useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: typeorm_constants_1.TYPEORM_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const inject = [
            (options.useClass || options.useExisting),
        ];
        return {
            provide: typeorm_constants_1.TYPEORM_MODULE_OPTIONS,
            useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () { return yield optionsFactory.createTypeOrmOptions(options.name); }),
            inject,
        };
    }
    static createEntityManagerProvider(options) {
        return {
            provide: typeorm_utils_1.getEntityManagerToken(options),
            useFactory: (connection) => connection.manager,
            inject: [typeorm_utils_1.getConnectionToken(options)],
        };
    }
    static createConnectionFactory(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (options.keepConnectionAlive) {
                    const connectionName = typeorm_utils_1.getConnectionName(options);
                    const manager = typeorm_1.getConnectionManager();
                    if (manager.has(connectionName)) {
                        const connection = manager.get(connectionName);
                        if (connection.isConnected) {
                            return connection;
                        }
                    }
                }
            }
            catch (_a) { }
            return yield rxjs_1.defer(() => {
                if (!options.type) {
                    return typeorm_1.createConnection();
                }
                if (!options.autoLoadEntities) {
                    return typeorm_1.createConnection(options);
                }
                const connectionToken = options.name || typeorm_constants_1.DEFAULT_CONNECTION_NAME;
                let entities = options.entities;
                if (entities) {
                    entities = entities.concat(entities_metadata_storage_1.EntitiesMetadataStorage.getEntitiesByConnection(connectionToken));
                }
                else {
                    entities = entities_metadata_storage_1.EntitiesMetadataStorage.getEntitiesByConnection(connectionToken);
                }
                return typeorm_1.createConnection(Object.assign(Object.assign({}, options), { entities }));
            })
                .pipe(typeorm_utils_1.handleRetry(options.retryAttempts, options.retryDelay))
                .toPromise();
        });
    }
};
TypeOrmCoreModule = TypeOrmCoreModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({}),
    __param(0, common_1.Inject(typeorm_constants_1.TYPEORM_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object, core_1.ModuleRef])
], TypeOrmCoreModule);
exports.TypeOrmCoreModule = TypeOrmCoreModule;
