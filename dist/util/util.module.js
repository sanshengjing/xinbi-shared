"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilModule = void 0;
const common_1 = require("@nestjs/common");
const date_service_1 = require("./date.service");
const number_service_1 = require("./number.service");
const string_service_1 = require("./string.service");
let UtilModule = class UtilModule {
};
exports.UtilModule = UtilModule;
exports.UtilModule = UtilModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [date_service_1.DateService, number_service_1.NumberService, string_service_1.StringService],
        exports: [date_service_1.DateService, number_service_1.NumberService, string_service_1.StringService],
    })
], UtilModule);
//# sourceMappingURL=util.module.js.map