import { OnModuleInit } from '@nestjs/common';
import { ConsulModuleOptions } from './consul.module';
type ConsulServiceType = {
    Address: string;
    Port: number;
    Service: string;
};
export declare class ConsulService implements OnModuleInit {
    private consul;
    private readonly config;
    constructor(config: ConsulModuleOptions);
    onModuleInit(): Promise<void>;
    private registerService;
    getService(serviceName: string): Promise<ConsulServiceType>;
}
export {};
