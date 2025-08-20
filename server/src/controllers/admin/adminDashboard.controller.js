import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from "../../models/user.model.js";
import { Order } from "../../models/order.model.js";
import { Product } from "../../models/product.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalRevenueAgg = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);
  const deliveriesCompleted = await Order.countDocuments({
    orderStatus: "delivered",
  });
  const outOfStock = await Product.aggregate([
    { $unwind: "$variants" },
    { $unwind: "$variants.sizes" },
    { $match: { "variants.sizes.quantity": { $lte: 0 } } },
    { $count: "count" },
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalUsers,
        totalOrders,
        totalRevenue: `$${totalRevenueAgg[0]?.total || 0}`,
        deliveriesCompleted,
        totalProducts,
        outOfStock: outOfStock[0]?.count || 0,
      },
      "Dashboard stats fetched"
    )
  );
});

export const getRecentOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "firstName lastName")
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  const mapped = orders.map(o => ({
    id: `#${o._id.toString().slice(-4)}`, 
    customer: `${o.user.firstName} ${o.user.lastName}`,
    date: o.createdAt.toISOString().split("T")[0],
    status: o.orderStatus,
    total: `$${o.totalAmount.toFixed(2)}`
  }));

  res.status(200).json(new ApiResponse(200, mapped, "Recent orders fetched"));
});

export const getLowStockProducts = asyncHandler(async (req, res) => {
  const threshold = parseInt(req.query.threshold || "5");
  const products = await Product.aggregate([
    { $unwind: "$variants" },
    { $unwind: "$variants.sizes" },
    { $match: { "variants.sizes.quantity": { $lte: threshold } } },
    {
      $project: {
        name: "$title",
        variant: {
          $concat: ["$variants.color", " / ", "$variants.sizes.size"]
        },
        stock: "$variants.sizes.quantity"
      }
    },
    { $sort: { stock: 1 } },
    { $limit: 10 }
  ]);

  res.status(200).json(new ApiResponse(200, products, "Low stock products fetched"));
});

export const getRevenueData = asyncHandler(async (req, res) => {
  const revenue = await Order.aggregate([
    {
      $group: {
        _id: { month: { $month: "$createdAt" } },
        total: { $sum: "$totalAmount" }
      }
    },
    { $sort: { "_id.month": 1 } }
  ]);

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const chartData = months.map((m, i) => ({
    month: m,
    revenue: revenue.find(r => r._id.month === i + 1)?.total || 0
  }));

  res.status(200).json(new ApiResponse(200, chartData, "Monthly revenue data fetched"));
});

export const getOrderStatusData = asyncHandler(async (req, res) => {
  const data = await Order.aggregate([
    { $group: { _id: "$orderStatus", count: { $sum: 1 } } }
  ]);

  const mapped = data.map(d => ({
    name: d._id.charAt(0).toUpperCase() + d._id.slice(1),
    value: d.count
  }));

  res.status(200).json(new ApiResponse(200, mapped, "Order status data fetched"));
});

export const getTopProducts = asyncHandler(async (req, res) => {
  const topProducts = await Order.aggregate([
    // Only delivered orders should count as sales
    { $match: { orderStatus: "delivered" } },

    // Break items[] into individual documents
    { $unwind: "$items" },

    // Group by productId and sum total sold quantity
    {
      $group: {
        _id: "$items.product",
        totalSold: { $sum: "$items.quantity" },
      },
    },

    // Sort products by total sales in descending order
    { $sort: { totalSold: -1 } },

    // Limit to top 5
    { $limit: 5 },

    // Lookup product details from products collection
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },

    // Remove products that no longer exist
    { $unwind: { path: "$product", preserveNullAndEmptyArrays: false } },

    // Final shape of response
    {
      $project: {
        _id: 0,
        name: "$product.title",
        sales: "$totalSold",
        brand: "$product.brand",
        image: "$product.image",
      },
    },
  ]);

  res
    .status(200)
    .json(new ApiResponse(200, topProducts, "Top products fetched"));
});


export const getUserRoleData = asyncHandler(async (req, res) => {
  const data = await User.aggregate([
    { $group: { _id: "$role", count: { $sum: 1 } } }
  ]);

  const mapped = data.map(d => {
    const role = d._id || "Unknown";
    return {
      name: role.charAt(0).toUpperCase() + role.slice(1),
      value: d.count
    };
  });

  res
    .status(200)
    .json(new ApiResponse(200, mapped, "User role data fetched"));
});



