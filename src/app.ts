import express, { Application } from "express";
import imageRoutes from "./routes/filesRoutes";
import cors from "cors";
import path from "path";
import fs from "fs";
import {LoggerService} from "./services/loggerService";
import { requestLogger} from "./middlewares/logginMidleware";
import {errorHandler} from "./middlewares/errorHandler";
import {AppError} from "./utils/AppError";

export const app: Application = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

LoggerService.initialize();

app.use(requestLogger)

// Basic CORS configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/files-uploader", imageRoutes);

// Handler all other routes
app.all('*', (req, _res, next) => {
  next(new AppError(`Route ${req.originalUrl} introuvable`, 404));
});

app.use(errorHandler);

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Arrêt du serveur...');
  console.error(err.name, err.message);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Arrêt du serveur...');
  console.error(err);
  process.exit(1);
});

export default app;
