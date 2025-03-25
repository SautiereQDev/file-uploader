import * as fs from "fs";
      import * as path from "path";

      export class ImageService {
        /**
         * Processing after upload (database saving, etc.)
         */
        public static async processUploadedFile(
          file: Express.Multer.File,
          destinationPath?: string
        ): Promise<{ path: string; filename: string; size: number }> {
          // If a destination path is specified, move the file
          if (destinationPath) {
            // Create the destination directory if it doesn't exist
            const fullDestPath = path.join(process.cwd(), destinationPath);
            if (!fs.existsSync(fullDestPath)) {
              fs.mkdirSync(fullDestPath, { recursive: true });
            }

            // Full path of the destination file
            const destFilePath = path.join(fullDestPath, file.filename);

            // Move the file
            fs.renameSync(file.path, destFilePath);

            return {
              path: path.join(destinationPath, file.filename), // Relative path for the API
              filename: file.filename,
              size: file.size,
            };
          }

          // If no path specified, return the file information as is
          return {
            path: file.path, // Absolute path where the file is stored
            filename: file.filename, // Name of the saved file
            size: file.size,
          };
        }
      }