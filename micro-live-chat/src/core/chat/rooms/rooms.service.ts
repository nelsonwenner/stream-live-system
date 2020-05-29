import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { RepositoriesService } from '../../repositories/repositories.service';
import { ChatMessage } from '../../../database/models/chat.message.tdo';
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { ClientGrpc } from "@nestjs/microservices";
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Server, Socket } from "socket.io";
import { Inject } from "@nestjs/common";
import { Observable } from "rxjs";
import { promisify } from "util";

interface LiveRpc {
  validate(data): Observable<any>

  findOne(data): Observable<any>
}

@WebSocketGateway({namespace: 'room'})
export class RoomsService implements OnGatewayInit {

  @WebSocketServer()
  private server: Server;
  
  constructor(private repoService: RepositoriesService,
              @Inject('LIVE_PACKAGE') private liveRpc: ClientGrpc,
              private amqpConnection: AmqpConnection,
              private config: ConfigService) {}

  afterInit(instance: any) {
    const origins = this.config.get('SOCKET_IO_ALLOW_ORIGINS').split(',');
    const server = instance.server;
    server.origins(origins);
  }

  private static redisClient(client) {
    const redisClient = client.adapter.pubClient;
    const redisGet = promisify(redisClient.get).bind(redisClient);
    const redisSet = promisify(redisClient.set).bind(redisClient);
    return { redisGet, redisSet };
  }

  @SubscribeMessage('join')
  async onJoin(@ConnectedSocket() client: Socket, @MessageBody() data: ChatMessage) {

    try {
      
      const liveRpc: LiveRpc = this.liveRpc.getService('LiveService');
      const { user_name, email, password, room } = data;
      const { redisSet } = RoomsService.redisClient(client);

      if (password) {
        await liveRpc.validate({slug: room, password}).toPromise();
      }

      const live = await this.getLive(client, room);

      this.validateIsPending(live);

      client.join(room);
      console.log('Join: ', client.id);
      await redisSet(client.id, JSON.stringify({
        user_name, 
        email, 
        is_broadcaster: password !== undefined,
        live_slug: room
      }));

      const messages =  await this.repoService.chatRepository.find({
        where: {live_slug: room},
        order: {created_at: 'ASC'}
      });

      client.emit('get-messages', messages);

      console.log('Client joined!!')

    } catch (error) {
      console.error(error);
      this.disconnectClient(client, error);
    }
  }

  private async getLive(client: Socket, liveSlug) {
    const {redisGet, redisSet} = RoomsService.redisClient(client);

    try {

      const result = await redisGet(liveSlug);

      if (!result) {
        throw new Error('Live not found in redis')
      }

      return JSON.parse(result);
    } catch (e) {
      console.error(e);
      const service: LiveRpc = this.liveRpc.getService('LiveService');
      const live = await service.findOne({slug: liveSlug}).toPromise();
      await redisSet(liveSlug, JSON.stringify(live));
      return live;
    }
  }

  private validateIsPending(live) {
    if (!live || live.status !== 'pending') {
      throw new Error('Not authorized');
    }
  }

  disconnectClient(client: Socket, error: Error) {
    client.error({message: error.message, name: error.name});
    client.disconnect(true);
  }
}
