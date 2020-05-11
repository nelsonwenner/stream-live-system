import { LiveService } from './live.service';
import { Controller, Get, Param, Post, Req } from '@nestjs/common';

@Controller('lives')
export class LiveController {

  constructor(private liveService: LiveService) {}

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
}
