import express from "express";
import { verifyJWT } from "../middlewares/auth.Middleware.js";
import {
  addToCart,
  getUserCart,
  removeFromCart,
} from "../controllers/user/user.cart.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.route("/").post(addToCart).get(getUserCart);
router.delete("/:itemId", removeFromCart);


export default router;
