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
var ServiceDiscovery_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceDiscovery = void 0;
const microservices_1 = require("@nestjs/microservices");
const consul_service_1 = require("./consul.service");
const common_1 = require("@nestjs/common");
let ServiceDiscovery = ServiceDiscovery_1 = class ServiceDiscovery {
    constructor(consulService) {
        this.consulService = consulService;
    }
    async getClient(serviceName) {
        if (!ServiceDiscovery_1.clients.has(serviceName)) {
            const service = await this.consulService.getService(serviceName);
            if (!service) {
                throw new Error(`Service ${serviceName} not found`);
            }
            const client = microservices_1.ClientProxyFactory.create({
                transport: microservices_1.Transport.NATS,
                options: {
                    host: service.Address,
                    port: service.Port,
                },
            });
            ServiceDiscovery_1.clients.set(serviceName, client);
        }
        return ServiceDiscovery_1.clients.get(serviceName);
    }
};
exports.ServiceDiscovery = ServiceDiscovery;
ServiceDiscovery.clients = new Map();
exports.ServiceDiscovery = ServiceDiscovery = ServiceDiscovery_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [consul_service_1.ConsulService])
], ServiceDiscovery);
//# sourceMappingURL=service-discovery.js.map