
import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";

const Section2 = ({ title, viewAllLink }) => {
  return (
    <div className="w-full py-4">
      {/* Title & View All */}
      <div className="flex justify-between items-center px-6 sm:px-10 md:px-16 mt-4">
        <h1 className="text-xl sm:text-2xl text-black font-medium">{title}</h1>
        <Link to={viewAllLink}>
          <h2 className="text-sm sm:text-base md:text-lg text-black font-light underline">
            VIEW ALL
          </h2>
        </Link>
      </div>

      {/* Scrollable Product Cards */}
      <div className="mt-6 relative px-2 sm:px-10 md:px-16">
        {/* Optional Scroll Arrows (hidden on small screens) */}
        <FaAngleLeft className="hidden md:block absolute top-1/2 -translate-y-1/2 left-4 text-3xl z-10 cursor-pointer" />
        <FaAngleRight className="hidden md:block absolute top-1/2 -translate-y-1/2 right-4 text-3xl z-10 cursor-pointer" />

        <div className="flex gap-4 sm:gap-6 overflow-x-auto overflow-y-hidden pb-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <ProductCard image="tshirt.png" />
          <ProductCard image="card2.png" />
          <ProductCard image="tshirt.png" />
          <ProductCard image="card2.png" />
        </div>
      </div>
    </div>
  );
};

export default Section2;
