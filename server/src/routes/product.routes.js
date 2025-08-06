import { Router } from "express";
import {
  getHighlightedProducts,
  getNewArrivals,
  getProductBySlug,
  getFilteredHighlights,
  getCollections,
  getSearchedProducts,
} from "../controllers/user/user.product.controller.js";

const router = Router();

router.get("/search", getSearchedProducts);

router.get("/highlights", getFilteredHighlights);


router.get("/highlights/:type", getHighlightedProducts);


router.get("/new-arrivals", getNewArrivals);


router.get("/collections", getCollections);


router.get("/:slug", getProductBySlug);

export default router;
