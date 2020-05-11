import { DynamicModule, OnApplicationShutdown } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from './interfaces/typeorm-options.interface';
export declare class TypeOrmCoreModule implements OnApplicationShutdown {
    private readonly options;
    private readonly moduleRef;
    constructor(options: TypeOrmModuleOptions, moduleRef: ModuleRef);
    static forRoot(options?: TypeOrmModuleOptions): DynamicModule;
    static forRootAsync(options: TypeOrmModuleAsyncOptions): DynamicModule;
    onApplicationShutdown(): Promise<void>;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
    private static createEntityManagerProvider;
    private static createConnectionFactory;
}
