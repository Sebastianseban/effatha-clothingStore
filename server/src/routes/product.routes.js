import { Router } from "express";
import { getHighlightedProducts, getNewArrivals, getProductBySlug } from "../controllers/user/user.product.controller.js";

const router = Router()

router.route("/highlights/:type").get(getHighlightedProducts)
router.route("/:slug").get(getProductBySlug);
router.get("/new-arrivals", getNewArrivals);

export default router;