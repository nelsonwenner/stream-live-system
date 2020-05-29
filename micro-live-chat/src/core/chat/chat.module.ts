import { SaveChatMessageService } from './save-chat-message/save-chat-message.service';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { RoomsService } from './rooms/rooms.service';
import { Module } from '@nestjs/common';
import { join } from "path";
import 'dotenv/config';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: () => ({
        uri: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:5672`,
        exchanges: [
          {name: 'chat-message', type: 'fanout'}
        ]
      }),
    }),
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(ClientsModule.register([
          {
            name: 'LIVE_PACKAGE',
            transport: Transport.GRPC,
            options: {
              url: process.env.MICRO_LIVE_GENERATOR_GRPC_URL,
              package: 'live',
              protoPath: join(__dirname, '../../shared/proto/live.proto')
            },
          },
        ]))
      }, 500)
  })
  ],
  providers: [
    RoomsService,
    SaveChatMessageService
  ]
})

export class ChatModule {}
