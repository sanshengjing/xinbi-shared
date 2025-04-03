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
exports.CreateWhiteListDto = exports.ListWhiteListDto = exports.BaseWhiteListDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const params_dto_1 = require("./params.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class BaseWhiteListDto {
}
exports.BaseWhiteListDto = BaseWhiteListDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '群id' }),
    (0, class_validator_1.IsNotEmpty)({ message: '群id不能为空' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BaseWhiteListDto.prototype, "groupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户id' }),
    (0, class_validator_1.IsNotEmpty)({ message: '用户id不能为空' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], BaseWhiteListDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户名' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BaseWhiteListDto.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户昵称' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BaseWhiteListDto.prototype, "nickName", void 0);
class ListWhiteListDto extends (0, mapped_types_1.IntersectionType)(BaseWhiteListDto, params_dto_1.PaginatingDTO, params_dto_1.StartEndTimeDto) {
}
exports.ListWhiteListDto = ListWhiteListDto;
class CreateWhiteListDto extends BaseWhiteListDto {
}
exports.CreateWhiteListDto = CreateWhiteListDto;
//# sourceMappingURL=verify-bot.dto.js.map