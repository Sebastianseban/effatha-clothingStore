import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";

const Cart = ({ isOpen, onClose, cartItems = [] }) => {


    useEffect(() => {
      document.body.classList.add("overflow-hidden");
      return () => {
        document.body.classList.remove("overflow-hidden");
      };
    }, []);
  return (
    <div className="w-full fixed right-0 top-0 h-full z-50 bg-[#0e0d0d51] backdrop-blur-xs flex justify-end ease-in-out duration-500 ">
      <div className="w-[80%] sm:w-[480px] bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-sm sm:text-lg font-semibold">Your Cart</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-center gap-4">
          <img
            src="/card2.png"
            alt="item"
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1">
            <p className="text-sm font-medium">Vintage Brown T-Shirt</p>
            <p className="text-xs text-gray-500">Qty: 1</p>
          </div>
          <p className="text-sm font-semibold">₹599</p>
        </div>

        <div className="flex items-center gap-4">
          <img
            src="/tshirt.png"
            alt="item"
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1">
            <p className="text-sm font-medium">Oversized Tee</p>
            <p className="text-xs text-gray-500">Qty: 2</p>
          </div>
          <p className="text-sm font-semibold">₹1198</p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="flex justify-between mb-3">
          <span className="text-sm font-medium">Subtotal</span>
          <span className="text-lg font-bold">₹1797</span>
        </div>
        <button className="w-full bg-black text-white text-sm sm:text-md py-2 rounded hover:bg-gray-800 transition">
          Checkout
        </button>
      </div>
    </div>
    </div>
  );
};

export default Cart;
