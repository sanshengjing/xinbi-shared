export interface RedisModuleOptions {
    host?: string;
    port?: number;
    db?: number;
    keyPrefix?: string;
    password?: string;
    username?: string;
    lazyConnect?: boolean;
}
export interface RedisModuleAsyncOptions {
    useFactory: (...args: any[]) => Promise<RedisModuleOptions> | RedisModuleOptions;
    inject?: any[];
}
