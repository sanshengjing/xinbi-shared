import dayjs, { type ManipulateType } from 'dayjs';
export declare class DateService {
    getCurrentDateStr(): string;
    getCurrentYMD(): string;
    getFormatByDate(date: Date, format: string): string;
    getDayjsByDate(date: Date): dayjs.Dayjs;
    getHMByDateString(date: Date): string;
    getStartDate(num?: number): Date;
    getEndDate(num?: number): Date;
    getDate(num?: number, unit?: ManipulateType): Date;
    getDayjs(num?: number, unit?: ManipulateType): dayjs.Dayjs;
    getDayjsByStr(dataStr: string): dayjs.Dayjs;
}
