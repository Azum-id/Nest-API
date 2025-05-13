// src/proxy/proxy.service.ts
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);

  constructor(private readonly httpService: HttpService) {}

  async proxyImage(imageUrl: string) {
    // Validate URL to prevent proxy abuse
    const urlPattern = /^https:\/\/pic\.bstarstatic\.com\/.+$/;
    if (!urlPattern.test(imageUrl)) {
      throw new BadRequestException('Invalid image URL. Only pic.bstarstatic.com URLs are supported.');
    }
    
    try {
      const response = await firstValueFrom(
        this.httpService.get(imageUrl, {
          responseType: 'arraybuffer',
          headers: {
            'authority': 'pic.bstarstatic.com',
            'accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
            'accept-language': 'en-US,en;q=0.9',
            'referer': 'https://www.bilibili.tv/id/anime',
            'sec-ch-ua': '"Chromium";v="137", "Not/A)Brand";v="24"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36'
          }
        })
      );
      
      return {
        data: response.data,
        contentType: response.headers['content-type']
      };
    } catch (error) {
      this.logger.error(`Error proxying image: ${error.message}`);
      throw error;
    }
  }
}