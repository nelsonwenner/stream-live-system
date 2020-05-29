import { Controller, Get, Param, Post, Req, Request } from '@nestjs/common';
import { RepositoriesService } from '../repositories/repositories.service';
import { GrpcMethod } from "@nestjs/microservices";
import { LiveService } from './live.service';

@Controller('lives')
export class LiveController {

  constructor(private repoService: RepositoriesService,
              private liveService: LiveService) {}

  @Get()
  async index() {
    return await this.liveService.findAll();
  }
  
  @Get(':slug')
  async show(@Param('slug') slug: string) {
    return await this.liveService.showlive(slug);
  }

  @Post()
  async store(@Req() req: Request) {
    return await this.liveService.create(req.body);
  }

  @GrpcMethod('LiveService', 'FindOne')
  async findOne({slug}: { slug }, metadata: any) {
    const obj = await this.repoService.liveRepository.findOneOrFail({where: {slug}});
    delete obj.password;
    return obj;
  }

  @GrpcMethod('LiveService', 'Validate')
  async validate({slug, password}: { slug, password }, metadata: any) {
    const obj = await this.repoService.liveRepository.findOne({where: {slug}});
    
    if (!obj || !obj.comparePassword(password)) {
      throw new Error('Not authorized');
    }

    delete obj.password;
    return obj;
  }
}