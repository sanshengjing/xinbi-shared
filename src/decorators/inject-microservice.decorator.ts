import { Inject } from '@nestjs/common';
import {
  ClientProxy,
  Transport,
  ClientProxyFactory,
} from '@nestjs/microservices';
import { ConsulService } from '../module/consul/consul.service';
import { ModuleRef } from '@nestjs/core';

export const MICROSERVICE_TOKEN_PREFIX = '';

export function InjectMicroservice(serviceName: string) {
  return Inject(serviceName);
}

export class MicroserviceFactory {
  static async createAsyncClient(
    serviceName: string,
    moduleRef: ModuleRef,
  ): Promise<ClientProxy> {
    const consulService = moduleRef.get(ConsulService);

    const serviceInfo = await consulService.getService(serviceName);
    if (!serviceInfo) {
      throw new Error(`Service ${serviceName} not found in Consul`);
    }

    return ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        servers: [`nats://${serviceInfo.Address}:${serviceInfo.Port}`],
      },
    });
  }
}
