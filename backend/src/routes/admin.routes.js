import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createProduct } from "../controllers/admin/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.Middleware.js";
import { adminOnly } from "../middlewares/adminOnly.js";

const router = Router();

router
  .route("/add-product")
  .post(
    upload.fields([
      { name: "images_0", maxCount: 5 },
      { name: "images_1", maxCount: 5 },
      { name: "images_2", maxCount: 5 },
      { name: "images_3", maxCount: 5 },
      { name: "images_4", maxCount: 5 },
      { name: "images_5", maxCount: 5 },
      { name: "images_6", maxCount: 5 },
      { name: "images_7", maxCount: 5 },
      
    ]),
    createProduct
  );

export default router;
