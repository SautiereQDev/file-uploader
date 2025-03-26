import * as winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';

export class LoggerService {
  private static logger: winston.Logger;

  public static initialize(logDir: string = 'logs'): winston.Logger {
    // Create logs directory if it doesn't exist
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, {recursive: true});
    }

    // Format de base pour les logs
    const logFormat = winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    );

    // Filtre pour exclure les erreurs (4xx et 5xx)
    const excludeHttpErrorFilter = winston.format((info) => {
      // Si c'est un log HTTP et contient un code 4xx ou 5xx, ne pas l'inclure dans main.log
      if (info.httpLog && /\s[45]\d{2}\s/.test(info.httpLog)) {
        return false;
      }
      return info;
    });

// Filtre pour inclure uniquement les erreurs (4xx et 5xx)
    const includeOnlyHttpErrorFilter = winston.format((info) => {
      // Si c'est un log HTTP avec code 4xx ou 5xx, ou un log niveau error, l'inclure dans error.log
      if ((info.httpLog && /\s[45]\d{2}\s/.test(info.httpLog)) || info.level === 'error') {
        return info;
      }
      return false;
    });

// Puis, modifiez la configuration du transport pour main.log :
    new winston.transports.File({
      filename: path.join(logDir, 'main.log'),
      format: winston.format.combine(
        logFormat,
        excludeHttpErrorFilter()
      )
    })

    // Create logger instance
    this.logger = winston.createLogger({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      format: logFormat,
      defaultMeta: {service: 'file-uploader'},
      transports: [
        // Write only error logs to error.log (HTTP 5xx or explicit error logs)
        new winston.transports.File({
          filename: path.join(logDir, 'error.log'),
          format: winston.format.combine(
            logFormat,
            includeOnlyHttpErrorFilter()
          )
        }),
        // Write all logs to combined.log
        new winston.transports.File({
          filename: path.join(logDir, 'combined.log')
        }),
        // Write only non-error logs to main.log (No HTTP 5xx)
        new winston.transports.File({
          filename: path.join(logDir, 'main.log'),
          format: winston.format.combine(
            logFormat,
            excludeHttpErrorFilter()
          ),
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
}