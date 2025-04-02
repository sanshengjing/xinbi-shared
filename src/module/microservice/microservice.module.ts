import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({})
export class MicroserviceModule {
  static forRoot(): DynamicModule {
    return {
      module: MicroserviceModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: 'prize-draw',
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              transport: Transport.NATS,
              options: {
                servers: [`nats://${configService.get('NATS_HOST')}:${configService.get('NATS_PORT')}`],
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
} 