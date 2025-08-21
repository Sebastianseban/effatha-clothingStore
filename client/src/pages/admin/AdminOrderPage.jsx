
import React, { useState } from "react";
import { useGetAdminOrder } from "../../hooks/admin/useAdminOrders";
import { useUpdateOrderStatus } from "../../hooks/admin/useUpdateOrderStatus";

import { useDebounce } from "use-debounce";


const statusColors = {
  Processing: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  Shipped: "bg-blue-100 text-blue-700 border border-blue-300",
  Delivered: "bg-green-100 text-green-700 border border-green-300",
  Cancelled: "bg-red-100 text-red-700 border border-red-300",
};

const AdminOrderPage = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateError, setUpdateError] = useState("");


 

  // ✅ Use the use-debounce library
  const [debouncedSearch] = useDebounce(search, 500);

  // ✅ Connect filters to backend API with debounced search
  const { data: orders, isLoading, isError } = useGetAdminOrder({
    status: filter,
    search: debouncedSearch, // Use debounced search
    dateFrom,
    dateTo,
  });
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus();


  // ✅ Fixed: Date validation
  const isDateRangeValid = () => {
    if (!dateFrom || !dateTo) return true;
    return new Date(dateFrom) <= new Date(dateTo);
  };

  if (isLoading) return <p className="p-6">Loading orders...</p>;
  if (isError) return <p className="p-6 text-red-600">Failed to load orders.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 tracking-tight">
        📦 Order Management
      </h1>

      {/* ✅ Added error display for updates */}
      {updateError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl">
          {updateError}
          <button 
            onClick={() => setUpdateError("")} 
            className="ml-2 text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      )}

      {/* 🔹 Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 mb-6">
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
          placeholder="🔍 Search by Order ID / Customer / Email / Phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500"
        />
        
        {/* ✅ Search indicator */}
        {search !== debouncedSearch && (
          <div className="text-sm text-gray-500 italic">Searching...</div>
        )}

        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className={`px-3 py-2 rounded-xl border shadow-sm focus:ring-2 focus:ring-indigo-500 ${
            !isDateRangeValid() ? 'border-red-300' : 'border-gray-300'
          }`}
        />

        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className={`px-3 py-2 rounded-xl border shadow-sm focus:ring-2 focus:ring-indigo-500 ${
            !isDateRangeValid() ? 'border-red-300' : 'border-gray-300'
          }`}
        />
      </div>

      {/* ✅ Date validation warning */}
      {!isDateRangeValid() && (
        <div className="mb-4 p-2 bg-yellow-100 border border-yellow-300 text-yellow-700 rounded-xl text-sm">
          ⚠️ "Date From" should be earlier than "Date To"
        </div>
      )}

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
            {orders?.map((order, idx) => (
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
                  {/* ✅ Fixed: Handle unknown status */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                      statusColors[order.status] || "bg-gray-100 text-gray-700 border border-gray-300"
                    }`}
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
                    onChange={(e) => updateStatus({orderId: order.id, status: e.target.value })}
                    disabled={isPending}
                    className="px-2 py-1.5 rounded-lg border border-gray-300 text-sm shadow-sm focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}

            {orders?.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500 font-medium">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Order Modal */}
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

            <p className="mb-2">
              <span className="font-semibold">Customer:</span> {selectedOrder.customer}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> {selectedOrder.email}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Phone:</span> {selectedOrder.phone}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Address:</span> {selectedOrder.address}
            </p>

            {/* ✅ Fixed: Safe property access */}
            <div className="mb-4">
              <span className="font-semibold">Payment:</span>{" "}
              {selectedOrder.payment?.method || "N/A"} ({selectedOrder.payment?.status || "Unknown"})
            </div>

            <h3 className="text-lg font-semibold mb-2">🛒 Items</h3>
            <ul className="list-disc list-inside space-y-1">
              {/* ✅ Fixed: Better key prop using item id or unique combination */}
              {selectedOrder.items?.map((item, i) => (
                <li key={item.id || `${item.name}-${i}`}>
                  {item.qty} × {item.name} — ₹{item.price}
                </li>
              )) || <li className="text-gray-500">No items found</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderPage;