import React, { useState } from "react";
import { LuAlignJustify } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import Cart from "./Cart";
import SideBar from "./SideBar";
import { FaUserCircle } from "react-icons/fa";
import { Link, } from "react-router-dom";
import useUserStore from "../store/userStore";

const NavBar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");



  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  // const user = false; // Assume user is not logged in

  const { isAuth, user } = useUserStore();



  return (
    <div className="w-full border-b border-gray-300 flex justify-between items-center px-4 sm:px-8 md:px-16 py-3">
      {/* Left side: Sidebar + Search */}
      <div className="flex gap-4 items-center text-2xl">
        <LuAlignJustify onClick={toggleSideBar} className="cursor-pointer size-4 sm:size-auto " />

        {isSearchOpen ? (
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
            className="border rounded-md px-2 py-1 text-sm focus:outline-none"
          />
        ) : (
          <IoIosSearch onClick={toggleSearch} className="cursor-pointer size-4 sm:size-auto" />
        )}

        {isSideBarOpen && <SideBar onClose={() => setIsSideBarOpen(false)} />}
      </div>

      {/* Center: Logo */}
     <Link to=""> <div className="flex flex-col justify-center items-center">
        <h1 className="text-lg sm:text-2xl font-semibold">EFFATHA</h1>
        <p className="text-xs sm:text-sm font-light">LET IT BE OPENED</p>
      </div>
      </Link>

      {/* Right side: User + Cart */}
      <div className="flex gap-4 items-center text-2xl">
        {/* User Section */}
        {isAuth ? (
          <div className="flex items-center gap-2 cursor-pointer">
          <FaRegUser className="size-4 sm:size-auto" />
          <span className="text-sm">{user?.firstName}</span>
        </div>
          
        ) : (
          <>
            <Link to="/login">
              <h1 className="cursor-pointer text-[15px] sm:text-[20px] font-light">Login</h1>
            </Link>
          </>
        )}

        {/* Cart Section */}
        <BsCart3 onClick={toggleCart} className="cursor-pointer size-4 sm:size-auto" />
        {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
      </div>
    </div>
  );
};

export default NavBar;
