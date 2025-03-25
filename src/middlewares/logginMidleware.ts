import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { LoggerService } from '../services/loggerService';

morgan.token('req-body', (req: Request) => JSON.stringify(req.body));

const loggerFormat = ':remote-addr - :method :url :status :res[content-length] - :response-time ms - :req-body';

export const requestLogger = morgan(loggerFormat, {
  stream: {
    write: (message: string) => {
      LoggerService.info('HTTP Request', { httpLog: message.trim() });
    },
  },
});

// Error logging middleware
export const errorLogger = (err: Error, req: Request, _: Response, next: NextFunction) => {
  LoggerService.error('Unhandled error', {
    error: {
      message: err.message,
      stack: err.stack,
    },
    request: {
      method: req.method,
      url: req.url,
      body: req.body,
    }
  });
  next(err);
};