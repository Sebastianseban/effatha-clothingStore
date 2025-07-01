import { Router } from "express";
import { getHighlightedProducts, getProductBySlug } from "../controllers/user/user.product.controller.js";

const router = Router()

router.route("/highlights/:type").get(getHighlightedProducts)
router.route("/:slug").get(getProductBySlug);


export default router;