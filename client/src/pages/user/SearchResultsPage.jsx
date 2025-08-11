
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import ProductCard from "../../components/ProductCard";
import useSearchProducts from "../../hooks/user/useSearchProducts";
import AddtoCartPopup from "../../components/user/AddtoCartPopup";
import FilterSidebar from "../../components/user/FilterSidebar";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  // filters state
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 5000,
    inStock: "",
    sizes: "",
    sort: "",
  });

  const { data: products, isLoading, isError } = useSearchProducts(query, filters);

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

  if (isLoading) return <p>Loading results...</p>;
  if (isError) return <p>Failed to load results.</p>;

  return (
    <section className="flex">
      {/* Sidebar */}
      <FilterSidebar filters={filters} setFilters={setFilters} />

      {/* Results */}
      <div className="flex-1 px-6 py-10">
        <div className="mb-8">
          <h2 className="text-[2rem] sm:text-3xl font-black text-gray-900 tracking-tight mb-1">
            Search results for <span className="break-all">"{query}"</span>
          </h2>
          <p className="text-gray-400 text-sm">
            {products?.length || 0} product{products?.length !== 1 && "s"} found
          </p>
        </div>

        <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {products?.map((product) => (
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

        {showPopup && selectedSlug && (
          <AddtoCartPopup slug={selectedSlug} onClose={handleClosePopup} />
        )}
      </div>
    </section>
  );
};

export default SearchResultsPage;
