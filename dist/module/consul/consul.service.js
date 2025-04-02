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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsulService = void 0;
const common_1 = require("@nestjs/common");
const consul_1 = __importDefault(require("consul"));
const uuid_1 = require("uuid");
let ConsulService = class ConsulService {
    constructor(config) {
        if (!config.name) {
            throw new Error('Service name is required');
        }
        if (!config.port) {
            throw new Error('Consul port is required');
        }
        if (!config.servicePort) {
            throw new Error('Service port is required');
        }
        this.config = {
            name: config.name,
            host: config.host || 'localhost',
            port: Number(config.port),
            serviceHost: config.serviceHost || 'localhost',
            servicePort: Number(config.servicePort),
        };
    }
    async onModuleInit() {
        this.consul = new consul_1.default({
            host: this.config.host,
            port: this.config.port,
        });
        await this.registerService();
    }
    async registerService() {
        console.log('Registering service:', this.config.name);
        const serviceId = `${this.config.name}-${(0, uuid_1.v4)()}`;
        try {
            const registration = {
                id: serviceId,
                name: this.config.name,
                address: this.config.serviceHost,
                port: this.config.servicePort,
                check: {
                    name: this.config.name,
                    http: `http://${this.config.serviceHost}:${this.config.servicePort}/health`,
                    interval: '10s',
                    timeout: '5s',
                    deregistercriticalserviceafter: '30s',
                },
                tags: ['microservice', 'nats'],
            };
            await this.consul.agent.service.register(registration);
            console.log(`Service ${this.config.name} registered successfully with ID: ${serviceId}`);
        }
        catch (e) {
            console.error('服务注册出错:', e);
            throw e;
        }
    }
    async getService(serviceName) {
        const services = await this.consul.agent.service.list();
        return Object.values(services).find((service) => service.Service === serviceName);
    }
};
exports.ConsulService = ConsulService;
exports.ConsulService = ConsulService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], ConsulService);
//# sourceMappingURL=consul.service.js.map