"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateService = void 0;
const common_1 = require("@nestjs/common");
const dayjs = require("dayjs");
const weekOfYear = require("dayjs/plugin/weekOfYear");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(weekOfYear);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Shanghai');
let DateService = class DateService {
    getCurrentDateStr() {
        return dayjs().tz().format('YYYY-MM-DD HH:mm:ss.SSS');
    }
    getCurrentYMD() {
        return dayjs().tz().format('YYYY-MM-DD');
    }
    getFormatByDate(date, format) {
        return dayjs(date).tz().format(format);
    }
    getDayjsByDate(date) {
        return dayjs(date).tz();
    }
    getHMByDateString(date) {
        return dayjs(date).tz().format('HH:mm');
    }
    getStartDate(num = 0) {
        return dayjs().tz().add(num).startOf('day').toDate();
    }
    getEndDate(num = 0) {
        return dayjs().tz().add(num).endOf('day').toDate();
    }
    getDate(num = 0, unit = 'day') {
        return dayjs().tz().add(num, unit).toDate();
    }
    getDayjs(num = 0, unit = 'day') {
        return dayjs().tz().add(num, unit);
    }
    getDayjsByStr(dataStr) {
        return dayjs(dataStr).tz();
    }
};
exports.DateService = DateService;
exports.DateService = DateService = __decorate([
    (0, common_1.Injectable)()
], DateService);
//# sourceMappingURL=date.service.js.map