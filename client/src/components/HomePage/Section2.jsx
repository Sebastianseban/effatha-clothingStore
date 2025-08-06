import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import ProductCard from "../ProductCard";
import ProductCardShimmer from "../ProductCardShimmer";
import AddtoCartPopup from "../user/AddtoCartPopup";
import { useHighlights } from "../../hooks/user/useHighlights";
import { cloudinaryOptimize } from "../../utils/cloudinaryOptimize";

const Section2 = ({ title, viewAllLink, type }) => {
  const { data: products, isLoading, isError } = useHighlights(type);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState(null);

  const handleAddToCartClick = (slug) => {
    setSelectedSlug(slug);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedSlug(null);
  };

  if (isLoading) {
    return (
      <div className="flex gap-4 px-6 sm:px-10 md:px-16 py-8 overflow-x-auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardShimmer key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-16 py-8 text-red-500 font-medium">
        Failed to load products. Please try again later.
      </div>
    );
  }

  return (
    <div className="w-full py-6">
      {/* Section Header */}
      <div className="flex justify-between items-center px-6 sm:px-10 md:px-16">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{title}</h2>
        <Link
          to={viewAllLink}
          className="text-sm sm:text-base md:text-lg font-medium text-black underline hover:text-gray-700"
        >
          VIEW ALL
        </Link>
      </div>

      {/* Scrollable Product Cards */}
      <div className="mt-6 relative px-2 sm:px-10 md:px-16">
        {/* Optional Scroll Arrows (for desktop) */}
        <FaAngleLeft className="hidden md:block absolute top-1/2 -translate-y-1/2 left-4 text-3xl z-10 cursor-pointer text-gray-400 hover:text-black transition" />
        <FaAngleRight className="hidden md:block absolute top-1/2 -translate-y-1/2 right-4 text-3xl z-10 cursor-pointer text-gray-400 hover:text-black transition" />

        <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-3">
          {products?.map((product) => (
            <ProductCard
              key={product._id || product.slug}
              image={cloudinaryOptimize(product.image)}
              title={product.title}
              brand={product.brand}
              color={product.color}
              price={product.price}
              slug={product.slug}
              onAddToCartClick={() => handleAddToCartClick(product.slug)}
            />
          ))}
        </div>
      </div>

      {/* Add to Cart Popup */}
      {showPopup && selectedSlug && (
        <AddtoCartPopup slug={selectedSlug} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default Section2;
