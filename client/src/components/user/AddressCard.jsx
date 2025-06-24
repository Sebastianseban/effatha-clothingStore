import React from "react";
import { PiMapPinLineLight } from "react-icons/pi";
import { FiEdit, FiTrash2, FiStar } from "react-icons/fi";

const AddressCard = () => {
  return (
    <div className="relative bg-white border border-gray-200 rounded-xl p-5 shadow-md transition hover:shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-gray-700">
          <PiMapPinLineLight className="text-xl" />
          <span className="font-semibold text-sm capitalize">Home Address</span>
        </div>
        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
          Default
        </span>
      </div>

      <div className="text-sm text-gray-600 leading-6 pl-1">
        <p>221B Baker Street</p>
        <p>London, Greater London</p>
        <p>NW1 6XE, UK</p>
      </div>

      <div className="flex justify-end gap-4 mt-5 text-sm text-gray-500">
        <button className="flex items-center gap-1 hover:text-blue-600 transition">
          <FiStar className="text-base" />
          <span className="hidden sm:inline">Set as Default</span>
        </button>
        <button className="flex items-center gap-1 hover:text-yellow-500 transition">
          <FiEdit className="text-base" />
          <span className="hidden sm:inline">Edit</span>
        </button>
        <button className="flex items-center gap-1 hover:text-red-500 transition">
          <FiTrash2 className="text-base" />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
