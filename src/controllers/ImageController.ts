import { Request, Response, NextFunction } from "express";
import { ImageService } from "../services/imageService";
import path from "path";

export class ImageController {
  public static async uploadImage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const basePath = process.env.UPLOAD_PATH ?? "/var/www/cdn";

    try {
      // `req.file` est ajouté par Multer si la route utilise `uploadMiddleware.single(...)`
      if (!req.file) {
        return res.status(400).json({ message: "Aucun fichier reçu." });
      }

      // Récupérer le chemin de destination depuis le corps de la requête
      let destinationPath = req.body.path;
      if (destinationPath) {
        // Utiliser le chemin absolu pour le dossier CDN
        destinationPath = path.join(basePath, destinationPath);
      }

      const fileInfo = await ImageService.processUploadedFile(
        req.file,
        destinationPath
      );
      return res.status(201).json({
        message: "Fichier uploadé avec succès !",
        data: fileInfo,
      });
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      next(error);
    }
  }
}
