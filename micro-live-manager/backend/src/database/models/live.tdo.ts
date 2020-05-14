import { IsString, IsOptional } from 'class-validator';

export class LiveOTG {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  status: string;
}

export class SlugOTG {
  @IsString()
  slug: string;
}