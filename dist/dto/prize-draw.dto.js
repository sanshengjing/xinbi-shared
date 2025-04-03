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
exports.UpdateGroupDto = exports.CreateGroupDto = exports.ListGroupDto = exports.BaseGroupDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const params_dto_1 = require("./params.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class BaseGroupDto {
}
exports.BaseGroupDto = BaseGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '群id' }),
    (0, class_validator_1.IsNotEmpty)({ message: '群id不能为空' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BaseGroupDto.prototype, "groupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '群名称' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BaseGroupDto.prototype, "groupName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '机器人id' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BaseGroupDto.prototype, "botId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '机器人用户名' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BaseGroupDto.prototype, "botUserName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '机器人昵称' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BaseGroupDto.prototype, "botNickName", void 0);
class ListGroupDto extends (0, mapped_types_1.IntersectionType)(BaseGroupDto, params_dto_1.PaginatingDTO, params_dto_1.StartEndTimeDto) {
}
exports.ListGroupDto = ListGroupDto;
class CreateGroupDto extends BaseGroupDto {
}
exports.CreateGroupDto = CreateGroupDto;
class UpdateGroupDto extends (0, swagger_1.OmitType)(BaseGroupDto, ['groupId']) {
}
exports.UpdateGroupDto = UpdateGroupDto;
//# sourceMappingURL=prize-draw.dto.js.map