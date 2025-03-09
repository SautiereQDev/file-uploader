import * as fs from "fs";
import * as path from "path";

export class ImageService {
  /**
   * Traitement après l'upload (sauvegarde en base de données, etc.)
   */
  public static async processUploadedFile(
    file: Express.Multer.File,
    destinationPath?: string
  ): Promise<{ path: string; filename: string; size: number }> {
    // Si un chemin de destination est spécifié, déplacer le fichier
    if (destinationPath) {
      // Créer le répertoire de destination s'il n'existe pas
      const fullDestPath = path.join(process.cwd(), destinationPath);
      if (!fs.existsSync(fullDestPath)) {
        fs.mkdirSync(fullDestPath, { recursive: true });
      }

      // Chemin complet du fichier de destination
      const destFilePath = path.join(fullDestPath, file.filename);

      // Déplacer le fichier
      fs.renameSync(file.path, destFilePath);

      return {
        path: path.join(destinationPath, file.filename), // Chemin relatif pour l'API
        filename: file.filename,
        size: file.size,
      };
    }

    // Si aucun chemin spécifié, retourner les informations du fichier tel quel
    return {
      path: file.path, // Chemin absolu où le fichier est stocké
      filename: file.filename, // Nom du fichier sauvegardé
      size: file.size,
    };
  }
}
