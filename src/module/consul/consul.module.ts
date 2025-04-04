import { Global, Module } from '@nestjs/common';
import { ConsulService } from './consul.service';
import { HealthController } from './health.controller';

@Global()
@Module({
  controllers: [HealthController],
  providers: [ConsulService],
  exports: [ConsulService],
})
export class ConsulModule {}
