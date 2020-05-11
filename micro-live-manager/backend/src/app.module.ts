import { RepositoriesModule } from './core/repositories/repositories.module';
import { LiveModule } from './core/live/live.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    LiveModule,
    RepositoriesModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
