import React from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";

function Navbar() {
  return (
    <div className="px-8 py-4 flex items-center justify-between ">
      <div className="flex flex-col items-center  justify-center">
        <h1 className="text-lg sm:text-2xl font-semibold">EFFATHA</h1>
        <p className="text-xs sm:text-sm font-light">LET IT BE OPENED</p>
      </div>

      <div className="flex gap-4">
        <div className="w-[500px] flex items-center gap-2  rounded-lg h-[40px] border-1 border-gray-500 px-4">
          <IoSearch className="size-5 text-gray-500" />
          <input
            className="w-full outline-none text-gray-500 text-lg"
            placeholder="search"
            type="search"
          />
        </div>
        <button className="w-[120px] text-white h-[40px] bg-blue-500">
          + Create
        </button>
      </div>

      <div className="flex items-center gap-4">
        <IoMdNotifications className="size-6 text-gray-500" />
        <IoSettings className="size-5 text-gray-500" />
        <FaCircleUser className="size-5 text-gray-500" />
      </div>
    </div>
  );
}

export default Navbar;
