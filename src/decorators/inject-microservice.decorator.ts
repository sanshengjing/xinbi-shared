import { Inject } from '@nestjs/common';

export function InjectMicroservice(serviceName: string) {
  return Inject(serviceName);
}
