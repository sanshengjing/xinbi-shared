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
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
let MicroserviceModule = MicroserviceModule_1 = class MicroserviceModule {
    static forRoot() {
        return {
            module: MicroserviceModule_1,
            imports: [
                microservices_1.ClientsModule.registerAsync([
                    {
                        name: 'prize-draw',
                        imports: [config_1.ConfigModule],
                        useFactory: async (configService) => ({
                            transport: microservices_1.Transport.NATS,
                            options: {
                                servers: [`nats://${configService.get('NATS_HOST')}:${configService.get('NATS_PORT')}`],
                            },
                        }),
                        inject: [config_1.ConfigService],
                    },
                ]),
            ],
            exports: [microservices_1.ClientsModule],
        };
    }
};
exports.MicroserviceModule = MicroserviceModule;
exports.MicroserviceModule = MicroserviceModule = MicroserviceModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], MicroserviceModule);
//# sourceMappingURL=microservice.module.js.map