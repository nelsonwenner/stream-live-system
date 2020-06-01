import { RepositoriesService } from '../../repositories/repositories.service';
import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from '@nestjs/common';

@Injectable()
export class SaveChatMessageService {

  constructor(private repoService: RepositoriesService) {}
  
  @RabbitSubscribe({
    exchange: 'chat-message',
    routingKey: '',
    queue: 'micro-live-chat/chat-message'
  })
  public async rpcHandler(message) {
    const obj = this.repoService.chatRepository.create({
      content: message.content,
      user_name: message.user_name,
      email: message.email,
      live_slug: message.live_slug,
      is_broadcaster: message.is_broadcaster
    });
    await this.repoService.chatRepository.save(obj);
  }
}
