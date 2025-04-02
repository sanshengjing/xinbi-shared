"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ConsulModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsulModule = void 0;
const common_1 = require("@nestjs/common");
const consul_service_1 = require("./consul.service");
const service_discovery_1 = require("./service-discovery");
const health_controller_1 = require("./health.controller");
let ConsulModule = ConsulModule_1 = class ConsulModule {
    static forRootAsync(options) {
        const optionsProvider = {
            provide: 'CONSUL_MODULE_OPTIONS',
            useFactory: options.useFactory,
            inject: options.inject || [],
        };
        const consulServiceProvider = {
            provide: consul_service_1.ConsulService,
            useFactory: (config) => {
                return new consul_service_1.ConsulService(config);
            },
            inject: ['CONSUL_MODULE_OPTIONS'],
        };
        return {
            module: ConsulModule_1,
            global: true,
            imports: [...(options.imports || [])],
            controllers: [health_controller_1.HealthController],
            providers: [
                optionsProvider,
                consulServiceProvider,
                service_discovery_1.ServiceDiscovery,
            ],
            exports: [consul_service_1.ConsulService, service_discovery_1.ServiceDiscovery],
        };
    }
};
exports.ConsulModule = ConsulModule;
exports.ConsulModule = ConsulModule = ConsulModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        controllers: [health_controller_1.HealthController],
        providers: [consul_service_1.ConsulService, service_discovery_1.ServiceDiscovery],
        exports: [consul_service_1.ConsulService, service_discovery_1.ServiceDiscovery],
    })
], ConsulModule);
//# sourceMappingURL=consul.module.js.map