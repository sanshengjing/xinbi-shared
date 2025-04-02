import Redis from 'ioredis';
export declare class RedisService {
    private readonly redis;
    constructor(redis: Redis);
    get<T>(key: string): Promise<T | null>;
    set(key: string, value: any, ttl?: number): Promise<void>;
    del(key: string): Promise<void>;
    keys(pattern: string): Promise<string[]>;
    delByPattern(pattern: string): Promise<void>;
    mGet<T>(keys: string[]): Promise<(T | null)[]>;
    mSet(keyValues: {
        key: string;
        value: any;
        ttl?: number;
    }[]): Promise<void>;
    rPush<T>(key: string, values: T[]): Promise<void>;
    lGetAll<T>(key: string, parse?: boolean): Promise<T[] | undefined>;
    lIndex<T>(key: string, index: number, parse?: boolean): Promise<T | undefined>;
    hSet(key: string, field: string, value: any, stringify?: boolean): Promise<void>;
    hGet(key: string, field: string): Promise<string | null>;
    hGetAll(key: string): Promise<Record<string, string>>;
    hDel(key: string, field: string): Promise<void>;
    hExists(key: string, field: string): Promise<number>;
    exists(key: string): Promise<boolean>;
    getClient(): Redis;
}
