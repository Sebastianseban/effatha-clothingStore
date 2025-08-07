import React, { useState } from "react";
import { LuAlignJustify } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import SideBar from "./SideBar";
import useUserStore from "../store/userStore";
import UserProfilePopup from "./user/UserProfilePopup";
import SearchBar from "./user/SearchBar";

const NavBar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { isAuth, user } = useUserStore();

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);
  const handleProfilePopUp = () => setShowProfile((prev) => !prev);

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-40">
      <div className="relative max-w-screen-2xl mx-auto flex items-center justify-between px-4 sm:px-8 md:px-16 py-3">
        {/* LEFT SIDE: Sidebar */}
        <div className="flex items-center z-20">
          <button
            type="button"
            onClick={toggleSideBar}
            aria-label="Open sidebar"
            className="rounded-full p-2 hover:bg-gray-100 transition"
          >
            <LuAlignJustify className="text-2xl sm:text-2xl" />
          </button>
          {isSideBarOpen && <SideBar onClose={() => setIsSideBarOpen(false)} />}
        </div>

        {/* CENTER: Logo absolutely centered */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-10">
          <Link
            to="/"
            className="flex flex-col items-center pointer-events-auto"
          >
            <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-gray-900">
              EFFATHA
            </h1>
            <p className="text-xs sm:text-sm font-light text-gray-500">
              LET IT BE OPENED
            </p>
          </Link>
        </div>

        {/* RIGHT SIDE: Search + User + Cart */}
        <div className="flex items-center gap-1 sm:gap-3 z-20 ml-auto">
          {/* SearchBar */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* User Section */}
          <div className="relative flex items-center">
            {isAuth ? (
              <button
                type="button"
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 transition"
                onClick={handleProfilePopUp}
                aria-label="User profile"
              >
                <FaRegUser className="text-xl" />
                <span className="hidden sm:flex text-sm text-gray-700 font-medium">
                  {user?.firstName}
                </span>
              </button>
            ) : (
              <Link
                to="/login"
                className="px-2 py-1 rounded hover:bg-gray-100 transition text-sm sm:text-base font-medium text-gray-700"
              >
                Login
              </Link>
            )}
            {showProfile && (
              <div className="absolute top-12 right-0 z-30">
                <UserProfilePopup onClose={() => setShowProfile(false)} />
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <div className="relative">
            <button
              type="button"
              onClick={toggleCart}
              aria-label="Open cart"
              className="rounded-full p-2 hover:bg-gray-100 transition"
            >
              <BsCart3 className="text-xl" />
            </button>
            {isCartOpen && (
              <div className="absolute right-0 top-12 z-30">
                <Cart onClose={() => setIsCartOpen(false)} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="block md:hidden px-4 py-2">
        <SearchBar />
      </div>
    </nav>
  );
};

export default NavBar;
