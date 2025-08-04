import React from 'react';
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CollectionCard = ({ title, products }) => {
  return (
    <Link to={`/category/${title}`}>
      <div className="bg-gray-50 flex flex-col shadow-md overflow-hidden w-[400px] cursor-pointer hover:shadow-lg transition">
        {/* Show first product image or fallback */}
        <img
          src={products?.[0]?.image || "/placeholder.png"}
          alt={title}
          className="w-[300px] h-[300px] object-cover self-center"
        />

        <div className="p-4 bg-white flex justify-between items-center">
          <h1 className="text-black font-medium capitalize">{title}</h1>
          <FaArrowRight />
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
