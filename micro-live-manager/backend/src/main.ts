import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import 'dotenv/config';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.setGlobalPrefix('api');
  
  await app.listen(process.env.SERVER_PORT);
  Logger.log(`Server running on http://localhost:${process.env.SERVER_PORT}`, 'Bootstrap');
}

bootstrap();
