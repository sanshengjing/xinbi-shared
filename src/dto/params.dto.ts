import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Min,
} from 'class-validator';

export class PaginatingDTO {
  @ApiProperty({
    type: Number,
    description: '当前页码',
    default: 1,
  })
  @IsInt({ message: 'current 参数只能是 number 类型' })
  @Min(1, { message: 'current 参数不能小于 1' })
  @IsNotEmpty({ message: '缺少 current 页码参数' })
  @Transform(({ value }) => parseInt(value, 10))
  current: number;

  @ApiProperty({
    type: Number,
    description: '当前页条数',
    default: 10,
  })
  @IsInt({ message: 'size 参数只能是 number 类型' })
  @Min(1, { message: 'size 参数不能小于 1' })
  @IsNotEmpty({ message: '缺少 size 页码参数' })
  @Transform(({ value }) => parseInt(value, 10))
  size: number;
}

export class StartEndTimeDto {
  @ApiProperty({
    type: Number,
    description: '开始日期',
    default: 1721145600000,
    required: false,
  })
  @IsOptional()
  @IsNumberString({}, { message: '开始日期必须是时间戳格式' })
  startTime?: number;

  @ApiProperty({
    type: Number,
    description: '结束日期',
    default: 1721318399999,
    required: false,
  })
  @IsOptional()
  @IsNumberString({}, { message: '结束日期必须是时间戳格式' })
  endTime?: number;
}
