import { Module } from '@nestjs/common';
import * as ormOptions from './config/ormconfig';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
  ],
})

export class AppModule {}
