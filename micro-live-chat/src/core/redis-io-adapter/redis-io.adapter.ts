import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';
import 'dotenv/config';

const redisAdapter = redisIoAdapter({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT)
});

export class RedisIoAdapter extends IoAdapter {
  
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.adapter(redisAdapter);
    return server;
  }
}