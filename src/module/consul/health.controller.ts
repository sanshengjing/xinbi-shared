import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      type: 'nats-microservice',
      timestamp: new Date().toISOString(),
    };
  }
}
