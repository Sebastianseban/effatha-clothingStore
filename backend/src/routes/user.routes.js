import { Router } from "express";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user/user.controller.js";
import { verifyJWT } from "../middlewares/auth.Middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refresh-token").get(refreshAccessToken);
router.route("/me").get(verifyJWT,getCurrentUser);


export default router;
