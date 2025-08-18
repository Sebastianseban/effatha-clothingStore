
import React, { useState } from "react";

const ordersData = [
  {
    id: "ORD123",
    customer: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    address: "123 Main St, New York",
    amount: 250,
    status: "Processing",
    date: "2025-08-10",
    payment: { method: "Credit Card", status: "Paid" },
    items: [
      { name: "Product A", qty: 2, price: 100 },
      { name: "Product B", qty: 1, price: 50 },
    ],
  },
  {
    id: "ORD456",
    customer: "Jane Smith",
    email: "jane@example.com",
    phone: "9123456780",
    address: "456 Park Ave, LA",
    amount: 400,
    status: "Delivered",
    date: "2025-08-12",
    payment: { method: "PayPal", status: "Paid" },
    items: [
      { name: "Product X", qty: 1, price: 200 },
      { name: "Product Y", qty: 2, price: 100 },
    ],
  },
];

const statusColors = {
  Processing: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  Shipped: "bg-blue-100 text-blue-700 border border-blue-300",
  Delivered: "bg-green-100 text-green-700 border border-green-300",
  Cancelled: "bg-red-100 text-red-700 border border-red-300",
};

const AdminOrderPage = () => {
  const [orders, setOrders] = useState(ordersData);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filter === "All" || order.status === filter;
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const updateOrderStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder?.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 tracking-tight">
        📦 Order Management
      </h1>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
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
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
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
                  ${order.amount}
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
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value)
                    }
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
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-5 text-gray-800">
              📝 Order Details
            </h2>

            {/* Customer + Payment Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Customer Info
                </h3>
                <p className="text-gray-600">{selectedOrder.customer}</p>
                <p className="text-gray-600">{selectedOrder.email}</p>
                <p className="text-gray-600">{selectedOrder.phone}</p>
                <p className="text-gray-600">{selectedOrder.address}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Payment Info
                </h3>
                <p className="text-gray-600">Method: {selectedOrder.payment.method}</p>
                <p className="text-gray-600">Status: {selectedOrder.payment.status}</p>
              </div>
            </div>

            {/* Items List */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-gray-700">Items</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border rounded-xl overflow-hidden">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-3 py-2 border">Product</th>
                      <th className="px-3 py-2 border">Qty</th>
                      <th className="px-3 py-2 border">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-3 py-2 border">{item.name}</td>
                        <td className="px-3 py-2 border">{item.qty}</td>
                        <td className="px-3 py-2 border">${item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Status Update Inside Modal */}
            <div>
              <h3 className="font-semibold mb-2 text-gray-700">Order Status</h3>
              <select
                value={selectedOrder.status}
                onChange={(e) =>
                  updateOrderStatus(selectedOrder.id, e.target.value)
                }
                className="px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderPage;
