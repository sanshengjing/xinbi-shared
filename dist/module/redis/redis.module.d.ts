import { DynamicModule } from '@nestjs/common';
import { RedisModuleOptions, RedisModuleAsyncOptions } from './redis.interface';
export declare class RedisModule {
    static forRoot(options: RedisModuleOptions): DynamicModule;
    static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule;
}
