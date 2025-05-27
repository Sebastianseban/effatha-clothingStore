import React from "react";
import {
  FiUsers,
  FiShoppingCart,
  FiDollarSign,
  FiTruck,
} from "react-icons/fi";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";

const stats = [
  { id: 1, title: "Total Users", value: 1240, icon: FiUsers, iconColor: "text-blue-500" },
  { id: 2, title: "Orders", value: 560, icon: FiShoppingCart, iconColor: "text-green-500" },
  { id: 3, title: "Revenue", value: "$12,340", icon: FiDollarSign, iconColor: "text-yellow-500" },
  { id: 4, title: "Deliveries", value: 34, icon: FiTruck, iconColor: "text-purple-500" },
];

// Data for Pie Chart (User types)
const pieData = [
  { name: "Free Users", value: 400 },
  { name: "Premium Users", value: 800 },
  { name: "Enterprise Users", value: 40 },
];
const COLORS = ["#3b82f6", "#10b981", "#8b5cf6"];

// Data for Bar Chart (Monthly Orders)
const barData = [
  { month: "Jan", orders: 40 },
  { month: "Feb", orders: 50 },
  { month: "Mar", orders: 65 },
  { month: "Apr", orders: 70 },
  { month: "May", orders: 60 },
  { month: "Jun", orders: 75 },
];

// Data for Line Chart (Revenue over months)
const lineData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 7000 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 8000 },
];

const AdminDashboard = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map(({ id, title, value, icon: Icon, iconColor }) => (
          <div
            key={id}
            className="bg-white rounded-lg shadow p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300"
          >
            <div className={`p-4 rounded-full bg-gray-100 ${iconColor}`}>
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-500 font-medium">{title}</p>
              <p className="text-2xl font-semibold text-gray-800">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            User Types
          </h2>
          <PieChart width={300} height={200}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <ReTooltip />
          </PieChart>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Monthly Orders
          </h2>
          <BarChart width={350} height={200} data={barData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ReTooltip />
            <Bar dataKey="orders" fill="#3b82f6" radius={[5, 5, 0, 0]} />
          </BarChart>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Revenue Over Time
          </h2>
          <LineChart width={350} height={200} data={lineData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ReTooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
          </LineChart>
        </div>
      </div>

      {/* Recent Orders Table */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Recent Orders
        </h2>
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left">Order ID</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Customer</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2">#1023</td>
              <td className="border border-gray-200 px-4 py-2">John Doe</td>
              <td className="border border-gray-200 px-4 py-2 text-green-600">
                Completed
              </td>
              <td className="border border-gray-200 px-4 py-2">$250</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-200 px-4 py-2">#1024</td>
              <td className="border border-gray-200 px-4 py-2">Jane Smith</td>
              <td className="border border-gray-200 px-4 py-2 text-yellow-600">
                Pending
              </td>
              <td className="border border-gray-200 px-4 py-2">$180</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">#1025</td>
              <td className="border border-gray-200 px-4 py-2">Alice Johnson</td>
              <td className="border border-gray-200 px-4 py-2 text-red-600">
                Cancelled
              </td>
              <td className="border border-gray-200 px-4 py-2">$0</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;
