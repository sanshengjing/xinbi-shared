"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MicroserviceModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroserviceModule = void 0;
const common_1 = require("@nestjs/common");
const consul_module_1 = require("../consul/consul.module");
const inject_microservice_decorator_1 = require("../../decorators/inject-microservice.decorator");
let MicroserviceModule = MicroserviceModule_1 = class MicroserviceModule {
    static forRoot(services) {
        const providers = services.map((serviceName) => ({
            provide: `${inject_microservice_decorator_1.MICROSERVICE_TOKEN_PREFIX}${serviceName}`,
            useFactory: async (moduleRef) => {
                return inject_microservice_decorator_1.MicroserviceFactory.createAsyncClient(serviceName, moduleRef);
            },
            inject: ['MODULE_REF'],
        }));
        return {
            module: MicroserviceModule_1,
            providers,
            exports: providers,
            global: true,
        };
    }
};
exports.MicroserviceModule = MicroserviceModule;
exports.MicroserviceModule = MicroserviceModule = MicroserviceModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [consul_module_1.ConsulModule],
    })
], MicroserviceModule);
//# sourceMappingURL=microservice.module.js.map