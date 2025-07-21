import React, { useEffect, useState } from "react";
import { FiX, FiTrash2 } from "react-icons/fi";
import { useCart } from "../hooks/user/useCart";
import { useDeleteCartItem } from "../hooks/user/useDeleteCartItem";
import { useUpdateCartItemQuantity } from "../hooks/user/useUpdateCartItemQuantity";
import ConfirmCheckoutPopup from "./user/ConfirmCheckoutPopup ";

const Cart = ({ onClose }) => {
  const { data, isLoading } = useCart();
  const cartItems = Array.isArray(data) ? data : [];

  const { mutate: deleteItem } = useDeleteCartItem();
  const { mutate: updateQuantity } = useUpdateCartItemQuantity();

  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleIncrement = (itemId) => {
    updateQuantity({ itemId, action: "increment" });
    console.log("Increase quantity of", itemId);
  };

  const handleDecrement = (itemId) => {
    updateQuantity({ itemId, action: "decrement" });
    console.log("Decrease quantity of", itemId);
  };

  const handleDelete = (itemId) => {
    deleteItem(itemId);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#11111143] backdrop-blur-sm flex justify-end">
      <div className="w-[90%] sm:w-[440px] bg-white h-full flex flex-col shadow-2xl rounded-l-xl overflow-hidden animate-slide-in-right">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 tracking-wide">
            Your Cart 🛒
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-black transition"
          >
            <FiX />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5 custom-scroll">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading cart...</p>
          ) : cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-md bg-gray-100"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500">{item.brand}</p>
                  <p className="text-xs text-gray-500">
                    Color: {item.color} | Size: {item.size}
                  </p>

                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() => handleDecrement(item._id)}
                      className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100 text-sm"
                    >
                      −
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item._id)}
                      className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100 text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between h-full gap-2">
                  <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-gray-400 hover:text-red-500"
                    title="Remove"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between text-md mb-4">
            <span className="font-medium text-gray-800">Subtotal</span>
            <span className="font-bold text-gray-900">₹{subtotal}</span>
          </div>
          <button
            onClick={() => setShowCheckoutPopup(true)}
            disabled={cartItems.length === 0}
            className={`w-full py-3 rounded-md font-semibold transition ${
              cartItems.length === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            Checkout
          </button>
        </div>
      </div>
      {showCheckoutPopup && (
        <ConfirmCheckoutPopup
          onClose={() => setShowCheckoutPopup(false)}
          onCloseCart={onClose}
          cartItems={cartItems}
          subtotal={subtotal}
        />
      )}
    </div>
  );
};

export default Cart;
