import { RepositoriesModule } from './core/repositories/repositories.module';
import { ChatModule } from './core/chat/chat.module';
import * as ormOptions from './config/ormconfig';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    RepositoriesModule,
    ChatModule
  ],
})

export class AppModule {}
