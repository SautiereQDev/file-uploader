import {Router} from "express";
import {FileController} from "../controllers/FileController";
import {uploadMiddleware} from "../middlewares/uploadMiddleware";
import routesInfo from '../data/routesInfo.json';
import {AppError} from "../utils/AppError";

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
  res.json(routesInfo)
})

router.all('*', (req, _res, next) => {
  next(new AppError(`Route ${req.originalUrl} introuvable`, 404));
});

export default router;
