import { Router } from "express";
import {
  getDashboardStats,
  getRecentOrders,
  getLowStockProducts,
  getRevenueData,
  getOrderStatusData,
  getTopProducts,
  getUserRoleData
} from "../controllers/admin/adminDashboard.controller.js";
import { verifyJWT } from "../middlewares/auth.Middleware.js";
import { adminOnly } from "../middlewares/adminOnly.js";

const router = Router();

router.use(verifyJWT,adminOnly)


router.get("/stats", getDashboardStats);
router.get("/recent-orders", getRecentOrders);
router.get("/low-stock", getLowStockProducts);
router.get("/revenue", getRevenueData);
router.get("/order-status", getOrderStatusData);
router.get("/top-products", getTopProducts);
router.get("/user-roles", getUserRoleData);

export default router;
