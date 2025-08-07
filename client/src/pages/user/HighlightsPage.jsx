
import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import ProductCardShimmer from "../../components/ProductCardShimmer";
import { useFilteredHighlights } from "../../hooks/user/useFilteredHighlights";

// Animation styles
const fadeInStyle = {
  opacity: 1,
  transform: "translateY(0)",
  transition: "opacity 0.6s ease, transform 0.6s ease",
};



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

  const handleInStockChange = (value) => {
    setFilters((prev) => ({ ...prev, inStock: value }));
  };

  const handlePriceChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: 0,
      maxPrice: parseInt(e.target.value),
    }));
  };

  const handleSizeClick = (size) => {
    const currentSizes = filters.sizes.split(",").filter(Boolean);
    const updatedSizes = currentSizes.includes(size)
      ? currentSizes.filter((s) => s !== size)
      : [...currentSizes, size];
    setFilters((prev) => ({ ...prev, sizes: updatedSizes.join(",") }));
  };

  const handleSortChange = (e) => {
    const selected = e.target.value;
    const map = {
      "Price: Low to High": "price_asc",
      "Price: High to Low": "price_desc",
      Newest: "newest",
      Featured: "",
    };
    setFilters((prev) => ({ ...prev, sort: map[selected] }));
  };

  return (
    <div style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          background: "#fff",
          borderRight: "1px solid #e5e7eb",
          padding: "24px",
        }}
      >
        <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>Filters</h2>

        {/* Availability */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Availability</h3>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>
            <input
              type="radio"
              name="stock"
              style={{ marginRight: "0.5rem" }}
              onChange={() => handleInStockChange("true")}
              checked={filters.inStock === "true"}
            />
            In Stock
          </label>
          <label style={{ display: "block" }}>
            <input
              type="radio"
              name="stock"
              style={{ marginRight: "0.5rem" }}
              onChange={() => handleInStockChange("false")}
              checked={filters.inStock === "false"}
            />
            Out of Stock
          </label>
        </div>

        {/* Price */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Price</h3>
          <input
            type="range"
            min="0"
            max="5000"
            value={filters.maxPrice}
            style={{ width: "100%" }}
            onChange={handlePriceChange}
          />
          <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>
            ₹0 - ₹{filters.maxPrice}
          </div>
        </div>

        {/* Size */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Size</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                onClick={() => handleSizeClick(size)}
                style={{
                  border: "1px solid #d1d5db",
                  padding: "0.25rem 0.5rem",
                  fontSize: "0.75rem",
                  borderRadius: "0.25rem",
                  background: filters.sizes.includes(size) ? "#e5e7eb" : "transparent",
                  cursor: "pointer",
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>Sort By</h3>
          <select
            style={{
              width: "100%",
              padding: "0.25rem 0.5rem",
              fontSize: "0.875rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.25rem",
            }}
            onChange={handleSortChange}
          >
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "24px", background: "#f9fafb" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            {isLoading || delayedLoading
              ? "Loading..."
              : isError
              ? "Failed to load products"
              : `${data.length} ${title}`}
          </h1>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {isLoading || delayedLoading ? (
            Array.from({ length: 6 }).map((_, i) => <ProductCardShimmer key={i} />)
          ) : data.length === 0 ? (
            <p style={{ color: "#6b7280", gridColumn: "1 / -1" }}>No products found.</p>
          ) : (
            data.map((product) => (
              <div key={product._id} style={fadeInStyle}>
                <ProductCard
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  brand={product.brand}
                  slug={product.slug}
                />
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default HighlightsPage;
