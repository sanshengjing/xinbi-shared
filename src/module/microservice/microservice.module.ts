import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConsulModule } from '../consul/consul.module';
import { MICROSERVICE_TOKEN_PREFIX, MicroserviceFactory } from '../../decorators/inject-microservice.decorator';

@Module({
  imports: [ConsulModule],
})
export class MicroserviceModule {
  static forRoot(services: string[]): DynamicModule {
    const providers: Provider[] = services.map((serviceName) => ({
      provide: `${MICROSERVICE_TOKEN_PREFIX}${serviceName}`,
      useFactory: async (moduleRef) => {
        return MicroserviceFactory.createAsyncClient(serviceName, moduleRef);
      },
      inject: ['MODULE_REF'],
    }));

    return {
      module: MicroserviceModule,
      providers,
      exports: providers,
      global: true,
    };
  }
} 