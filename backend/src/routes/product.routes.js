import { Router } from "express";
import { getHighlightedProducts } from "../controllers/user/user.product.controller.js";

const router = Router()

router.route("/highlights/:type").get(getHighlightedProducts)

export default router;