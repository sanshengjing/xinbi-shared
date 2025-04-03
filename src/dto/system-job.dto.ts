import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { PaginatingDTO, StartEndTimeDto } from './params.dto';
import { IntersectionType } from '@nestjs/mapped-types';

enum Status {
  ACTIVE ='ACTIVE',
  INACTIVE = 'INACTIVE'
}

export class BaseJobDto {
  @ApiProperty({ description: '任务名称' })
  @IsNotEmpty({ message: '任务名称不能为空' })
  @IsOptional()
  jobName: string;

  @ApiProperty({ description: '服务名称' })
  @IsNotEmpty({ message: '服务名称不能为空' })
  @IsOptional()
  serviceName: string;

  @ApiProperty({ description: '群id' })
  @IsNotEmpty({ message: '群id不能为空' })
  @IsOptional()
  groupId: string;

  @ApiProperty({ description: '调用目标字符串' })
  @IsNotEmpty({ message: '调用目标字符串不能为空' })
  @IsOptional()
  invokeTarget: string;

  @ApiProperty({ description: 'cron执行表达式' })
  @IsNotEmpty({ message: 'cron表达式不能为空' })
  @IsOptional()
  cronExpression: string;

  @ApiProperty({ description: '状态（1正常 0暂停）' })
  @IsOptional()
  status: Status;

  @ApiProperty({ description: '备注' })
  @IsOptional()
  remark: string;
}

export class CreateJobDto extends OmitType(BaseJobDto, ['status']) {}

export class UpdateJobDto extends OmitType(BaseJobDto, [
  'jobName',
  'groupId',
]) {}

export class ListJobDto extends IntersectionType(
  BaseJobDto,
  PaginatingDTO,
  StartEndTimeDto,
) {}

export class ListJobLogDto extends ListJobDto {}
