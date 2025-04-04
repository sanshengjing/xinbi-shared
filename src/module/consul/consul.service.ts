import { Injectable, OnModuleInit } from '@nestjs/common';
import Consul from 'consul';
import { v4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

type ConsulServiceType = {
  Address: string;
  Port: number;
  Service: string;
};

@Injectable()
export class ConsulService implements OnModuleInit {
  private consul: Consul;
  private readonly microserviceName: string;
  private readonly consulHost: string;
  private readonly consulPort: number;
  private readonly serviceHost: string;
  private readonly servicePort: number;

  constructor(configService: ConfigService) {
    this.microserviceName = configService.get<string>('MICROSERVICE_NAME', '');
    this.consulHost = configService.get<string>('CONSUL_HOST', '');
    this.consulPort = Number(configService.get<number>('CONSUL_PORT', 8500));
    this.serviceHost = configService.get<string>('SERVICE_HOST', '');
    this.servicePort = Number(configService.get<number>('MICROSERVICE_PORT', 3000));
  }

  async onModuleInit() {
    this.consul = new Consul({
      host: this.consulHost,
      port: this.consulPort,
    });

    // 注册服务
    await this.registerService();
  }

  private async registerService() {
    console.log('Registering service:', this.microserviceName);
    const serviceId = `${this.microserviceName}-${v4()}`;
    try {
      const registration = {
        id: serviceId,
        name: this.microserviceName,
        address: this.serviceHost,
        port: this.servicePort,
        check: {
          name: this.microserviceName,
          http: `http://${this.serviceHost}:${this.servicePort}/health`,
          interval: '10s',
          timeout: '5s',
          deregistercriticalserviceafter: '30s',
        },
      };

      await this.consul.agent.service.register(registration);
      console.log(
        `Service ${this.microserviceName} registered successfully with ID: ${serviceId}`,
      );
    } catch (e) {
      console.error('服务注册出错:', e);
      throw e;
    }
  }

  async getService(serviceName: string): Promise<ConsulServiceType> {
    const services = await this.consul.agent.service.list();
    return Object.values(services).find(
      (service: ConsulServiceType) => service.Service === serviceName,
    ) as ConsulServiceType;
  }
}
