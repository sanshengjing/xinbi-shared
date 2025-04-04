import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import Redis from 'ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('REDIS_HOST', 'localhost');
        const port = configService.get<number>('REDIS_PORT', 6379);
        const db = configService.get<number>('REDIS_DB', 0);
        const keyPrefix = configService.get<string>('rREDIS_KEY_PREFIX', '');
        const username = configService.get<string>('REDIS_USERNAME', '');
        const password = configService.get<string>('REDIS_PASSWORD', '');

        return new Redis({
          host,
          port,
          db,
          keyPrefix,
          username,
          password,
          lazyConnect: true,
          retryStrategy: (times) => {
            return Math.min(times * 50, 2000);
          },
        });
      },
      inject: [ConfigService],
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
