import crypto from "crypto";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Cart } from "../../models/cart.model.js";
import { User } from "../../models/user.model.js";
import { Order } from "../../models/order.model.js";
import { convertCartToOrderItems } from "../../utils/order.utils.js";
import { razorpay } from "../../utils/razorpayInstance.js";
 
 export const placeOrder = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { addressId, paymentMethod = "cod" } = req.body;

  if (!userId) throw new ApiError(401, "Unauthorized");

  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart || cart.items.length === 0) throw new ApiError(400, "Your cart is empty.");

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found.");

  const selectedAddress = user.addresses.find(addr => addr._id.toString() === addressId);
  if (!selectedAddress) throw new ApiError(404, "Selected address not found.");

  const orderItems = convertCartToOrderItems(cart);
  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (paymentMethod === "razorpay") {
    const razorpayOrder = await razorpay.orders.create({
      amount: subtotal * 100, // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: userId.toString(),
        addressId: addressId.toString(),
      },
    });

    return res.status(200).json(
      new ApiResponse(200, {
        razorpayOrder,
        key: process.env.RAZORPAY_KEY_ID,
      }, "Razorpay order created")
    );
  }

  // COD flow
  const order = await Order.create({
    user: userId,
    orderItems,
    shippingAddress: selectedAddress,
    paymentMethod: "cod",
    paymentStatus: "pending",
    totalAmount: subtotal,
    status: "pending",
  });

  await Cart.findOneAndDelete({ user: userId });

  return res.status(201).json(new ApiResponse(201, order, "Order placed successfully"));
});



export const verifyRazorpayPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId,
    addressId,
  } = req.body;

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    throw new ApiError(400, "Invalid payment signature");
  }

  const user = await User.findById(userId);
  const selectedAddress = user?.addresses?.find(addr => addr._id.toString() === addressId);
  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!user || !selectedAddress || !cart) {
    throw new ApiError(400, "Invalid user, address, or cart");
  }

  const orderItems = convertCartToOrderItems(cart);
  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const order = await Order.create({
    user: userId,
    orderItems,
    shippingAddress: selectedAddress,
    paymentMethod: "razorpay",
    paymentStatus: "paid",
    paymentDetails: {
      razorpay_order_id,
      razorpay_payment_id,
    },
    totalAmount: subtotal,
    status: "processing",
  });

  await Cart.findOneAndDelete({ user: userId });

  return res.status(201).json(new ApiResponse(201, order, "Order placed successfully"));
});
