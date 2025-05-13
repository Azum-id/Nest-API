// src/proxy/proxy.controller.ts
import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ProxyService } from './proxy.service';
import { ProxyImageDto } from './dto/proxy-image.dto';

@ApiTags('proxy')
@Controller('api/proxy')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get('image')
  @ApiOperation({ summary: 'Proxy images from Bilibili' })
  @ApiQuery({
    name: 'url',
    required: true,
    type: String,
    description: 'The image URL to proxy (must be from pic.bstarstatic.com)'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Image data',
    content: {
      'image/*': {
        schema: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Server error' 
  })
  async proxyImage(@Query() query: ProxyImageDto, @Res() res: Response) {
    const { data, contentType } = await this.proxyService.proxyImage(query.url);
    res.set('Content-Type', contentType);
    return res.send(data);
  }
}