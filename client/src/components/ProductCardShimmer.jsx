
import React from "react";

const ProductCardShimmer = () => {
  return (
    <div className="bg-gray-200 animate-pulse duration-700 min-w-[300px] rounded-md overflow-hidden">
      <div className="w-[300px] h-[300px] bg-gray-300" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-1/2 bg-gray-300 rounded" />
        <div className="h-5 w-3/4 bg-gray-300 rounded" />
        <div className="h-4 w-1/3 bg-gray-300 rounded" />
        <div className="h-4 w-1/4 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default ProductCardShimmer;
