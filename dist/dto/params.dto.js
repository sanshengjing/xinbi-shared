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
exports.StartEndTimeDto = exports.PaginatingDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PaginatingDTO {
}
exports.PaginatingDTO = PaginatingDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: '当前页码',
        default: 1,
    }),
    (0, class_validator_1.IsInt)({ message: 'current 参数只能是 number 类型' }),
    (0, class_validator_1.Min)(1, { message: 'current 参数不能小于 1' }),
    (0, class_validator_1.IsNotEmpty)({ message: '缺少 current 页码参数' }),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    __metadata("design:type", Number)
], PaginatingDTO.prototype, "current", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: '当前页条数',
        default: 10,
    }),
    (0, class_validator_1.IsInt)({ message: 'size 参数只能是 number 类型' }),
    (0, class_validator_1.Min)(1, { message: 'size 参数不能小于 1' }),
    (0, class_validator_1.IsNotEmpty)({ message: '缺少 size 页码参数' }),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    __metadata("design:type", Number)
], PaginatingDTO.prototype, "size", void 0);
class StartEndTimeDto {
}
exports.StartEndTimeDto = StartEndTimeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: '开始日期',
        default: 1721145600000,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value && parseInt(value, 10)),
    __metadata("design:type", Number)
], StartEndTimeDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: '结束日期',
        default: 1721318399999,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value && parseInt(value, 10)),
    __metadata("design:type", Number)
], StartEndTimeDto.prototype, "endTime", void 0);
//# sourceMappingURL=params.dto.js.map