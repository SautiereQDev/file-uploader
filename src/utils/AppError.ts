export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(statusCode === 404 ? "Route introuvable, consulter GET /file-uploader pour plus d'informations" : message);
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}