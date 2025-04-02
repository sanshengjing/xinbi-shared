import { DynamicModule, ModuleMetadata } from '@nestjs/common';
export interface ConsulModuleOptions {
    name: string;
    host: string;
    port: number;
    serviceHost: string;
    servicePort: number;
}
export interface ConsulModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => Promise<ConsulModuleOptions> | ConsulModuleOptions;
    inject?: any[];
}
export declare class ConsulModule {
    static forRootAsync(options: ConsulModuleAsyncOptions): DynamicModule;
}
