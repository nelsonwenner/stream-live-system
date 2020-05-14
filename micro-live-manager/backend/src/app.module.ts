import { RepositoriesModule } from './core/repositories/repositories.module';
import { HttpErrorFilter } from './core/shared/http.error.filter';
import { LiveModule } from './core/live/live.module';
import * as ormOptions from './config/ormconfig';
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    RepositoriesModule,
    LiveModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
  ]
})

export class AppModule {}
