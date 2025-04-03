import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { PaginatingDTO, StartEndTimeDto } from './params.dto';
import { IntersectionType } from '@nestjs/mapped-types';

export class BaseWhiteListDto {
  @ApiProperty({ description: '群id' })
  @IsNotEmpty({ message: '群id不能为空' })
  @IsOptional()
  groupId: string;

  @ApiProperty({ description: '用户id' })
  @IsNotEmpty({ message: '用户id不能为空' })
  @IsOptional()
  userId: number;

  @ApiProperty({ description: '用户名' })
  @IsOptional()
  userName: string;

  @ApiProperty({ description: '用户昵称' })
  @IsOptional()
  nickName: string;
}

export class ListWhiteListDto extends IntersectionType(
  BaseWhiteListDto,
  PaginatingDTO,
  StartEndTimeDto,
) {}

export class CreateWhiteListDto extends BaseWhiteListDto {}
