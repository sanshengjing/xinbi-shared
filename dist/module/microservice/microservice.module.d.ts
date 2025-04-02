import { DynamicModule } from '@nestjs/common';
export interface MicroserviceOptions {
    services: string[];
}
export declare class MicroserviceModule {
    static forRoot(options: MicroserviceOptions): DynamicModule;
}
