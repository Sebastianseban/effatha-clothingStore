
import ProductCard from "../../components/ProductCard";
import ProductCardShimmer from "../../components/ProductCardShimmer";
import FilterSidebar from "../../components/user/FilterSidebar";
import { useFilteredHighlights } from "../../hooks/user/useFilteredHighlights";
import { useState, useEffect } from "react";

const HighlightsPage = ({ title, type }) => {
  const [filters, setFilters] = useState({
    type,
    inStock: "",
    minPrice: 0,
    maxPrice: 5000,
    sizes: "",
    sort: "",
  });

  const { data = [], isLoading, isError } = useFilteredHighlights(filters);
  const [delayedLoading, setDelayedLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setDelayedLoading(true);
      const timer = setTimeout(() => setDelayedLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, data]);

  return (
    <div style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
      <FilterSidebar filters={filters} setFilters={setFilters} />

      <main style={{ flex: 1, padding: "24px", background: "#f9fafb" }}>
        <h1>
          {isLoading || delayedLoading
            ? "Loading..."
            : isError
            ? "Failed to load products"
            : `${data.length} ${title}`}
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {isLoading || delayedLoading
            ? Array.from({ length: 6 }).map((_, i) => <ProductCardShimmer key={i} />)
            : data.length === 0
            ? <p>No products found.</p>
            : data.map((p) => <ProductCard key={p._id} {...p} />)}
        </div>
      </main>
    </div>
  );
};

export default HighlightsPage;
