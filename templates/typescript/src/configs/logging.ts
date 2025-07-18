import type { RequestHandler } from "express";

import winston from "winston";
import morgan, { StreamOptions } from "morgan";
import path from "node:path";

const logDir = process.env.NODE_ENV !== "production" ? "" : "/app/logs";

export const winstonLogger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
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
