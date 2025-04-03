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
export {};
