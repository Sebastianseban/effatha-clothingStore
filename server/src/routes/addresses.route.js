import { Router } from "express";
import {
  addAddress,
  deleteAddress,
  getAllAddress,
  getDefaultAddress,
  setDefaultAddress,
  updateAddress,
} from "../controllers/user/address.controller.js";

import { verifyJWT } from "../middlewares/auth.Middleware.js";

const router = Router();

router.route("/").post(verifyJWT, addAddress).get(verifyJWT, getAllAddress);

router
  .route("/:addressId")
  .put(verifyJWT, updateAddress)
  .delete(verifyJWT, deleteAddress);

router.patch("/:addressId/default", verifyJWT, setDefaultAddress);

router.get("/default", verifyJWT, getDefaultAddress);
export default router;
