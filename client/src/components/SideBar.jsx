
import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/user/useLogout"; // adjust path if needed

const SideBar = ({ onClose }) => {
  const { mutate: logout, isLoading } = useLogout();

  const handleLogout = () => {
    logout(); // trigger logout mutation
    onClose(); // optionally close the sidebar
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose}></div>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-4/5 sm:w-[350px] bg-white shadow-lg z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out">
        <div>
          {/* Close Button */}
          <div className="flex items-center justify-between p-4 border-b">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black text-2xl"
            >
              ×
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col gap-4 p-8 text-sm sm:text-lg">
            <Link to="/"><p>Home</p></Link>
            <Link><p>All</p></Link>
            <Link to="/collections"><p>Collections</p></Link>
            <Link><p>Bottoms</p></Link>
            <Link><p>Tshirt</p></Link>
            <Link to="/"><p>New Arrivals</p></Link>
          </div>
        </div>

        {/* Logout Button */}
        <div className="p-8 border-t">
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full bg-black hover:bg-[#282626] text-sm sm:text-md text-white py-2 rounded"
          >
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
