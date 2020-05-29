import { ChatMessageEntity } from '../../database/entities/chat.message.entity';
import { RepositoriesService } from './repositories.service';
import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([ChatMessageEntity]),
  ], 
  providers: [
    RepositoriesService
  ],
  exports: [
    RepositoriesService
  ]
})

export class RepositoriesModule {}
