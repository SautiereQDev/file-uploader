import {Request, Response, NextFunction} from "express";
import {FileService} from "../services/fileService";
import {LoggerService} from "../services/loggerService";
import path from "path";

export class FileController {
  public static async uploadImage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const basePath = process.env.UPLOAD_PATH ?? "/var/www/cdn";

    LoggerService.debug('Upload request received', {
      contentType: req.headers['content-type'],
      fileInfo: req.file ? {
        originalname: req.file.originalname,
        size: req.file.size
      } : 'No file'
    });

    try {
      if (!req.file) {
        LoggerService.warn('Upload attempt with no file');
        return res.status(400).json({message: "Please provide a file to upload."});
      }

      // Validate and sanitize destination path
      let destinationPath: string | undefined = undefined;
      if (req.body.path) {
        // Sanitize path and remove path traversal sequences
        const sanitizedPath = path.normalize(req.body.path).replace(/^(\.\.(\/|\\|$))+/, '');
        const proposedPath = path.join(basePath, sanitizedPath);

        // Verify the path is within the base directory
        if (proposedPath.startsWith(path.resolve(basePath))) {
          destinationPath = proposedPath;
          LoggerService.debug('Destination path', {path: destinationPath});
        } else {
          LoggerService.warn('Path traversal attempt detected', {path: req.body.path});
          return res.status(400).json({message: "Invalid destination path."});
        }
      }

      if (!destinationPath) {
        LoggerService.warn('Upload attempt with no destination path');
        return res.status(400).json({message: "Please provide a destination path."});
      }

      // Sanitize filename
      const safeFilename = path.basename(req.file.originalname).replace(/[^a-zA-Z0-9_.-]/g, '_');
      const safeFile = {
        ...req.file,
        originalname: safeFilename
      };

      const fileInfo = await FileService.processUploadedFile(safeFile, destinationPath);

      LoggerService.info('File successfully uploaded', {
        filename: fileInfo.filename,
        path: fileInfo.path,
        size: fileInfo.size
      });

      return res.status(201).json({
        message: "File successfully uploaded !",
        data: fileInfo,
      });
    } catch (error) {
      LoggerService.error('Error during upload', {
        error: error instanceof Error ? error.message : String(error)
      });
      next(error);
    }
  }
}