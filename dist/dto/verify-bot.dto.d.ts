import { PaginatingDTO, StartEndTimeDto } from './params.dto';
export declare class BaseWhiteListDto {
    groupId: string;
    userId: number;
    userName: string;
    nickName: string;
}
declare const ListWhiteListDto_base: import("@nestjs/mapped-types").MappedType<PaginatingDTO & StartEndTimeDto & BaseWhiteListDto>;
export declare class ListWhiteListDto extends ListWhiteListDto_base {
}
export declare class CreateWhiteListDto extends BaseWhiteListDto {
}
export {};
