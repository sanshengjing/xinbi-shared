import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { PaginatingDTO, StartEndTimeDto } from './params.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';

export class BaseGroupDto {
  @ApiProperty({ description: '群id' })
  @IsNotEmpty({ message: '群id不能为空' })
  @IsOptional()
  groupId: string;

  @ApiProperty({ description: '群名称' })
  @IsOptional()
  groupName: string;

  @ApiProperty({ description: '机器人id' })
  @IsOptional()
  botId: string;

  @ApiProperty({ description: '机器人用户名' })
  @IsOptional()
  botUserName: string;

  @ApiProperty({ description: '机器人昵称' })
  @IsOptional()
  botNickName: string;
}

export class ListGroupDto extends IntersectionType(
  BaseGroupDto,
  PaginatingDTO,
  StartEndTimeDto,
) {}

export class CreateGroupDto extends BaseGroupDto {}

export class UpdateGroupDto extends OmitType(BaseGroupDto, ['groupId']) {}


export class BaseRuleDto {
  @ApiProperty({ description: '标题' })
  @IsNotEmpty({ message: '标题不能为空' })
  title: string;

  @ApiProperty({ description: '描述' })
  @IsNotEmpty({ message: '描述不能为空' })
  desc: string;

  @ApiProperty({ description: '最大参与人数' })
  @IsNotEmpty({ message: '参与人数不能为空' })
  @Transform(({ value }) => value && parseInt(value, 10))
  numOfPart: number;

  @ApiProperty({ description: '中奖人数' })
  @IsNotEmpty({ message: '中奖人数不能为空' })
  @Transform(({ value }) => value && parseInt(value, 10))
  numOfWin: number;

  @ApiProperty({ description: '有效时长（分钟）' })
  @IsNotEmpty({ message: '有效时长不能为空' })
  @Transform(({ value }) => value && parseInt(value, 10))
  validDuration: number;
}

export class ListRuleDto extends IntersectionType(
  BaseRuleDto,
  PaginatingDTO,
  StartEndTimeDto,
) {}

export class CreateRuleDto extends BaseRuleDto {}

export class UpdateRuleDto extends BaseRuleDto {}