import React from "react";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";

const ProductCard = ({image, title, brand, color, price }) => {
  return (
    <div className="bg-gray-50  shadow-md overflow-hidden min-w-[300px]">
      <img  src={image} className="w-[300px] h-[300px]  object-contain  hover:scale-105 transition-transform duration-300" />

      <div className="p-4 bg-white">
        <div className="flex justify-between">
          <h2 className="text-sm text-gray-900">{brand}</h2>
          <FiPlusCircle className="hover:scale-105 text-2xl" />
        </div>
        <h1 className="text-black text-[18px] font-medium mt-1">
          {title}
        </h1>
        <p className="text-sm text-gray-500">{color}</p>
        <p className="text-sm font-semibold text-gray-950">₹{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
