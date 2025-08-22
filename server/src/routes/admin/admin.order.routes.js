import { verifyJWT } from "../../middlewares/auth.Middleware.js";
import { adminOnly } from "../../middlewares/adminOnly.js";
import { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../../controllers/admin/admin.order.controller.js";

const router = Router();

router.use(verifyJWT, adminOnly);

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.patch("/:id", updateOrderStatus);

export default router;
