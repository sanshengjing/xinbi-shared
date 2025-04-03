import { PaginatingDTO, StartEndTimeDto } from './params.dto';
declare enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}
export declare class BaseJobDto {
    jobName: string;
    serviceName: string;
    groupId: string;
    invokeTarget: string;
    cronExpression: string;
    status: Status;
    remark: string;
}
declare const CreateJobDto_base: import("@nestjs/common").Type<Omit<BaseJobDto, "status">>;
export declare class CreateJobDto extends CreateJobDto_base {
}
declare const UpdateJobDto_base: import("@nestjs/common").Type<Omit<BaseJobDto, "groupId" | "jobName">>;
export declare class UpdateJobDto extends UpdateJobDto_base {
}
declare const ListJobDto_base: import("@nestjs/mapped-types").MappedType<PaginatingDTO & StartEndTimeDto & BaseJobDto>;
export declare class ListJobDto extends ListJobDto_base {
}
export declare class ListJobLogDto extends ListJobDto {
}
export {};
