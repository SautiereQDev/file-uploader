import * as winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';

export class LoggerService {
  private static logger: winston.Logger;

  public static initialize(logDir: string = 'logs'): winston.Logger {
    // Create logs directory if it doesn't exist
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Define log format
    const logFormat = winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    );

    // Create logger instance
    this.logger = winston.createLogger({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      format: logFormat,
      defaultMeta: { service: 'file-uploader' },
      transports: [
        // Write all logs error (and below) to error.log
        new winston.transports.File({
          filename: path.join(logDir, 'error.log'),
          level: 'error'
        }),
        // Write all logs to combined.log
        new winston.transports.File({
          filename: path.join(logDir, 'combined.log')
        }),
      ],
    });

    // If not in production, also log to console
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
      }));
    }

    return this.logger;
  }

  public static getLogger(): winston.Logger {
    if (!this.logger) {
      return LoggerService.initialize();
    }
    return this.logger;
  }

  public static info(message: string, meta?: any): void {
    LoggerService.getLogger().info(message, meta);
  }

  public static error(message: string, meta?: any): void {
    LoggerService.getLogger().error(message, meta);
  }

  public static warn(message: string, meta?: any): void {
    LoggerService.getLogger().warn(message, meta);
  }

  public static debug(message: string, meta?: any): void {
    LoggerService.getLogger().debug(message, meta);
  }
}