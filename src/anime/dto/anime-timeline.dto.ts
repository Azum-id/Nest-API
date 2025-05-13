// src/anime/dto/anime-timeline.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AnimeTimelineDto {
  @ApiProperty({
    description: 'Language locale',
    example: 'id_ID',
    required: false,
    default: 'id_ID'
  })
  @IsOptional()
  @IsString()
  locale: string = 'id_ID';
}