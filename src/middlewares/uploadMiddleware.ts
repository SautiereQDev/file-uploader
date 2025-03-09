import multer from "multer";
import path from "path";
import { Request } from "express";
import fs from "fs";

// Assurer que le dossier uploads existe
const uploadsDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuration du stockage : ici, on enregistre temporairement les fichiers dans "uploads/"
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    // Générer un nom de fichier unique
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.originalname.split(".")[0] + "-" + uniqueSuffix + extension);
  },
});

export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // limite de 10MB
});
