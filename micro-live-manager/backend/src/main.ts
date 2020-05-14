import { RedisIoAdapter } from './core/redis-io-adapter/redis.io.adapter';
const { ExpressPeerServer } = require('peer');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import express = require('express');
import http = require('http');
import cors = require('cors');
import 'dotenv/config';

const createPeerServer = async () => {
  const corsOptions = {
    origin: (origin, callback) => {
      const ALLOW_ORIGINS = process.env.SOCKET_IO_ALLOW_ORIGINS;
      const originNormalized = origin.split(':').length === 2 ? `${origin}:80` : origin;
      const hasOrigin = ALLOW_ORIGINS.split(',').indexOf(originNormalized);
      hasOrigin || ALLOW_ORIGINS === '*:*'
        ? callback(null, true)
        : callback(new Error('Not allowed by CORS'));
    }
  }

  const expressAPP = express();
  const server = http.createServer(expressAPP);
  expressAPP.use(cors(corsOptions));

  const peerServer = ExpressPeerServer(server);
  expressAPP.use(peerServer);

  server.listen(process.env.PEER_SERVER_PORT, () => {
    Logger.log(`Server Peer running on http://localhost:${process.env.PEER_SERVER_PORT}`, 'Bootstrap');
  })
}

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  app.setGlobalPrefix('api');
  
  await app.listen(process.env.SERVER_PORT, () => {
    Logger.log(`Server running on http://localhost:${process.env.SERVER_PORT}`, 'Bootstrap');
  });

  await createPeerServer();
}

bootstrap();
