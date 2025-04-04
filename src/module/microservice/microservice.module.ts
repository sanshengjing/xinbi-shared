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
            useFactory: async (configService: ConfigService) => {
              const transportUrl = configService.get<string>('TRANSPORT_URL', '');
              console.log('transportUrl =====', transportUrl);
              console.log('Initializing microservice client for:', serviceName);
              
              return {
                transport: Transport.RMQ,
                options: {
                  urls: [transportUrl],
                  queue: `${serviceName}_queue`, // 使用新的队列名称
                  noAck: true,
                  persistent: false,
                  queueOptions: {
                    durable: false,
                    autoDelete: true,
                  },
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