import { Router } from "express";
import {
  getHighlightedProducts,
  getNewArrivals,
  getProductBySlug,
  getFilteredHighlights,
  getCollections
} from "../controllers/user/user.product.controller.js";

const router = Router();


router.get("/highlights", getFilteredHighlights);


router.route("/highlights/:type").get(getHighlightedProducts);


router.get("/new-arrivals", getNewArrivals);

router.get("/collections", getCollections);

router.route("/:slug").get(getProductBySlug);



export default router;
