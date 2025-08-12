
import React, { useEffect, useState } from "react";
import {
  FiUsers, FiShoppingCart, FiDollarSign, FiTruck,
  FiPackage, FiAlertTriangle, FiSearch,
} from "react-icons/fi";
import {
  PieChart, Pie, Cell, Tooltip as ReTooltip, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, LineChart, Line, Legend, ResponsiveContainer
} from "recharts";
import { FaUserCircle } from "react-icons/fa";

// Dummy API fetch simulation
const fetchDashboardStats = async () => ({
  totalUsers: 1240,
  totalOrders: 560,
  totalRevenue: "$12,340",
  deliveriesCompleted: 340,
  totalProducts: 150,
  outOfStock: 12,
});

const fetchRecentOrders = async () => ([
  { id: "#1023", customer: "John Doe", date: "2025-08-10", status: "Completed", total: "$250" },
  { id: "#1024", customer: "Jane Smith", date: "2025-08-09", status: "Pending", total: "$180" },
  { id: "#1025", customer: "Alice Johnson", date: "2025-08-08", status: "Cancelled", total: "$0" },
]);

const fetchLowStockProducts = async () => ([
  { name: "Blue T-Shirt", variant: "XL", stock: 3 },
  { name: "Running Shoes", variant: "Size 9", stock: 5 },
]);

// Chart Data
const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 7000 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 8000 },
  { month: "Jul", revenue: 7500 },
  { month: "Aug", revenue: 8200 },
  { month: "Sep", revenue: 9100 },
  { month: "Oct", revenue: 8700 },
  { month: "Nov", revenue: 9400 },
  { month: "Dec", revenue: 10000 },
];

const orderStatusData = [
  { name: "Completed", value: 500 },
  { name: "Pending", value: 50 },
  { name: "Cancelled", value: 10 },
];

const topProductsData = [
  { name: "Blue T-Shirt", sales: 120 },
  { name: "Running Shoes", sales: 95 },
  { name: "Leather Wallet", sales: 70 },
  { name: "Gaming Mouse", sales: 65 },
];

const userRoleData = [
  { name: "Admin", value: 5 },
  { name: "Vendor", value: 15 },
  { name: "Customer", value: 1220 },
];

const COLORS = ["#3b82f6", "#10b981", "#ef4444", "#f59e0b"];

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setStats(await fetchDashboardStats());
      setRecentOrders(await fetchRecentOrders());
      setLowStock(await fetchLowStockProducts());
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur-md shadow-sm px-6 py-4 flex justify-between items-center">
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
        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {[
            { title: "Total Users", value: stats.totalUsers, icon: FiUsers, color: "bg-blue-500" },
            { title: "Total Orders", value: stats.totalOrders, icon: FiShoppingCart, color: "bg-green-500" },
            { title: "Total Revenue", value: stats.totalRevenue, icon: FiDollarSign, color: "bg-yellow-500" },
            { title: "Deliveries", value: stats.deliveriesCompleted, icon: FiTruck, color: "bg-purple-500" },
            { title: "Products", value: stats.totalProducts, icon: FiPackage, color: "bg-pink-500" },
            { title: "Out of Stock", value: stats.outOfStock, icon: FiAlertTriangle, color: "bg-red-500" },
          ].map(({ title, value, icon: Icon, color }) => (
            <div key={title} className="bg-white rounded-xl shadow-md hover:shadow-lg p-4 flex flex-col items-center text-center transition">
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
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" /><YAxis /><ReTooltip /><Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Order Status Pie */}
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Orders by Status</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={orderStatusData} dataKey="value" nameKey="name" outerRadius={80} label>
                  {orderStatusData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <ReTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Top Products Bar */}
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Top Products</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={topProductsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" /><YAxis /><ReTooltip />
                <Bar dataKey="sales" fill="#10b981" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* User Roles Pie */}
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-4">User Roles</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={userRoleData} dataKey="value" nameKey="name" outerRadius={80} label>
                  {userRoleData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <ReTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Tables */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-md p-4 overflow-x-auto">
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
                  <tr key={o.id} className="border-t">
                    <td className="px-4 py-2">{o.id}</td>
                    <td>{o.customer}</td>
                    <td>{o.date}</td>
                    <td className={`capitalize ${o.status === "Completed" ? "text-green-600" : o.status === "Pending" ? "text-yellow-600" : "text-red-600"}`}>
                      {o.status}
                    </td>
                    <td>{o.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Low Stock */}
          <div className="bg-white rounded-xl shadow-md p-4 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">Low Stock Products</h2>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th>Product</th>
                  <th>Variant</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {lowStock.map((p, i) => (
                  <tr key={i} className="border-t">
                    <td>{p.name}</td>
                    <td>{p.variant}</td>
                    <td>{p.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
