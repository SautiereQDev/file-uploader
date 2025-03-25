import {Router} from "express";
import {FileController} from "../controllers/FileController";
import {uploadMiddleware} from "../middlewares/uploadMiddleware";

const router = Router();

/**
 * Route to upload a file
 * — “file” is the expected field name in the form
 * — “path” is the destination path (optional)
 */
router.post(
  "/",
  uploadMiddleware.single("file"),
  FileController.uploadImage
);

/**
 * Helper route to display api informations
 */
router.get('/', (req, res) => {
  res.json({

    name: "File Upload API",
    version: "1.0.0",
    author: "Quentin Sautiere (SautiereQDev)",
    message: 'This is an api to upload files on a server',
    endpoints: [
      {
        method: 'POST',
        type: "multipart/form-data",
        body: {
          file: 'file to upload, required',
          path: 'destination path, optional'
        }
      }, {
        method: 'GET',
        type: "application/json",
      }
    ],
    licence: "Apache-2.0 - All rights reserved",
    contact: "contact@quentinsautiere.com"
  })
})

export default router;
