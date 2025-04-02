import {
  DynamicModule,
  Global,
  Module,
  ModuleMetadata,
  Type,
} from '@nestjs/common';
import { ConsulService } from './consul.service';
import { ServiceDiscovery } from './service-discovery';
import { HealthController } from './health.controller';

export interface ConsulModuleOptions {
  name: string;
  host: string;
  port: number;
  serviceHost: string;
  servicePort: number;
}

export interface ConsulModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (
    ...args: any[]
  ) => Promise<ConsulModuleOptions> | ConsulModuleOptions;
  inject?: any[];
}

@Global()
@Module({
  controllers: [HealthController],
  providers: [ConsulService, ServiceDiscovery],
  exports: [ConsulService, ServiceDiscovery],
})
export class ConsulModule {
  static forRootAsync(options: ConsulModuleAsyncOptions): DynamicModule {
    return {
      module: ConsulModule,
      imports: [...(options.imports || [])],
      controllers: [HealthController],
      providers: [
        {
          provide: 'CONSUL_MODULE_OPTIONS',
          useFactory: async (...args: any[]) => {
            const config = await options.useFactory(...args);
            console.log('ConsulModule received config:', config);
            return config;
          },
          inject: options.inject || [],
        },
        {
          provide: ConsulService,
          useFactory: (config: ConsulModuleOptions) => {
            console.log('Creating ConsulService with config:', config);
            return new ConsulService(config);
          },
          inject: ['CONSUL_MODULE_OPTIONS'],
        },
        ServiceDiscovery,
      ],
      exports: [ConsulService, ServiceDiscovery],
    };
  }
}
