import { PaginatingDTO, StartEndTimeDto } from './params.dto';
export declare class BaseGroupDto {
    groupId: string;
    groupName: string;
    botId: string;
    botUserName: string;
    botNickName: string;
}
declare const ListGroupDto_base: import("@nestjs/mapped-types").MappedType<PaginatingDTO & StartEndTimeDto & BaseGroupDto>;
export declare class ListGroupDto extends ListGroupDto_base {
}
export declare class CreateGroupDto extends BaseGroupDto {
}
declare const UpdateGroupDto_base: import("@nestjs/common").Type<Omit<BaseGroupDto, "groupId">>;
export declare class UpdateGroupDto extends UpdateGroupDto_base {
}
export declare class BaseRuleDto {
    title: string;
    desc: string;
    numOfPart: number;
    numOfWin: number;
    validDuration: number;
}
declare const ListRuleDto_base: import("@nestjs/mapped-types").MappedType<PaginatingDTO & StartEndTimeDto & BaseRuleDto>;
export declare class ListRuleDto extends ListRuleDto_base {
}
export declare class CreateRuleDto extends BaseRuleDto {
}
export declare class UpdateRuleDto extends BaseRuleDto {
}
export {};
