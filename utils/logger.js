const { transports, createLogger, format } = require("winston");
require("winston-daily-rotate-file");

const { combine, timestamp, printf } = format;

const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: "boilerplate-api-express-%DATE%.log",
    dirname: "./logs",
    maxFiles: "30d",
});

const consoleTransport = new transports.Console();

const logger = createLogger({
    level: "info",
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}] ${message}`;
        }),
    ),
    transports: [dailyRotateFileTransport, consoleTransport],
});

module.exports = logger;
