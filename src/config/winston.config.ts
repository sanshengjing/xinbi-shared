import chalk from 'chalk'; // 用于颜色化输出
import { createLogger, format, transports, Logger } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

// 定义日志级别颜色
const levelsColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
  verbose: 'cyan',
};

// 控制台日志格式
const consoleFormat = format.combine(
  format.colorize({
    colors: levelsColors,
  }),
  format.simple(),
  format.printf((info) => {
    // 获取 Info Symbols key
    const symbols = Object.getOwnPropertySymbols(info);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const color = levelsColors[info[symbols[0]] as string]; // 获取日志级别的颜色
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const chalkColor = chalk[color];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return `${chalkColor(info.timestamp)} ${chalkColor(info[symbols[2]])}`;
  }),
);

// 创建 logger 实例
export const winstonLogger: Logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'log-service' },
  transports: [
    // 错误日志
    new DailyRotateFile({
      filename: 'logs/errors/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
    } as DailyRotateFile.DailyRotateFileTransportOptions),
    // 警告日志
    new DailyRotateFile({
      filename: 'logs/warnings/warning-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'warn',
    } as DailyRotateFile.DailyRotateFileTransportOptions),
    // 应用日志
    new DailyRotateFile({
      filename: 'logs/app/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info',
    } as DailyRotateFile.DailyRotateFileTransportOptions),
    // 控制台日志
    new transports.Console({
      format: consoleFormat,
      level: 'debug',
    } as transports.ConsoleTransportOptions),
  ],
});
