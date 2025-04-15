import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";

const Section2 = ({title , viewAllLink}) => {
  return (
    <div className="w-full  py-3  ">
      <div className="flex justify-between mt-5 px-16">
        <h1 className="text-2xl text-black font-medium">{title}</h1>
        <Link to={viewAllLink}>
          <h2 className="text-[20px] text-black font-light underline  ">
            VIEW ALL
          </h2>
        </Link>
      </div>

     

      <div className="mt-6 flex justify-center gap-6 overflow-x-auto pb-2  overflow-y-hidden relative px-10">
      <FaAngleLeft className="absolute top-1/2 left-0 text-3xl " />
      <FaAngleRight className="absolute top-1/2 right-0 text-3xl "/>
   
        <ProductCard image="tshirt.png" />
        <ProductCard image="card2.png" />
        <ProductCard image="tshirt.png" />
        <ProductCard image="card2.png" />
      </div>

      
    </div>
  );
};

export default Section2;
