import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { PaginatingDTO, StartEndTimeDto } from './params.dto';
import { IntersectionType } from '@nestjs/mapped-types';

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
