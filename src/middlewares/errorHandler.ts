// middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  _: Request,
  res: Response,
) => {
  err.statusCode = err.statusCode ?? 500;
  err.status = err.status ?? 'error';

  // Erreur en développement: renvoyer les détails
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }
  // Erreur en production: ne pas exposer les détails d'erreur
  else {
    // Erreur opérationnelle, erreur de confiance: envoyer message au client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
    // Erreur de programmation ou autre erreur non prévue: ne pas divulguer les détails
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Une erreur est survenue, merci de réessayer plus tard'
    });
  }
};