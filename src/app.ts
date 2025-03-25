import express, { Application, Request, Response } from "express";
import imageRoutes from "./routes/imagesRoutes";
import cors from "cors";
import path from "path";
import fs from "fs";
import {LoggerService} from "./services/loggerService";
import {errorLogger, requestLogger} from "./middlewares/logginMidleware";

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

app.use(errorLogger);

app.use((err: Error, _: Request, res: Response) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: err.message });
});

export default app;
