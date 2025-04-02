import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    if (value === null) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    const stringValue =
      typeof value === 'string' ? value : JSON.stringify(value);
    if (ttl) {
      await this.redis.set(key, stringValue, 'PX', ttl);
    } else {
      await this.redis.set(key, stringValue);
    }
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  // 获取以某个前缀开头的所有键
  async keys(pattern: string): Promise<string[]> {
    return this.redis.keys(pattern);
  }

  // 删除所有匹配的键
  async delByPattern(pattern: string): Promise<void> {
    const keys = await this.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }

  // 批量获取键值
  async mGet<T>(keys: string[]): Promise<(T | null)[]> {
    if (keys.length === 0) return [];
    const values = await this.redis.mget(keys);
    return values.map((value) => {
      if (value === null) return null;
      try {
        return JSON.parse(value) as T;
      } catch {
        return value as T;
      }
    });
  }

  // 批量设置键值
  async mSet(
    keyValues: { key: string; value: any; ttl?: number }[],
  ): Promise<void> {
    if (keyValues.length === 0) return;

    // 分组处理：有 TTL 的和没有 TTL 的
    const withTtl = keyValues.filter((kv) => kv.ttl != null);
    const withoutTtl = keyValues.filter((kv) => kv.ttl == null);

    // 处理没有 TTL 的键值对
    if (withoutTtl.length > 0) {
      const args = withoutTtl.flatMap(({ key, value }) => [
        key,
        typeof value === 'string' ? value : JSON.stringify(value),
      ]);
      await this.redis.mset(args);
    }

    // 处理有 TTL 的键值对
    for (const { key, value, ttl } of withTtl) {
      await this.set(key, value, ttl);
    }
  }

  async rPush<T>(key: string, values: T[]) {
    const newValues: string[] = [];
    values.forEach((item) => {
      newValues.push(JSON.stringify(item));
    });
    if (newValues.length) {
      await this.redis.rpush(key, ...newValues);
    }
  }

  async lGetAll<T>(key: string, parse: boolean = true) {
    const len = await this.redis.llen(key);
    if (len) {
      const items = await this.redis.lrange(key, 0, len);
      if (items && items.length > 0) {
        if (parse) {
          return items.map((item) => JSON.parse(item) as T);
        }
      }
      return items as T[];
    }
  }

  async lIndex<T>(key: string, index: number, parse: boolean = true) {
    const item = await this.redis.lindex(key, index);
    if (item) {
      if (parse) {
        return JSON.parse(item) as T;
      }
      return item as T;
    }
  }

  async hSet(
    key: string,
    field: string,
    value: any,
    stringify: boolean = true,
  ) {
    await this.redis.hset(
      key,
      field,
      stringify ? JSON.stringify(value) : value,
    );
  }

  async hGet(key: string, field: string) {
    return this.redis.hget(key, field);
  }

  async hGetAll(key: string) {
    return this.redis.hgetall(key);
  }

  async hDel(key: string, field: string) {
    await this.redis.hdel(key, field);
  }

  async hExists(key: string, field: string) {
    return this.redis.hexists(key, field);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.redis.exists(key);
    return result === 1;
  }

  getClient(): Redis {
    return this.redis;
  }
}
