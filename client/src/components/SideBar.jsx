
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/user/useLogout";
import {
  FiHome,
  FiGrid,
  FiBox,
  FiTag,
  FiLogOut,
  FiX,
} from "react-icons/fi";

const SideBar = ({ onClose }) => {
  const { mutate: logout, isLoading } = useLogout();

  const handleLogout = () => {
    logout();
    onClose();
  };

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-start transition-all duration-300 ease-in-out">
      <div className="w-[80%] sm:w-[350px] h-full bg-white flex flex-col justify-between shadow-2xl">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="text-lg font-semibold tracking-wide">Menu</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black text-2xl transition"
              aria-label="Close sidebar"
            >
              <FiX />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-3 px-6 py-6 text-sm sm:text-base text-gray-800">
            <NavItem to="/" label="Home" icon={<FiHome />} onClick={onClose} />
            <NavItem to="#" label="All" icon={<FiGrid />} onClick={onClose} />
            <NavItem
              to="/collections"
              label="Collections"
              icon={<FiBox />}
              onClick={onClose}
            />
            <NavItem to="#" label="Bottoms" icon={<FiTag />} onClick={onClose} />
            <NavItem to="#" label="T-Shirt" icon={<FiTag />} onClick={onClose} />
            <NavItem to="/" label="New Arrivals" icon={<FiBox />} onClick={onClose} />
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-6 border-t">
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white py-2 rounded-md text-sm sm:text-base font-medium transition-all"
          >
            <FiLogOut className="text-lg" />
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable nav item component
const NavItem = ({ to, label, icon, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 transition-all font-medium"
  >
    <span className="text-xl">{icon}</span>
    <span>{label}</span>
  </Link>
);

export default SideBar;
