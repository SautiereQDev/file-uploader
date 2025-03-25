import {Router} from "express";
import {ImageController} from "../controllers/ImageController";
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
  ImageController.uploadImage
);

export default router;
