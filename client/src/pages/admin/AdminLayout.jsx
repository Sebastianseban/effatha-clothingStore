import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import SideBar from "./SideBar";
import Navbar from "./Navbar";

const AdminLayout = () => {
  return (
    <div>
      <div className="w-full h-[85px] border-1 border-gray-300 ">
      <Navbar />

      </div>
      <div className="w-full flex">
        <div className="w-[15%]">
          <SideBar />
        </div>
        <div className="w-[85%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
