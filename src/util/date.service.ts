import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(weekOfYear);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Shanghai');

@Injectable()
export class DateService {
  getCurrentDateStr(format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    return dayjs().tz().format(format);
  }

  // 2023-01-01
  getCurrentYMD() {
    return dayjs().tz().format('YYYY-MM-DD');
  }

  getFormatByDate(date: Date, format: string) {
    return dayjs(date).tz().format(format);
  }

  getDayjsByDate(date: Date) {
    return dayjs(date).tz();
  }

  getHMByDateString(date: Date) {
    return dayjs(date).tz().format('HH:mm');
  }

  getStartDate(num: number = 0) {
    return dayjs().tz().add(num).startOf('day').toDate();
  }

  getEndDate(num: number = 0) {
    return dayjs().tz().add(num).endOf('day').toDate();
  }

  getDate(num: number = 0, unit: dayjs.ManipulateType = 'day') {
    return dayjs().tz().add(num, unit).toDate();
  }

  getDayjs(num: number = 0, unit: dayjs.ManipulateType = 'day') {
    return dayjs().tz().add(num, unit);
  }

  getDayjsByStr(dataStr: string) {
    return dayjs(dataStr).tz();
  }
}
