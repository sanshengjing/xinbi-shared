import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
type ConsulServiceType = {
    Address: string;
    Port: number;
    Service: string;
};
export declare class ConsulService implements OnModuleInit, OnModuleDestroy {
    private consul;
    private serviceId;
    private readonly microserviceName;
    private readonly consulHost;
    private readonly consulPort;
    private readonly serviceHost;
    private readonly servicePort;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    private registerService;
    getService(serviceName: string): Promise<ConsulServiceType>;
}
export {};
