
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import ProductCard from "../../components/ProductCard";
import useSearchProducts from "../../hooks/user/useSearchProducts";
import AddtoCartPopup from "../../components/user/AddtoCartPopup";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data, isLoading, isError } = useSearchProducts(query);
  const products = data;

  // State for cart popup
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

  // Loading UI
  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl mt-10 mx-4 shadow animate-pulse">
        <svg className="animate-spin h-8 w-8 text-blue-400 mb-3" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v4l2.5-2.5L12 4v4A8 8 0 014 12z" />
        </svg>
        <p className="text-gray-500 text-lg tracking-wide">Loading results...</p>
      </div>
    );
  }

  // Error UI
  if (isError) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center bg-gradient-to-br from-rose-50 to-gray-100 rounded-xl mt-10 mx-4 shadow">
        <svg className="h-12 w-12 text-red-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 13.5A9 9 0 1112 3a9 9 0 019 9.5zm-9 3v.01" />
        </svg>
        <p className="text-red-500 text-lg font-medium">Failed to load results.</p>
      </div>
    );
  }

  // No results
  if (!products?.length) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center bg-white rounded-xl mt-10 mx-4 shadow">
        <p className="text-gray-500 text-lg font-light">No products found.</p>
      </div>
    );
  }

  return (
    <section className="px-2 sm:px-8 md:px-20 py-10 min-h-[60vh]">
      <div className="mb-8">
        <h2 className="text-[2rem] sm:text-3xl font-black text-gray-900 tracking-tight mb-1">
          Search results for <span className="text-gray-900 break-all">"{query}"</span>
        </h2>
        <p className="text-gray-400 text-sm">
          {products.length} product{products.length !== 1 && "s"} found
        </p>
      </div>

      <div
        className="
          grid gap-7
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          xl:grid-cols-4 
          2xl:grid-cols-5
        "
      >
        {products.map((product) => (
          <ProductCard
            key={product._id}
            image={product.image}
            title={product.title}
            brand={product.brand}
            color={product.color}
            price={product.price}
            slug={product.slug}
            onAddToCartClick={() => handleAddToCartClick(product.slug)}
          />
        ))}
      </div>

      {/* Add to Cart Popup */}
      {showPopup && selectedSlug && (
        <AddtoCartPopup slug={selectedSlug} onClose={handleClosePopup} />
      )}
    </section>
  );
};

export default SearchResultsPage;
