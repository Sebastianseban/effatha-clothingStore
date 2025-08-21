import { asyncHandler } from "../../utils/asyncHandler.js";
import { Order } from "../../models/order.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";


export const getAllOrders = asyncHandler(async (req, res) => {
  const { status, search, dateFrom, dateTo } = req.query;


  const pipeline = [];


  const matchConditions = {};

  if (status && status !== "All") {
    matchConditions.orderStatus = status.toLowerCase();
  }

  if (dateFrom || dateTo) {
    matchConditions.createdAt = {};
    if (dateFrom) {
      matchConditions.createdAt.$gte = new Date(dateFrom);
    }
    if (dateTo) {
      const endDate = new Date(dateTo);
      endDate.setHours(23, 59, 59, 999);
      matchConditions.createdAt.$lte = endDate;
    }
  }

  if (Object.keys(matchConditions).length > 0) {
    pipeline.push({ $match: matchConditions });
  }

  // ✅ Populate user data
  pipeline.push({
    $lookup: {
      from: "users",
      localField: "user",
      foreignField: "_id",
      as: "user",
      pipeline: [{ $project: { name: 1, email: 1 } }]
    }
  });

  // ✅ Populate product data
  pipeline.push({
    $lookup: {
      from: "products",
      localField: "items.product",
      foreignField: "_id",
      as: "products"
    }
  });

  // ✅ Search stage (if search term provided)
  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    
    pipeline.push({
      $match: {
        $or: [
          { _id: { $regex: searchRegex } },
          { "user.name": { $regex: searchRegex } },
          { "user.email": { $regex: searchRegex } },
          { "shippingAddress.phone": { $regex: searchRegex } },
          { "shippingAddress.street": { $regex: searchRegex } },
          { "shippingAddress.city": { $regex: searchRegex } },
          { orderStatus: { $regex: searchRegex } },
          { totalAmount: { $regex: searchRegex } }
        ]
      }
    });
  }

  // ✅ Sort by creation date (newest first)
  pipeline.push({ $sort: { createdAt: -1 } });

  console.log("🔍 Aggregation Pipeline:", JSON.stringify(pipeline, null, 2));

  // Execute aggregation
  const orders = await Order.aggregate(pipeline);

  // 🔹 Transform data for frontend
  const formattedOrders = orders.map((o) => ({
    id: o._id,
    customer: o.user?.[0]?.name || o.user?.[0]?.email || "Unknown",
    email: o.user?.[0]?.email || "N/A",
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
    items: o.items.map((item, index) => {
      const product = o.products?.find(p => p._id.toString() === item.product?.toString());
      return {
        id: item._id,
        name: product?.title || item.title || "Unknown",
        qty: item.quantity,
        price: product?.price || item.price,
      };
    }),
  }));

  console.log(`📊 Found ${formattedOrders.length} orders`);

  res
    .status(200)
    .json(new ApiResponse(200, formattedOrders, "Orders fetched successfully"));
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!id) {
    return res.status(400).json(new ApiResponse(400, null, "Order ID is required"));
  }

  if (!status) {
    return res.status(400).json(new ApiResponse(400, null, "Status is required"));
  }

  const validStatuses = ["processing", "shipped", "delivered", "cancelled"];
  const normalizedStatus = status.toLowerCase();

  if (!validStatuses.includes(normalizedStatus)) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, `Invalid status. Must be one of: ${validStatuses.join(", ")}`));
  }

  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json(new ApiResponse(404, null, "Order not found"));
  }

  // Optional: Prevent invalid transitions
  const statusTransitions = {
    processing: ["shipped", "cancelled"],
    shipped: ["delivered"],
    delivered: [],
    cancelled: [],
  };

  const currentStatus = order.orderStatus?.toLowerCase();
  if (currentStatus && statusTransitions[currentStatus]?.length > 0) {
    if (!statusTransitions[currentStatus].includes(normalizedStatus)) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, `Cannot change status from ${currentStatus} to ${normalizedStatus}`));
    }
  }

  // Update order
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { orderStatus: normalizedStatus, updatedAt: new Date() },
    { new: true, runValidators: true }
  )
    .populate("user", "name email")
    .populate("items.product", "title price");

  if (!updatedOrder) {
    return res.status(500).json(new ApiResponse(500, null, "Failed to update order"));
  }

  // Format response
  const formattedOrder = {
    id: updatedOrder._id,
    customer: updatedOrder.user?.name || updatedOrder.user?.email || "Unknown",
    email: updatedOrder.user?.email || "N/A",
    amount: updatedOrder.totalAmount,
    status: updatedOrder.orderStatus,
    date: updatedOrder.createdAt ? new Date(updatedOrder.createdAt).toISOString().split("T")[0] : "N/A",
    items: updatedOrder.items.map((i) => ({
      id: i._id,
      name: i.product?.title || "Unknown",
      qty: i.quantity,
      price: i.product?.price || i.price,
    })),
  };

  console.log(`📦 Order ${id} status updated to: ${normalizedStatus}`);

  return res
    .status(200)
    .json(new ApiResponse(200, formattedOrder, `Order status updated to ${normalizedStatus} successfully`));
});