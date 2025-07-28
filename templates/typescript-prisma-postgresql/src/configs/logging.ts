import type { RequestHandler } from "express";

import winston from "winston";
import morgan, { StreamOptions } from "morgan";
import path from "node:path";

const logDir = process.env.NODE_ENV !== "production" ? "" : "/app/logs";

const consoleFormat = winston.format.printf(
    ({ level, message, label, timestamp, stack, ...meta }) => {
        let output = `${timestamp} [${label}] ${level}: ${message}`;
        if (stack) {
            output += `\n${stack}`;
        }
        if (Object.keys(meta).length) {
            output += `\n${JSON.stringify(meta, null, 2)}`;
        }
        return output;
    },
);

export const winstonLogger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.label({ label: process.env.NODE_ENV === "production" ? "prod" : "dev" }),
                winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                consoleFormat,
            ),
        }),
        new winston.transports.File({
            filename: path.join(logDir, "error.log"),
            level: "error",
        }),
        new winston.transports.File({
            filename: path.join(logDir, "combined.log"),
        }),
    ],
});

const formatFn = morgan.compile(
    process.env.NODE_ENV === "production" ? "combined" : "dev",
);

const stream: StreamOptions = {
    write: (msg: string) => {
        winstonLogger.info(msg.trim());
    },
};

export const morganMiddleware: RequestHandler = morgan(formatFn, {
    stream,
});
