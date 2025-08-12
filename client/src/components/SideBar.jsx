
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
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex justify-start transition-all duration-300 ease-in-out">
      {/* ===== SIDEBAR PANEL ===== */}
      <div
        className="
          w-[85%] max-w-[350px] h-full
          bg-white
          flex flex-col justify-between
          shadow-2xl rounded-r-3xl
          animate-slideSidebarIn
          border-l border-gray-300
          sm:w-[350px]
          transition-all duration-300
        "
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between p-6 border-b border-gray-300">
            <h2 className="text-xl font-extrabold tracking-widest text-gray-900 select-none">
              MENU
            </h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-black bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition"
              aria-label="Close sidebar"
            >
              <FiX className="text-2xl" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 px-6 py-8">
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
            <NavItem to="/collections/new-arrivals" label="New Arrivals" icon={<FiBox />} onClick={onClose} />
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-6 border-t border-gray-300 bg-gray-100">
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="
              w-full flex items-center justify-center gap-2
              bg-black
              hover:bg-gray-900
              text-white py-2 rounded-full
              text-base font-semibold shadow-md
              transition-all focus:outline-none
              disabled:opacity-70 disabled:cursor-wait
              active:scale-95
            "
          >
            <FiLogOut className="text-lg" />
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
      {/* ===== END SIDEBAR ===== */}
      <style>
        {`
          @keyframes slideSidebarIn {
            from { transform: translateX(-100%); opacity: 0.5; }
            to   { transform: none; opacity: 1; }
          }
          .animate-slideSidebarIn {
            animation: slideSidebarIn 0.28s cubic-bezier(.37,1.15,.21,1) both;
          }
        `}
      </style>
    </div>
  );
};

// NavItem with black & white friendly colors
const NavItem = ({ to, label, icon, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="
      flex items-center gap-4 px-4 py-3 rounded-xl
      hover:bg-gray-200 hover:text-gray-900
      transition-all font-semibold text-gray-700
      group
    "
  >
    <span
      className="
        text-2xl text-gray-600 group-hover:text-gray-900 transition
        group-hover:scale-110
      "
    >
      {icon}
    </span>
    <span className="tracking-wide">{label}</span>
  </Link>
);

export default SideBar;
