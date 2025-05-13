// src/app.controller.ts - Root controller
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiInfo } from './common/interfaces/api-info.interface';

@ApiTags('root')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'API information and documentation' })
  @ApiResponse({ 
    status: 200, 
    description: 'API information',
    type: ApiInfo
  })
  getApiInfo(): ApiInfo {
    return {
      name: 'Bilibili TV Anime API',
      version: '1.0.0',
      description: 'API for fetching anime data from Bilibili TV',
      endpoints: [
        {
          path: '/',
          method: 'GET',
          description: 'API information and documentation'
        },
        {
          path: '/api/anime/timeline',
          method: 'GET',
          description: 'Get anime timeline data',
          query_params: {
            locale: 'Language locale (default: id_ID)'
          }
        },
        {
          path: '/api/proxy/image',
          method: 'GET',
          description: 'Proxy images from Bilibili servers',
          query_params: {
            url: 'Image URL to proxy (must be from pic.bstarstatic.com)'
          }
        },
        {
          path: '/health',
          method: 'GET',
          description: 'API health check'
        },
        {
          path: '/api-docs',
          method: 'GET',
          description: 'Interactive API documentation (Swagger UI)'
        }
      ],
      status: 'online'
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ 
    status: 200, 
    description: 'Health status',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'ok'
        }
      }
    }
  })
  getHealth() {
    return { status: 'ok' };
  }
}