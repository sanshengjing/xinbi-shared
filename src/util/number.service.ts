import { Injectable } from '@nestjs/common';
import { Decimal } from 'decimal.js';

@Injectable()
export class NumberService {
  static getRealEffectiveAmount(
    contractPrecision: number | bigint,
    effectiveAmount: number | bigint,
  ) {
    const precision = '1' + '0'.repeat(Number(contractPrecision));
    const precisionNum = Number(precision);
    return new Decimal(Number(effectiveAmount)).div(precisionNum).toNumber();
  }
}
