import { DynamicModule, Global, Module, ModuleMetadata } from '@nestjs/common';
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
            return await options.useFactory(...args);
          },
          inject: options.inject || [],
        },
        {
          provide: ConsulService,
          useFactory: (config: ConsulModuleOptions) => {
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
