import dayjs from 'dayjs';
export declare class DateService {
    getCurrentDateStr(format?: string): string;
    getCurrentYMD(): string;
    getFormatByDate(date: Date, format: string): string;
    getDayjsByDate(date: Date): dayjs.Dayjs;
    getHMByDateString(date: Date): string;
    getStartDate(num?: number): Date;
    getEndDate(num?: number): Date;
    getDate(num?: number, unit?: dayjs.ManipulateType): Date;
    getDayjs(num?: number, unit?: dayjs.ManipulateType): dayjs.Dayjs;
    getDayjsByStr(dataStr: string): dayjs.Dayjs;
}
