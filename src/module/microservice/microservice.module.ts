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
              const transportUrl = configService.get<string>('TRANSPORT_URL', '');
              return {
                transport: Transport.RMQ,
                options: {
                  urls: [transportUrl],
                  queue: `${serviceName}_queue`, // 队列名称是必需的
                  queueOptions: {
                    durable: true, // 队列持久化
                  },
                  socketOptions: {
                    heartbeatIntervalInSeconds: 30, // 心跳检测
                    reconnectTimeInSeconds: 5, // 自动重连
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