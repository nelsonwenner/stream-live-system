import { RepositoriesService } from '../repositories/repositories.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LiveService {

  constructor(private repoService: RepositoriesService) {}

  async findAll() {
    return await this.repoService.liveRepository.find({
      order: {
        created_at: 'DESC'
      }
    });
  }

  async showlive(slug: string) {
    return this.repoService.liveRepository.findOneOrFail({where: {slug: slug}});
  }

  async create(data) {
    const live = await this.repoService.liveRepository.create(data);
    await this.repoService.liveRepository.save(live);
    return live;
  }
}
