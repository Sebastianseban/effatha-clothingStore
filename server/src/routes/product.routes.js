import { Router } from "express";
import {
  getHighlightedProducts,
  getNewArrivals,
  getProductBySlug,
  getFilteredHighlights
} from "../controllers/user/user.product.controller.js";

const router = Router();


router.get("/highlights", getFilteredHighlights);


router.route("/highlights/:type").get(getHighlightedProducts);


router.get("/new-arrivals", getNewArrivals);


router.route("/:slug").get(getProductBySlug);

export default router;
