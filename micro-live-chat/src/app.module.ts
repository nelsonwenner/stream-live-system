import { Module } from '@nestjs/common';
import * as ormOptions from './config/ormconfig';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatModule } from './core/chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    ChatModule
  ],
})

export class AppModule {}
