// src/proxy/dto/proxy-image.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ProxyImageDto {
  @ApiProperty({
    description: 'The image URL to proxy (must be from pic.bstarstatic.com)',
    example: 'https://pic.bstarstatic.com/example-image.jpg'
  })
  @IsNotEmpty({ message: 'Image URL is required' })
  @IsString()
  @Matches(/^https:\/\/pic\.bstarstatic\.com\/.+$/, {
    message: 'Invalid image URL. Only pic.bstarstatic.com URLs are supported.'
  })
  url: string;
}