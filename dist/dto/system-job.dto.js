"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListJobLogDto = exports.ListJobDto = exports.UpdateJobDto = exports.CreateJobDto = exports.BaseJobDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const params_dto_1 = require("./params.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
var Status;
(function (Status) {
    Status["ACTIVE"] = "ACTIVE";
    Status["INACTIVE"] = "INACTIVE";
})(Status || (Status = {}));
class BaseJobDto {
}
exports.BaseJobDto = BaseJobDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '任务名称' }),
    (0, class_validator_1.IsNotEmpty)({ message: '任务名称不能为空' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BaseJobDto.prototype, "jobName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '服务名称' }),
    (0, class_validator_1.IsNotEmpty)({ message: '服务名称不能为空' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BaseJobDto.prototype, "serviceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '群id' }),
    (0, class_validator_1.IsNotEmpty)({ message: '群id不能为空' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BaseJobDto.prototype, "groupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '调用目标字符串' }),
    (0, class_validator_1.IsNotEmpty)({ message: '调用目标字符串不能为空' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BaseJobDto.prototype, "invokeTarget", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'cron执行表达式' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'cron表达式不能为空' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BaseJobDto.prototype, "cronExpression", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '状态（1正常 0暂停）' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BaseJobDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '备注' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BaseJobDto.prototype, "remark", void 0);
class CreateJobDto extends (0, swagger_1.OmitType)(BaseJobDto, ['status']) {
}
exports.CreateJobDto = CreateJobDto;
class UpdateJobDto extends (0, swagger_1.OmitType)(BaseJobDto, [
    'jobName',
    'groupId',
]) {
}
exports.UpdateJobDto = UpdateJobDto;
class ListJobDto extends (0, mapped_types_1.IntersectionType)(BaseJobDto, params_dto_1.PaginatingDTO, params_dto_1.StartEndTimeDto) {
}
exports.ListJobDto = ListJobDto;
class ListJobLogDto extends ListJobDto {
}
exports.ListJobLogDto = ListJobLogDto;
//# sourceMappingURL=system-job.dto.js.map