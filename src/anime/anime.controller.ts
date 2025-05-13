// src/anime/anime.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnimeService } from './anime.service';
import { AnimeTimelineDto } from './dto/anime-timeline.dto';

@ApiTags('anime')
@Controller('api/anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Get('timeline')
  @ApiOperation({ summary: 'Get anime timeline' })
  @ApiQuery({
    name: 'locale',
    required: false,
    type: String,
    description: 'Language locale',
    example: 'id_ID'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Anime timeline data' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Server error' 
  })
  async getTimeline(@Query() query: AnimeTimelineDto) {
    return this.animeService.getTimeline(query.locale);
  }
}