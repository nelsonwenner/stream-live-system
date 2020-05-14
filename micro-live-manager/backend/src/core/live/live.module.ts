import { LiveSocketService } from './socket/live.socket.service';
import { LiveController } from './live.controller';
import { LiveService } from './live.service';
import {ConfigService} from "@nestjs/config";
import { Module } from '@nestjs/common';

@Module({
  controllers: [LiveController],
  providers: [
    LiveService,
    LiveSocketService,
    ConfigService
  ]
})
export class LiveModule {}
