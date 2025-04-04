import { Injectable, OnModuleInit } from '@nestjs/common';
import Consul from 'consul';
import { ConsulModuleOptions } from './consul.module';
import { v4 } from 'uuid';

type ConsulServiceType = {
  Address: string;
  Port: number;
  Service: string;
};

@Injectable()
export class ConsulService implements OnModuleInit {
  private consul: Consul;
  private readonly config: ConsulModuleOptions;

  constructor(config: ConsulModuleOptions) {
    // 确保所有必要的配置都存在
    if (!config.name) {
      throw new Error('Service name is required');
    }
    if (!config.port) {
      throw new Error('Consul port is required');
    }
    if (!config.servicePort) {
      throw new Error('Service port is required');
    }

    this.config = {
      name: config.name,
      host: config.host || 'localhost',
      port: Number(config.port),
      serviceHost: config.serviceHost || 'localhost',
      servicePort: Number(config.servicePort),
    };

  }

  async onModuleInit() {
    this.consul = new Consul({
      host: this.config.host,
      port: this.config.port,
    });

    // 注册服务
    await this.registerService();
  }

  private async registerService() {
    console.log('Registering service:', this.config.name);
    const serviceId = `${this.config.name}-${v4()}`;
    try {
      const registration = {
        id: serviceId,
        name: this.config.name,
        address: this.config.serviceHost,
        port: this.config.servicePort,
        check: {
          name: this.config.name,
          http: `http://${this.config.serviceHost}:${this.config.servicePort}/health`,
          interval: '10s',
          timeout: '5s',
          deregistercriticalserviceafter: '30s',
        },
        // tags: ['microservice', 'nats'],
      };

      await this.consul.agent.service.register(registration);
      console.log(
        `Service ${this.config.name} registered successfully with ID: ${serviceId}`,
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
