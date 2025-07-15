
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useUserStore from "../../store/userStore";

const CheckoutPage = () => {
  const { user } = useUserStore();
  const { state } = useLocation();
  const { cartItems = [], subtotal = 0, address = {} } = state || {};
  const [selectedPayment, setSelectedPayment] = useState("razorpay");

  const handlePlaceOrder = () => {
    console.log("Placing order with", selectedPayment);
    // Add Razorpay or COD logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Checkout
          </h1>
          <p className="text-sm text-gray-500">Review your order and make payment</p>
        </div>

        {/* User Info */}
        <div className="bg-white shadow rounded-xl border p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">👤 User Info</h2>
          {user ? (
            <p className="text-gray-700">
              {user.firstName} — 📞 +91 {user.mobileNumber}
            </p>
          ) : (
            <p className="text-gray-500 italic">User not available</p>
          )}
        </div>

        {/* Delivery Address */}
        <div className="bg-white shadow rounded-xl border p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">📍 Delivery Address</h2>
          {address?.label ? (
            <p className="text-gray-700 leading-relaxed">
              <span className="font-medium">{address.label}</span> — {address.street}, {address.city}, {address.state}, {address.postalCode}, {address.country}
            </p>
          ) : (
            <p className="text-gray-500 italic">No address selected</p>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow rounded-xl border p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">🛍️ Order Summary</h2>

          {cartItems.length > 0 ? (
            <div className="space-y-4 text-sm">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-start gap-4 border-b pb-3">
                  <div className="flex gap-4">
                    <img
                      src={item.thumbnail || item.image || "/placeholder.jpg"}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg border object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{item.title}</p>
                      <p className="text-xs text-gray-500">
                        {item.brand} — Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800 whitespace-nowrap">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}

              <div className="flex justify-between font-semibold border-t pt-4 text-base">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 italic">Your cart is empty.</p>
          )}
        </div>

        {/* Payment Method */}
        <div className="bg-white shadow rounded-xl border p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">💳 Payment Method</h2>
          <div className="space-y-3 text-sm">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value="razorpay"
                checked={selectedPayment === "razorpay"}
                onChange={() => setSelectedPayment("razorpay")}
              />
              <span className="text-gray-700">Razorpay (UPI, Cards, Wallets)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value="cod"
                checked={selectedPayment === "cod"}
                onChange={() => setSelectedPayment("cod")}
              />
              <span className="text-gray-700">Cash on Delivery</span>
            </label>
          </div>
        </div>

        {/* Place Order */}
        <div className="bg-white rounded-xl shadow border p-4">
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-900 transition"
          >
            Place Order
          </button>
          <p className="text-xs text-center text-gray-400 mt-2">
            🔒 Secure payment powered by Razorpay
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
