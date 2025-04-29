import { Router } from "express";

import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user/user.controller.js";
import { verifyJWT } from "../middlewares/auth.Middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT,logoutUser);

export default router;
