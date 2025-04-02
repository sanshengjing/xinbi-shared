"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let RedisService = class RedisService {
    constructor(redis) {
        this.redis = redis;
    }
    async get(key) {
        const value = await this.redis.get(key);
        if (value === null)
            return null;
        try {
            return JSON.parse(value);
        }
        catch {
            return value;
        }
    }
    async set(key, value, ttl) {
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
        if (ttl) {
            await this.redis.set(key, stringValue, 'PX', ttl);
        }
        else {
            await this.redis.set(key, stringValue);
        }
    }
    async del(key) {
        await this.redis.del(key);
    }
    async keys(pattern) {
        return this.redis.keys(pattern);
    }
    async delByPattern(pattern) {
        const keys = await this.keys(pattern);
        if (keys.length > 0) {
            await this.redis.del(...keys);
        }
    }
    async mGet(keys) {
        if (keys.length === 0)
            return [];
        const values = await this.redis.mget(keys);
        return values.map((value) => {
            if (value === null)
                return null;
            try {
                return JSON.parse(value);
            }
            catch {
                return value;
            }
        });
    }
    async mSet(keyValues) {
        if (keyValues.length === 0)
            return;
        const withTtl = keyValues.filter((kv) => kv.ttl != null);
        const withoutTtl = keyValues.filter((kv) => kv.ttl == null);
        if (withoutTtl.length > 0) {
            const args = withoutTtl.flatMap(({ key, value }) => [
                key,
                typeof value === 'string' ? value : JSON.stringify(value),
            ]);
            await this.redis.mset(args);
        }
        for (const { key, value, ttl } of withTtl) {
            await this.set(key, value, ttl);
        }
    }
    async rPush(key, values) {
        const newValues = [];
        values.forEach((item) => {
            newValues.push(JSON.stringify(item));
        });
        if (newValues.length) {
            await this.redis.rpush(key, ...newValues);
        }
    }
    async lGetAll(key, parse = true) {
        const len = await this.redis.llen(key);
        if (len) {
            const items = await this.redis.lrange(key, 0, len);
            if (items && items.length > 0) {
                if (parse) {
                    return items.map((item) => JSON.parse(item));
                }
            }
            return items;
        }
    }
    async lIndex(key, index, parse = true) {
        const item = await this.redis.lindex(key, index);
        if (item) {
            if (parse) {
                return JSON.parse(item);
            }
            return item;
        }
    }
    async hSet(key, field, value, stringify = true) {
        await this.redis.hset(key, field, stringify ? JSON.stringify(value) : value);
    }
    async hGet(key, field) {
        return this.redis.hget(key, field);
    }
    async hGetAll(key) {
        return this.redis.hgetall(key);
    }
    async hDel(key, field) {
        await this.redis.hdel(key, field);
    }
    async hExists(key, field) {
        return this.redis.hexists(key, field);
    }
    async exists(key) {
        const result = await this.redis.exists(key);
        return result === 1;
    }
    getClient() {
        return this.redis;
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [ioredis_1.default])
], RedisService);
//# sourceMappingURL=redis.service.js.map