// src/common/interfaces/api-info.interface.ts
import { ApiProperty } from '@nestjs/swagger';

class EndpointInfo {
  @ApiProperty({ example: '/api/anime/timeline' })
  path: string;
  
  @ApiProperty({ example: 'GET' })
  method: string;
  
  @ApiProperty({ example: 'Get anime timeline data' })
  description: string;
  
  @ApiProperty({ 
    example: { locale: 'Language locale (default: id_ID)' },
    required: false
  })
  query_params?: Record<string, string>;
}

export class ApiInfo {
  @ApiProperty({ example: 'Bilibili TV Anime API' })
  name: string;

  @ApiProperty({ example: '1.0.0' })
  version: string;

  @ApiProperty({ example: 'API for fetching anime data from Bilibili TV' })
  description: string;

  @ApiProperty({
    type: [EndpointInfo]
  })
  endpoints: EndpointInfo[];

  @ApiProperty({ example: 'online' })
  status: string;
}