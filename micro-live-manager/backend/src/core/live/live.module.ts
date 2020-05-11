import { Module } from '@nestjs/common';
import { LiveController } from './live.controller';
import { LiveService } from './live.service';

@Module({
  controllers: [LiveController],
  providers: [LiveService]
})
export class LiveModule {}
