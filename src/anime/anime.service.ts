import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AnimeService {
  private readonly logger = new Logger(AnimeService.name);

  constructor(private readonly httpService: HttpService) {}

  async getTimeline(locale: string = 'id_ID') {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get('https://api.bilibili.tv/intl/gateway/web/v2/ogv/timeline', {
          params: {
            s_locale: locale,
            platform: 'web'
          },
          headers: {
            'authority': 'api.bilibili.tv',
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9',
            'origin': 'https://www.bilibili.tv',
            'referer': 'https://www.bilibili.tv/id/timeline',
            'sec-ch-ua': '"Chromium";v="137", "Not/A)Brand";v="24"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36'
          }
        })
      );
      
      return data;
    } catch (error) {
      this.logger.error(`Error fetching anime timeline: ${error.message}`);
      throw error;
    }
  }
}