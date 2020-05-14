import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayInit {

  @WebSocketServer() socket: Server;

  afterInit(server: any) {
    Logger.log("Socket Initialized!", 'Socket')
  }

  @SubscribeMessage('msg_to_server')
  handleMessage(client: Socket, payload: string): any {
    this.socket.emit('msg_to_client', payload)
    //return {event: 'msg_to_client', data: 'Hello world!'};
  }
}
