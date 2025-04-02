"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RedisModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisModule = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("./redis.service");
const ioredis_1 = require("ioredis");
let RedisModule = RedisModule_1 = class RedisModule {
    static forRoot(options) {
        return {
            module: RedisModule_1,
            providers: [
                {
                    provide: 'REDIS_OPTIONS',
                    useValue: options,
                },
                {
                    provide: 'REDIS_CLIENT',
                    useFactory: () => {
                        return new ioredis_1.default({
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
                redis_service_1.RedisService,
            ],
            exports: [redis_service_1.RedisService],
        };
    }
    static forRootAsync(options) {
        return {
            module: RedisModule_1,
            providers: [
                {
                    provide: 'REDIS_OPTIONS',
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
                {
                    provide: 'REDIS_CLIENT',
                    useFactory: (redisOptions) => {
                        return new ioredis_1.default({
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
                redis_service_1.RedisService,
            ],
            exports: [redis_service_1.RedisService],
        };
    }
};
exports.RedisModule = RedisModule;
exports.RedisModule = RedisModule = RedisModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], RedisModule);
//# sourceMappingURL=redis.module.js.map