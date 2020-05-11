import { LiveEntity } from '../../database/entities/live.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class RepositoriesService {
  
  constructor(
    @InjectRepository(LiveEntity) public liveRepository: Repository<LiveEntity>
  ) {}
}
