import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ConsulService } from './consul.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceDiscovery {
  private static clients: Map<string, ClientProxy> = new Map();

  constructor(private consulService: ConsulService) {}

  async getClient(serviceName: string): Promise<ClientProxy> {
    if (!ServiceDiscovery.clients.has(serviceName)) {
      const service = await this.consulService.getService(serviceName);
      if (!service) {
        throw new Error(`Service ${serviceName} not found`);
      }

      const client = ClientProxyFactory.create({
        transport: Transport.NATS,
        options: {
          host: service.Address,
          port: service.Port,
        },
      });
      ServiceDiscovery.clients.set(serviceName, client);
    }
    // @ts-ignore
    return ServiceDiscovery.clients.get(serviceName);
  }
}
