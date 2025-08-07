
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
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-lg flex justify-start transition-all duration-300 ease-in-out">
      {/* ===== SIDEBAR PANEL ===== */}
      <div
        className="
          w-[85%] max-w-[350px] h-full
          bg-gradient-to-br from-white/90 to-blue-50/70
          flex flex-col justify-between
          shadow-2xl rounded-r-3xl
          animate-slideSidebarIn
          border-r border-blue-100/50
          sm:w-[350px]
          transition-all duration-300
        "
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between p-6 border-b border-gray-200/70">
            <h2 className="text-xl font-extrabold tracking-widest text-black/80 select-none drop-shadow-sm">
              MENU
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition"
              aria-label="Close sidebar"
            >
              <FiX className="text-2xl" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 px-6 py-8">
            <NavItem to="/" label="Home"      icon={<FiHome />}  onClick={onClose} />
            <NavItem to="#" label="All"       icon={<FiGrid />}  onClick={onClose} />
            <NavItem to="/collections" label="Collections" icon={<FiBox />} onClick={onClose} />
            <NavItem to="#" label="Bottoms"   icon={<FiTag />}   onClick={onClose} />
            <NavItem to="#" label="T-Shirt"   icon={<FiTag />}   onClick={onClose} />
            <NavItem to="/" label="New Arrivals" icon={<FiBox />} onClick={onClose} />
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-6 border-t border-gray-200/60 bg-gradient-to-t from-white/60 via-white/90">
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="
              w-full flex items-center justify-center gap-2
              bg-gradient-to-r from-blue-700 to-blue-600
              hover:from-blue-800 hover:to-blue-700
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

// A modern nav item
const NavItem = ({ to, label, icon, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="
      flex items-center gap-4 px-4 py-3 rounded-xl
      hover:bg-blue-50 hover:text-blue-700
      transition-all font-semibold text-gray-800
      group
    "
  >
    <span
      className="text-2xl text-blue-400 group-hover:scale-110 group-hover:text-blue-600 transition"
    >
      {icon}
    </span>
    <span className="tracking-wide">{label}</span>
  </Link>
);

export default SideBar;
