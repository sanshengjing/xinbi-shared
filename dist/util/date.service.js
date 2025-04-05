"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateService = void 0;
const common_1 = require("@nestjs/common");
const dayjs_1 = __importDefault(require("dayjs"));
const weekOfYear_1 = __importDefault(require("dayjs/plugin/weekOfYear"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(weekOfYear_1.default);
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
dayjs_1.default.tz.setDefault('Asia/Shanghai');
let DateService = class DateService {
    getCurrentDateStr(format = 'YYYY-MM-DD HH:mm:ss') {
        return (0, dayjs_1.default)().tz().format(format);
    }
    getCurrentYMD() {
        return (0, dayjs_1.default)().tz().format('YYYY-MM-DD');
    }
    getFormatByDate(date, format) {
        return (0, dayjs_1.default)(date).tz().format(format);
    }
    getDayjsByDate(date) {
        return (0, dayjs_1.default)(date).tz();
    }
    getHMByDateString(date) {
        return (0, dayjs_1.default)(date).tz().format('HH:mm');
    }
    getStartDate(num = 0) {
        return (0, dayjs_1.default)().tz().add(num).startOf('day').toDate();
    }
    getEndDate(num = 0) {
        return (0, dayjs_1.default)().tz().add(num).endOf('day').toDate();
    }
    getDate(num = 0, unit = 'day') {
        return (0, dayjs_1.default)().tz().add(num, unit).toDate();
    }
    getDayjs(num = 0, unit = 'day') {
        return (0, dayjs_1.default)().tz().add(num, unit);
    }
    getDayjsByStr(dataStr) {
        return (0, dayjs_1.default)(dataStr).tz();
    }
};
exports.DateService = DateService;
exports.DateService = DateService = __decorate([
    (0, common_1.Injectable)()
], DateService);
//# sourceMappingURL=date.service.js.map