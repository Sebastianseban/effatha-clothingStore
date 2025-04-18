
  import React, { useState } from 'react';
  import { LuAlignJustify } from "react-icons/lu";
  import { IoIosSearch } from "react-icons/io";
  import { FaRegUser } from "react-icons/fa6";
  import { BsCart3 } from "react-icons/bs";
  import Cart from './Cart';
  import SideBar from './SideBar';
  import { FaUserCircle } from "react-icons/fa";


  const NavBar = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState('');

    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);
    const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

    const user = false

    return (
      <div className='w-full border-b border-gray-300 flex justify-between items-center px-4 sm:px-8 md:px-16 py-3'>
        {/* Left side: Sidebar + Search */}
        <div className='flex gap-4 items-center text-2xl'>
          <LuAlignJustify onClick={toggleSideBar} className='cursor-pointer' />

          {isSearchOpen ? (
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search..."
              className="border rounded-md px-2 py-1 text-sm focus:outline-none"
            />
          ) : (
            <IoIosSearch onClick={toggleSearch} className="cursor-pointer" />
          )}
          

          {isSideBarOpen && <SideBar onClose={() => setIsSideBarOpen(false)} />}
        </div>

        {/* Center: Logo */}
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-xl sm:text-2xl font-semibold'>EFFATHA</h1>
          <p className='text-xs sm:text-sm font-light'>LET IT BE OPENED</p>
        </div>

        {/* Right side: User + Cart */}
        <div className='flex gap-4 items-center text-2xl'>
          {user ? <FaRegUser className='cursor-pointer' /> : <h1 className='cursor-pointer text-[20px] font-light'>Login</h1>}
          <BsCart3 onClick={toggleCart} className='cursor-pointer' />
          {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
        </div>
      </div>
    );
  };

  export default NavBar;
