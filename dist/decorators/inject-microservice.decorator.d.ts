import { ClientProxy } from '@nestjs/microservices';
import { ModuleRef } from '@nestjs/core';
export declare const MICROSERVICE_TOKEN_PREFIX = "";
export declare function InjectMicroservice(serviceName: string): PropertyDecorator & ParameterDecorator;
export declare class MicroserviceFactory {
    static createAsyncClient(serviceName: string, moduleRef: ModuleRef): Promise<ClientProxy>;
}
