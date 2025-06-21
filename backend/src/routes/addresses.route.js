import { Router } from "express";
import { addAddress } from "../controllers/user/address.controller.js";

import { verifyJWT } from "../middlewares/auth.Middleware.js";


const router = Router()

router.route("/").post(verifyJWT,addAddress)

export default router;