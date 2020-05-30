import { RedisIoAdapter } from './core/redis-io-adapter/redis.io.adapter';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
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
    origin: function (origin, callback) {
      if (!origin) { throw new Error('Origin undefined') }
      const ALLOW_ORIGINS = process.env.SOCKET_IO_ALLOW_ORIGINS;
      const originNormalized = origin.split(':').length === 2? `${origin}:80`: origin;
      const hasOrigin = ALLOW_ORIGINS.split(',').indexOf(originNormalized) !== -1;
      hasOrigin || ALLOW_ORIGINS === '*:*'
        ? callback(null, true)
        : callback(new Error('Not allowed by CORS'));
    }
};

  const expressAPP = express();
  const server = http.createServer(expressAPP);
  expressAPP.use(cors(corsOptions));

  const peerServer = ExpressPeerServer(server)
  expressAPP.use(peerServer);

  server.listen(process.env.PEER_SERVER_PORT, () => {
    Logger.log(`Server Peer running on http://localhost:${process.env.PEER_SERVER_PORT}`, 'Bootstrap');
  })

  peerServer.on('connection', (client) => {
    console.log(`[X] Client connected on peer server: ${client}`);
  });
}

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  app.setGlobalPrefix('api');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: process.env.GRPC_SERVER_URL,
      package: 'live',
      protoPath: process.cwd() + "/src/core/shared/proto/live.proto",
    },
  });
    
  await app.startAllMicroservicesAsync();

  await app.listen(process.env.SERVER_PORT, () => {
    Logger.log(`Server running on http://localhost:${process.env.SERVER_PORT}`, 'Bootstrap');
  });

  await createPeerServer();
}

bootstrap();
