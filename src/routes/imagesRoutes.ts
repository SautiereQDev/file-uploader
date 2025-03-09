import { Router } from "express";
import { ImageController } from "../controllers/ImageController";
import { uploadMiddleware } from "../middlewares/uploadMiddleware";

const router = Router();

/**
 * Route pour uploader un fichier
 * - "file" correspond au nom du champ attendu dans le formulaire
 * - "path" est le chemin de destination (optionnel)
 */
router.post(
  "/upload",
  uploadMiddleware.single("file"),
  ImageController.uploadImage
);

export default router;
