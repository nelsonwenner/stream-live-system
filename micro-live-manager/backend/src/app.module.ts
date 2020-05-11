import { RepositoriesModule } from './core/repositories/repositories.module';
import { LiveModule } from './core/live/live.module';
import * as ormOptions from './config/ormconfig';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    RepositoriesModule,
    LiveModule,
  ],
})

export class AppModule {}
