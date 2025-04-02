import { DynamicModule, Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisModuleOptions, RedisModuleAsyncOptions } from './redis.interface';
import Redis from 'ioredis';

@Global()
@Module({})
export class RedisModule {
  static forRoot(options: RedisModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: 'REDIS_OPTIONS',
          useValue: options,
        },
        {
          provide: 'REDIS_CLIENT',
          useFactory: () => {
            return new Redis({
              host: options.host || 'localhost',
              port: options.port || 6379,
              db: options.db || 0,
              keyPrefix: options.keyPrefix || '',
              password: options.password,
              username: options.username,
              lazyConnect: options.lazyConnect ?? true,
            });
          },
        },
        RedisService,
      ],
      exports: [RedisService],
    };
  }

  static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: 'REDIS_OPTIONS',
          useFactory: options.useFactory,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          inject: options.inject || [],
        },
        {
          provide: 'REDIS_CLIENT',
          useFactory: (redisOptions: RedisModuleOptions) => {
            return new Redis({
              host: redisOptions.host || 'localhost',
              port: redisOptions.port || 6379,
              db: redisOptions.db || 0,
              keyPrefix: redisOptions.keyPrefix || '',
              password: redisOptions.password,
              username: redisOptions.username,
              lazyConnect: redisOptions.lazyConnect ?? true,
            });
          },
          inject: ['REDIS_OPTIONS'],
        },
        RedisService,
      ],
      exports: [RedisService],
    };
  }
}
