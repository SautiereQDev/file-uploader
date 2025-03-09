import express, { Application, Request, Response } from "express";
import imageRoutes from "./routes/imagesRoutes";
import cors from "cors";
import path from "path";
import fs from "fs";

export const app: Application = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Basic CORS configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes - simplified to just the upload endpoint
app.use("/images-uploader", imageRoutes);

// Error handling
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: err.message });
});

export default app;
