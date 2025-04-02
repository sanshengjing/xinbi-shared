import { ClientProxy } from '@nestjs/microservices';
import { ConsulService } from './consul.service';
export declare class ServiceDiscovery {
    private consulService;
    private static clients;
    constructor(consulService: ConsulService);
    getClient(serviceName: string): Promise<ClientProxy>;
}
