import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import { FaAngleLeft } from "react-icons/fa";

const Section2 = ({title}) => {
  return (
    <div className="w-full  px-16 py-3 relative ">
      <div className="flex justify-between mt-5">
        <h1 className="text-2xl text-black font-medium">{title}</h1>
        <Link>
          <h2 className="text-[20px] text-black font-light underline  ">
            VIEW ALL
          </h2>
        </Link>
      </div>

      <FaAngleLeft className="absolute top-1/6" />

      <div className="mt-6 flex justify-center gap-6 overflow-x-auto pb-2 ">
   
        <ProductCard image="tshirt.png" />
        <ProductCard image="card2.png" />
        <ProductCard image="tshirt.png" />
        <ProductCard image="card2.png" />
      </div>

      
    </div>
  );
};

export default Section2;
