import { LiveEntity } from '../../database/entities/live.entity';
import { RepositoriesService } from './repositories.service';
import { Module, Global } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([LiveEntity]),
  ], 
  providers: [
    RepositoriesService
  ],
  exports: [
    RepositoriesService
  ]
})
export class RepositoriesModule {}
