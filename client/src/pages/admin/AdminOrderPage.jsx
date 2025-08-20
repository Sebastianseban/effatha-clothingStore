
import React, { useState, useEffect } from "react";
import { useGetAdminOrder } from "../../hooks/admin/useAdminOrders";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

const statusColors = {
  Processing: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  Shipped: "bg-blue-100 text-blue-700 border border-blue-300",
  Delivered: "bg-green-100 text-green-700 border border-green-300",
  Cancelled: "bg-red-100 text-red-700 border border-red-300",
};

const AdminOrderPage = () => {
  const { data: ordersData, isLoading, isError } = useGetAdminOrder();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (ordersData) setOrders(ordersData);
  }, [ordersData]);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filter === "All" || order.status === filter;
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // 🔹 API update
  const updateOrderStatus = async (id, newStatus) => {
    try {
      await axiosInstance.patch(`/admin/orders/${id}`, { status: newStatus });
      queryClient.invalidateQueries(["admin-orders"]);
    } catch (err) {
      console.error("❌ Failed to update order status", err);
    }
  };

  if (isLoading) return <p className="p-6">Loading orders...</p>;
  if (isError) return <p className="p-6 text-red-600">Failed to load orders.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 tracking-tight">
        📦 Order Management
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500"
        >
          <option>All</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
        <input
          type="text"
          placeholder="🔍 Search by Order ID / Customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
        <table className="w-full text-sm text-left">
          <thead className="bg-gradient-to-r from-indigo-50 to-indigo-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, idx) => (
              <tr
                key={order.id}
                className={`border-t hover:bg-gray-50 transition ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-3 font-medium">{order.id}</td>
                <td className="px-4 py-3">{order.customer}</td>
                <td className="px-4 py-3 font-semibold text-gray-700">
                  ₹{order.amount}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3">{order.date}</td>
                <td className="px-4 py-3 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition text-sm font-medium"
                  >
                    View
                  </button>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="px-2 py-1.5 rounded-lg border border-gray-300 text-sm shadow-sm focus:ring-2 focus:ring-indigo-500"
                  >
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Modal (same as your styled one) */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-5 text-gray-800">
              📝 Order Details
            </h2>
            {/* ...same customer/payment/items UI from your code... */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderPage;
