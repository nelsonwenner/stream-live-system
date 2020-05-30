import { ChatMessageEntity } from '../../database/entities/chat.message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class RepositoriesService {

  public constructor(

    @InjectRepository(ChatMessageEntity) public chatRepository: Repository<ChatMessageEntity>,

  ) {}

}
