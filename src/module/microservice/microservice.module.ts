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
        ClientsModule.registerAsync(
          options.services.map(serviceName => ({
            name: serviceName,
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              transport: Transport.NATS,
              options: {
                servers: [`nats://${configService.get('NATS_HOST')}:${configService.get('NATS_PORT')}`],
              },
            }),
            inject: [ConfigService],
          }))
        ),
      ],
      exports: [ClientsModule],
    };
  }
} 