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
  if (!cart || cart.items.length === 0)
    throw new ApiError(400, "Your cart is empty");

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const selectedAddress = user.addresses.find(
    (addr) => addr._id.toString() === addressId
  );
  if (!selectedAddress) throw new ApiError(404, "Selected address not found");

  const items = convertCartToOrderItems(cart);
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (paymentMethod === "razorpay") {
    const razorpayOrder = await razorpay.orders.create({
      amount: subtotal * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: userId.toString(),
        addressId: addressId.toString(),
      },
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          razorpayOrder,
          key: process.env.RAZORPAY_KEY_ID,
        },
        "Razorpay order created"
      )
    );
  }

  // === COD Order Creation ===
  const order = await Order.create({
    user: userId,
    items,
    shippingAddress: selectedAddress,
    paymentMethod: "cod",
    paymentStatus: "pending",
    orderStatus: "processing",
    totalAmount: subtotal,
  });

  await Cart.findOneAndDelete({ user: userId });

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order placed successfully"));
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
    throw new ApiError(400, "Invalid Razorpay signature");
  }

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const selectedAddress = user.addresses.find(
    (addr) => addr._id.toString() === addressId
  );
  if (!selectedAddress)
    throw new ApiError(404, "Selected address not found");

  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart || cart.items.length === 0)
    throw new ApiError(400, "Your cart is empty");

  const items = convertCartToOrderItems(cart);
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const order = await Order.create({
    user: userId,
    items,
    shippingAddress: selectedAddress,
    paymentMethod: "razorpay",
    paymentStatus: "paid",
    orderStatus: "processing",
    paymentDetails: {
      razorpay_order_id,
      razorpay_payment_id,
    },
    totalAmount: subtotal,
  });

  await Cart.findOneAndDelete({ user: userId });

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order placed successfully"));
});


export const getMyOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const orders = await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("items.product", "title price images");

  if (!orders || orders.length === 0) {
    throw new ApiError(404, "No orders found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});


export const getOrderById = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { orderId } = req.params;

  const order = await Order.findOne({ _id: orderId, user: userId }).populate(
    "items.product",
    "title price images"
  );

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order details fetched successfully"));
});
