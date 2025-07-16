import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.Middleware.js'
import { placeOrder, verifyRazorpayPayment } from '../controllers/user/user.order.controller.js'

const router = Router()


router.use(verifyJWT)

router.route("/").get(placeOrder)
router.post("/verify-razorpay", verifyRazorpayPayment);

export default router;  