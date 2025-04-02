import { Global, Module } from '@nestjs/common';
import { DateService } from './date.service';
import { NumberService } from './number.service';
import { StringService } from './string.service';

@Global()
@Module({
  providers: [DateService, NumberService, StringService],
  exports: [DateService, NumberService, StringService],
})
export class UtilModule {}
