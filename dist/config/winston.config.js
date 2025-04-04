"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonLogger = void 0;
const chalk_1 = __importDefault(require("chalk"));
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const levelsColors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
    verbose: 'cyan',
};
const consoleFormat = winston_1.format.combine(winston_1.format.colorize({
    colors: levelsColors,
}), winston_1.format.simple(), winston_1.format.printf((info) => {
    const symbols = Object.getOwnPropertySymbols(info);
    const color = levelsColors[info[symbols[0]]];
    const chalkColor = chalk_1.default[color];
    return `${chalkColor(info.timestamp)} ${chalkColor(info[symbols[2]])}`;
}));
exports.winstonLogger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json()),
    defaultMeta: { service: 'log-service' },
    transports: [
        new winston_daily_rotate_file_1.default({
            filename: 'logs/errors/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'error',
        }),
        new winston_daily_rotate_file_1.default({
            filename: 'logs/warnings/warning-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'warn',
        }),
        new winston_daily_rotate_file_1.default({
            filename: 'logs/app/app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'info',
        }),
        new winston_1.transports.Console({
            format: consoleFormat,
            level: 'debug',
        }),
    ],
});
//# sourceMappingURL=winston.config.js.map