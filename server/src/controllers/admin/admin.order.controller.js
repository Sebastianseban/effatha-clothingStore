import { asyncHandler } from "../../utils/asyncHandler.js";
import { Order } from "../../models/order.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

// export const getAllOrders = asyncHandler(async (req, res) => {
//   const { status } = req.query;

//   const filter = status ? { orderStatus: status } : {}; // make sure field matches schema

//   const orders = await Order.find(filter)
//     .populate("user", "name email")
//     .populate("items.product", "title price");

//   // 🔹 Transform data for frontend
//   const formattedOrders = orders.map((o) => ({
//     id: o._id,
//     customer: o.user?.email || "Unknown",
//     email: o.user?.email || "N/A",
//     phone: o.shippingAddress?.phone || "N/A",
//     address: `${o.shippingAddress?.street || ""}, ${o.shippingAddress?.city || ""}, ${o.shippingAddress?.state || ""}, ${o.shippingAddress?.postalCode || ""}, ${o.shippingAddress?.country || ""}`.replace(/, ,/g, ","),
//     amount: o.totalAmount,
//     status: o.orderStatus
//       ? o.orderStatus.charAt(0).toUpperCase() + o.orderStatus.slice(1)
//       : "N/A",
//     date: o.createdAt ? new Date(o.createdAt).toISOString().split("T")[0] : "N/A",
//     payment: {
//       method: o.paymentMethod || "N/A",
//       status: o.paymentStatus || "N/A",
//     },
//     items: o.items.map((i) => ({
//       name: i.product?.title || i.title || "Unknown",
//       qty: i.quantity,
//       price: i.product?.price || i.price,
//     })),
//   }));

//   res
//     .status(200)
//     .json(new ApiResponse(200, formattedOrders, "Orders fetched successfully"));
// });
export const getAllOrders = asyncHandler(async (req, res) => {
  const { status, search, dateFrom, dateTo } = req.query;

  // 🔹 Build aggregation pipeline
  const pipeline = [];

  // ✅ Match stage - basic filters
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