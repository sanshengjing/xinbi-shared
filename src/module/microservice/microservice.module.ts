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
              console.log('transportUrl =====', transportUrl);
              return {
                transport: Transport.RMQ,
                options: {
                  urls: [transportUrl],
                  queue: `${serviceName}_queue`, // 队列名称是必需的
                  noAck: true, // 自动确认消息
                  persistent: false, // 不持久化消息
                  queueOptions: {
                    durable: false, // 队列不持久化
                    autoDelete: true, // 没有消费者时自动删除队列
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