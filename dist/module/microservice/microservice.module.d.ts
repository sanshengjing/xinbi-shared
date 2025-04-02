import { DynamicModule } from '@nestjs/common';
export declare class MicroserviceModule {
    static forRoot(services: string[]): DynamicModule;
}
