import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { RepositoriesService } from '../../repositories/repositories.service';
import { LiveStatus } from '../../../database/entities/live.entity';
import { SlugOTG } from '../../../database/models/live.tdo';
import { ConfigService } from '@nestjs/config';
import { Socket, Server } from 'socket.io';
import { promisify } from 'util';

@WebSocketGateway({namespace: 'live'})
export class LiveSocketService implements OnGatewayInit {

  @WebSocketServer() socket: Server;

  constructor(private repoLive: RepositoriesService,
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
  async onJoin(@ConnectedSocket() client: Socket, @MessageBody() data: SlugOTG) {

    try {
      const { slug, password, isBroadcaster } = data;
      const { redisGet, redisSet } = LiveSocketService.redisClient(client);
      
      if (isBroadcaster) {
        await this.validadeBroadcast(slug, password);
      }

      client.join(slug);

      console.log(`\n[X] join: ${client.id}`);

      await redisSet(client.id, slug);

      const client_id = await redisGet(slug);

      client.emit('get-broadcaster', {peer_id: client_id});
      
      const countUsers = this.getUsersConnected(client, slug);

      client.emit('count-users', countUsers);

      this.socket.to(slug).emit('authorization', {socket: client.id, auth: true});

      client.broadcast.to(slug).emit('count-users', countUsers);

      console.log(`[X] Client joined!!`);

    } catch (error) {
      console.error(error);
      client.error({message: error.message, name: error.name});
    }
  }

  @SubscribeMessage('leave')
  async onExit(@ConnectedSocket() client: Socket) {

    try {
      const { redisGet } = LiveSocketService.redisClient(client);
      const slug = await redisGet(client.id);

      if (!slug) {
        throw new Error('Not authorized');
      }

      this.validadeView(slug);

      client.leave(slug);

      client.broadcast.to(slug).emit('count-users', this.getUsersConnected(client, slug));

      client.disconnect(true);
      console.log(`[X] Exit ${client.id}`);

    } catch (error) {
      console.error(error);
      client.error({message: error.message, name: error.name});
    }
  }

  @SubscribeMessage('set-broadcaster')
  async setBroadcaster(@ConnectedSocket() client: Socket, @MessageBody() data: {client_id: string, password: string}) {

    try {
      
      const { redisGet, redisSet  } = LiveSocketService.redisClient(client);
      const slug = await redisGet(client.id);
      
      if (!slug) {
        throw new Error('Not authorized');
      }

      await this.validadeBroadcast(slug, data.password);

      await redisSet(slug, data.client_id);

      client.broadcast.to(slug).emit('get-broadcaster', {client_id: data.client_id});

    } catch (error) {
      console.error(error);
      client.error({message: error.message, name: error.name});
    }
  }

  @SubscribeMessage('finish-live')
  async getFinishLive(@ConnectedSocket() client: Socket, @MessageBody() data: {password: string}) {

    try {
      
      const { redisGet } = LiveSocketService.redisClient(client);
      const slug = await redisGet(client.id);

      if (!slug) {
        throw new Error('Not authorized');
      }

      const obj = await this.validadeBroadcast(slug, data.password);

      obj.status = LiveStatus.DONE;

      await this.repoLive.liveRepository.save(obj);

      client.broadcast.to(slug).emit('finish-live', obj);

    } catch (error) {
      console.error(error);
      client.error({message: error.message, name: error.name});
    }
  }

  private async validadeBroadcast(slug: string, password: string){
    const obj = await this.repoLive.liveRepository.findOne({where: {slug: slug}});
    
    if (!obj) { throw new Error('Live not found'); }

    if (!(await obj.comparePassword(password))) { throw new Error('Not Authorized'); }

    if (obj.status !== LiveStatus.PENDING) { throw new Error('The live status must be pending'); }

    return obj;
  }

  private async validadeView(slug: string) {
    const obj = await this.repoLive.liveRepository.findOne({where: {slug: slug}});

    if (!obj) { throw new Error('Live not found'); }

    if (obj.status !== LiveStatus.PENDING) { throw new Error('The live status must be pending'); }

    return obj;
  }

  getUsersConnected(client: Socket, room: string) {
    return room in client.adapter.rooms ? client.adapter.rooms[room].length : 0;
  }
}
