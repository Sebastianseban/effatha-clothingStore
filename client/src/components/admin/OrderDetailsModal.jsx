
import React from "react";
import { useOrderById } from "../../hooks/admin/useOrderById";
import { FiX, FiPackage, FiCalendar, FiCreditCard, FiUser, FiMapPin } from "react-icons/fi";
import { MdOutlineLocalShipping } from "react-icons/md";

const OrderDetailModal = ({ orderId, onClose }) => {
  const { data: order, isLoading, isError } = useOrderById(orderId, !!orderId);

  if (!orderId) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-[520px] max-h-[90vh] overflow-y-auto animate-fadeIn">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiPackage className="text-blue-500" /> Order Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition text-3xl"
          >
            <FiX />
          </button>
        </div>

        {/* Loading / Error */}
        {isLoading && <p className="text-gray-500 animate-pulse">Loading order details...</p>}
        {isError && <p className="text-red-600">⚠️ Failed to load order.</p>}

        {order && (
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-500 flex items-center gap-2 mb-2">
                <FiUser className="text-gray-400" /> Customer
              </h3>
              <p className="text-lg font-semibold text-gray-800">{order.customer}</p>
              <p className="text-sm text-gray-600">{order.email}</p>
              <p className="text-sm text-gray-600">{order.phone}</p>
            </div>

            {/* Shipping */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-500 flex items-center gap-2 mb-2">
                <FiMapPin className="text-gray-400" /> Shipping Address
              </h3>
              <p className="text-gray-700 text-sm">{order.address}</p>
            </div>

            {/* Order Meta */}
            <div className="grid grid-cols-2 gap-4">
              {/* Status */}
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                  <MdOutlineLocalShipping className="text-gray-400" /> Status
                </p>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full flex items-center w-fit gap-1
                  ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Date */}
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                  <FiCalendar className="text-gray-400" /> Date
                </p>
                <p className="text-gray-700 font-medium">{order.date}</p>
              </div>

              {/* Amount */}
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                  💰 Amount
                </p>
                <p className="text-gray-800 font-semibold">₹{order.amount}</p>
              </div>

              {/* Payment */}
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                  <FiCreditCard className="text-gray-400" /> Payment
                </p>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full flex items-center gap-1
                  ${
                    order.payment.status === "paid"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.payment.method} ({order.payment.status})
                </span>
              </div>
            </div>

            {/* Items */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
                🛒 Items
              </h3>
              <div className="space-y-3">
                {order.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow transition"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <p className="font-semibold text-gray-700">₹{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailModal;
