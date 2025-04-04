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
const config_1 = require("@nestjs/config");
let ConsulService = class ConsulService {
    constructor(configService) {
        this.microserviceName = configService.get('MICROSERVICE_NAME', '');
        this.consulHost = configService.get('CONSUL_HOST', '');
        this.consulPort = Number(configService.get('CONSUL_PORT', 8500));
        this.serviceHost = configService.get('SERVICE_HOST', '');
        this.servicePort = Number(configService.get('MICROSERVICE_PORT', 3000));
    }
    async onModuleInit() {
        this.consul = new consul_1.default({
            host: this.consulHost,
            port: this.consulPort,
        });
        await this.registerService();
    }
    async registerService() {
        console.log('Registering service:', this.microserviceName);
        const serviceId = `${this.microserviceName}-${(0, uuid_1.v4)()}`;
        try {
            const registration = {
                id: serviceId,
                name: this.microserviceName,
                address: this.serviceHost,
                port: this.servicePort,
                check: {
                    name: this.microserviceName,
                    http: `http://${this.serviceHost}:${this.servicePort}/health`,
                    interval: '10s',
                    timeout: '5s',
                    deregistercriticalserviceafter: '30s',
                },
            };
            await this.consul.agent.service.register(registration);
            console.log(`Service ${this.microserviceName} registered successfully with ID: ${serviceId}`);
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
    __metadata("design:paramtypes", [config_1.ConfigService])
], ConsulService);
//# sourceMappingURL=consul.service.js.map