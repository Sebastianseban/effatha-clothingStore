import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createProduct } from "../controllers/admin/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.Middleware.js";
import { adminOnly } from "../middlewares/adminOnly.js";

const router = Router();

router
  .route("/add-product")
  .post(
    upload.fields([{ name: "images", maxCount: 5 }]),
    verifyJWT,
    adminOnly,
    createProduct
  );

export default router;
