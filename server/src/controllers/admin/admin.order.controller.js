import { asyncHandler } from "../../utils/asyncHandler.js";
import { Order } from "../../models/order.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const getAllOrders = asyncHandler(async (req, res) => {
  const { status } = req.query;

  const filter = status ? { orderStatus: status } : {}; // make sure field matches schema

  const orders = await Order.find(filter)
    .populate("user", "name email")
    .populate("items.product", "title price");

  // 🔹 Transform data for frontend
  const formattedOrders = orders.map((o) => ({
    id: o._id,
    customer: o.user?.email || "Unknown",
    email: o.user?.email || "N/A",
    phone: o.shippingAddress?.phone || "N/A",
    address: `${o.shippingAddress?.street || ""}, ${o.shippingAddress?.city || ""}, ${o.shippingAddress?.state || ""}, ${o.shippingAddress?.postalCode || ""}, ${o.shippingAddress?.country || ""}`.replace(/, ,/g, ","),
    amount: o.totalAmount,
    status: o.orderStatus
      ? o.orderStatus.charAt(0).toUpperCase() + o.orderStatus.slice(1)
      : "N/A",
    date: o.createdAt ? new Date(o.createdAt).toISOString().split("T")[0] : "N/A",
    payment: {
      method: o.paymentMethod || "N/A",
      status: o.paymentStatus || "N/A",
    },
    items: o.items.map((i) => ({
      name: i.product?.title || i.title || "Unknown",
      qty: i.quantity,
      price: i.product?.price || i.price,
    })),
  }));

  res
    .status(200)
    .json(new ApiResponse(200, formattedOrders, "Orders fetched successfully"));
});
