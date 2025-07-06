import express from "express";
import { verifyJWT } from "../middlewares/auth.Middleware.js";
import {
  addToCart,
  getUserCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../controllers/user/user.cart.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.route("/").post(addToCart).get(getUserCart);
// router.delete("/:itemId", removeFromCart);
// router.patch("/:itemId", updateCartItemQuantity);
router.route("/:itemId").delete(removeFromCart).patch(updateCartItemQuantity)


export default router;
