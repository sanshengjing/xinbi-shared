"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroserviceFactory = exports.MICROSERVICE_TOKEN_PREFIX = void 0;
exports.InjectMicroservice = InjectMicroservice;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const consul_service_1 = require("../module/consul/consul.service");
exports.MICROSERVICE_TOKEN_PREFIX = '';
function InjectMicroservice(serviceName) {
    return (0, common_1.Inject)(`${exports.MICROSERVICE_TOKEN_PREFIX}${serviceName}`);
}
class MicroserviceFactory {
    static async createAsyncClient(serviceName, moduleRef) {
        const consulService = moduleRef.get(consul_service_1.ConsulService);
        const serviceInfo = await consulService.getService(serviceName);
        if (!serviceInfo) {
            throw new Error(`Service ${serviceName} not found in Consul`);
        }
        return microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.NATS,
            options: {
                servers: [`nats://${serviceInfo.Address}:${serviceInfo.Port}`],
            },
        });
    }
}
exports.MicroserviceFactory = MicroserviceFactory;
//# sourceMappingURL=inject-microservice.decorator.js.map