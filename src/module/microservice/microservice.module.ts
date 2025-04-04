import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

export interface MicroserviceOptions {
  services: string[];  // 需要注入的微服务名称列表
}

@Global()
@Module({})
export class MicroserviceModule {
  static forRoot(options: MicroserviceOptions): DynamicModule {

    return {
      module: MicroserviceModule,
      imports: [
        ClientsModule.register(
          options.services.map(serviceName => ({
            name: serviceName,
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
              const username = configService.get<string>('TRANSPORT_USERNAME', '');
              const password = configService.get<string>('TRANSPORT_PASSWORD', '');
              const transportHost = configService.get('TRANSPORT_HOST', '');
              const transportPort = configService.get<number>('TRANSPORT_PORT', 5672);
              return {
                transport: Transport.RMQ,
                options: {
                  servers: [`amqp://${username}:${password}@${transportHost}:${transportPort}`],
                },
              };
            },
            inject: [ConfigService],
          })),
        ),
      ],
      exports: [ClientsModule],
    };
  }
} 