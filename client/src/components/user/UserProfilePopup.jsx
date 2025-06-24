
import React from "react";
import { IoClose } from "react-icons/io5"; // Close icon

const UserProfilePopup = ({ onClose }) => {
  return (
    <div className="absolute right-4 top-19 z-50 w-64 bg-white border border-gray-200 shadow-xl rounded-xl p-4">
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-black transition-colors"
      >
        <IoClose size={18} />
      </button>


      {/* Menu Options */}
      <ul className="space-y-2 text-sm">
        <li>
          <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
            View Profile
          </button>
        </li>
        <li>
          <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
            Order History
          </button>
        </li>
        <li>
          <button className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition-colors mt-2">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserProfilePopup;
