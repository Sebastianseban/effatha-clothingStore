
import {
  FiUsers, FiShoppingCart, FiDollarSign, FiTruck,
  FiPackage, FiAlertTriangle, FiSearch,
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

import {
  PieChart, Pie, Cell, Tooltip as ReTooltip, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, LineChart, Line, Legend, ResponsiveContainer
} from "recharts";

import { useGetDashboardStats } from "../../hooks/admin/useGetDashboardStats";
import { useGetRecentOrders } from "../../hooks/admin/useGetRecentOrders";
import { useGetLowStockProducts } from "../../hooks/admin/useGetLowStockProducts";
import { useGetRevenueData } from "../../hooks/admin/useGetRevenueData";
import { useGetOrderStatusData } from "../../hooks/admin/useGetOrderStatusData";
import { useGetTopProducts } from "../../hooks/admin/useGetTopProducts";
import { useGetUserRoleData } from "../../hooks/admin/useGetUserRoleData";

const COLORS = ["#3b82f6", "#10b981", "#ef4444", "#f59e0b", "#8b5cf6", "#ec4899"];

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useGetDashboardStats();
  const { data: recentOrders, isLoading: ordersLoading } = useGetRecentOrders();
  const { data: lowStock, isLoading: lowStockLoading } = useGetLowStockProducts();
  const { data: revenueData, isLoading: revenueLoading } = useGetRevenueData();
  const { data: orderStatusData, isLoading: statusLoading } = useGetOrderStatusData();
  const { data: topProductsData, isLoading: topProductsLoading } = useGetTopProducts();
  const { data: userRoleData, isLoading: userRoleLoading } = useGetUserRoleData();

  if (
    statsLoading || ordersLoading || lowStockLoading ||
    revenueLoading || statusLoading || topProductsLoading || userRoleLoading
  ) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">📊 Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>
          <FaUserCircle className="text-3xl text-gray-600 hover:text-gray-800 cursor-pointer transition" />
        </div>
      </header>

      <main className="p-6 space-y-8">
        {/* Stat Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {[
            { title: "Total Users", value: stats.totalUsers, icon: FiUsers, color: "bg-blue-500" },
            { title: "Total Orders", value: stats.totalOrders, icon: FiShoppingCart, color: "bg-green-500" },
            { title: "Total Revenue", value: stats.totalRevenue, icon: FiDollarSign, color: "bg-yellow-500" },
            { title: "Deliveries", value: stats.deliveriesCompleted, icon: FiTruck, color: "bg-purple-500" },
            { title: "Products", value: stats.totalProducts, icon: FiPackage, color: "bg-pink-500" },
            { title: "Out of Stock", value: stats.outOfStock, icon: FiAlertTriangle, color: "bg-red-500" },
          ].map(({ title, value, icon: Icon, color }) => (
            <div
              key={title}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg p-4 flex flex-col items-center text-center transition"
            >
              <div className={`${color} p-3 rounded-full text-white text-lg mb-3`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-xs text-gray-500">{title}</p>
              <p className="text-xl font-semibold">{value}</p>
            </div>
          ))}
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Revenue Line Chart */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ReTooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Order Status Pie */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Orders by Status</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {orderStatusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <ReTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top Products Bar */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Top Products</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={topProductsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ReTooltip />
                <Bar dataKey="sales" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* User Roles Pie */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-4">User Roles</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={userRoleData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {userRoleData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <ReTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Tables */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2">Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{o.id}</td>
                    <td>{o.customer}</td>
                    <td>{o.date}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          o.status.toLowerCase() === "delivered"
                            ? "bg-green-100 text-green-700"
                            : o.status.toLowerCase() === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td>{o.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Low Stock Products */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">Low Stock Products</h2>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th>Product</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {lowStock.map((p, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td>{`${p.name} (${p.variant})`}</td>
                    <td className="font-medium text-red-600">{p.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
