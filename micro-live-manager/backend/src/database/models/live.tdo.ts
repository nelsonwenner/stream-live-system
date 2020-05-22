import { IsString, IsOptional } from 'class-validator';

export class LiveOTG {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  date: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  status: string;
}

export class SlugOTG {
  @IsString()
  slug: string;

  @IsString()
  password: string;
}