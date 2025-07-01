import express from "express";
import { verifyJWT } from "../middlewares/auth.Middleware.js";
import { addToCart } from "../controllers/user/user.cart.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.route("/").post(addToCart);

export default router;
