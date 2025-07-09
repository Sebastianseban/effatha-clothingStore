import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Cart } from "../../models/cart.model.js";
import { User } from "../../models/user.model.js";
import { Order } from "../../models/order.model.js";
import { convertCartToOrderItems } from "../../helpers/order.helper.js";

export const placeOrder = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { addressId, paymentMethod = "cod" } = req.body;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  // Fetch cart
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Your cart is empty.");
  }

  // Fetch user and validate selected address
  const user = await User.findById(userId);
  const selectedAddress = user.addresses.find(
    (address) => address._id.toString() === addressId
  );

  if (!selectedAddress) {
    throw new ApiError(404, "Selected address not found.");
  }

  // Convert cart items to order items
  const orderItems = convertCartToOrderItems(cart);

  // Calculate subtotal
  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Create Order
  const order = await Order.create({
    user: userId,
    orderItems,
    shippingAddress: selectedAddress,
    paymentMethod,
    paymentStatus: paymentMethod === "cod" ? "pending" : "processing",
    totalAmount: subtotal,
    status: "pending",
  });

  // Clear cart after placing order
  await Cart.findOneAndDelete({ user: userId });

  return res.status(201).json(
    new ApiResponse(201, order, "Order placed successfully")
  );
});
