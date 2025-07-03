
import React from "react";
import { FiX } from "react-icons/fi";

const AddtoCartPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50  bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white w-[90%] sm:w-[700px] flex flex-col sm:flex-row p-6 shadow-lg rounded-lg overflow-hidden">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
        >
          <FiX />
        </button>

        {/* Image Section */}
        <div className="sm:w-[300px] w-full h-[300px]">
          <img
            src="card2.png"
            alt="Product"
            className="w-full h-full object-contain bg-gray-100 rounded hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content Section */}
        <div className="sm:ml-6 mt-4 sm:mt-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Air Jordon</h1>
          <p className="text-sm text-gray-500 mt-1">WHITE/MIDNIGHT NAVY-NEUTRAL GREY</p>

          {/* Color Picker */}
          <p className="text-gray-500 text-xl mt-6">Available Colors</p>
          <div className="flex gap-2 mt-2">
            <div className="w-6 h-6 rounded-full border border-black" style={{ backgroundColor: "#000" }}></div>
            <div className="w-6 h-6 rounded-full border border-gray-400" style={{ backgroundColor: "#c4c4c4" }}></div>
            <div className="w-6 h-6 rounded-full border border-gray-400" style={{ backgroundColor: "#ff0000" }}></div>
          </div>

          {/* Size Selector */}
          <p className="text-gray-500 text-xl mt-6">Apparel Size</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <div className="border border-gray-400 px-4 py-1 rounded">XS</div>
            <div className="border border-gray-400 px-4 py-1 rounded">S</div>
            <div className="border border-gray-400 px-4 py-1 rounded">M</div>
            <div className="border border-gray-400 px-4 py-1 rounded">L</div>
            <div className="border border-gray-400 px-4 py-1 rounded">XL</div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-6">
            <button className="w-full bg-black text-white py-4 text-lg font-semibold rounded hover:bg-gray-800 transition">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddtoCartPopup;
