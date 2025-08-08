const FilterSidebar = ({ filters, setFilters }) => {
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
    const map = {
      "Price: Low to High": "price_asc",
      "Price: High to Low": "price_desc",
      Newest: "newest",
      Featured: "",
    };
    setFilters((prev) => ({ ...prev, sort: map[e.target.value] }));
  };

  return (
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
        <label>
          <input
            type="radio"
            name="stock"
            onChange={() => handleInStockChange("true")}
            checked={filters.inStock === "true"}
          />
          In Stock
        </label>
        <label>
          <input
            type="radio"
            name="stock"
            onChange={() => handleInStockChange("false")}
            checked={filters.inStock === "false"}
          />
          Out of Stock
        </label>
      </div>

      {/* Price */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h3>Price</h3>
        <input
          type="range"
          min="0"
          max="5000"
          value={filters.maxPrice}
          onChange={handlePriceChange}
        />
        <div>₹0 - ₹{filters.maxPrice}</div>
      </div>

      {/* Size */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h3>Size</h3>
        {["S", "M", "L", "XL", "XXL"].map((size) => (
          <button
            key={size}
            onClick={() => handleSizeClick(size)}
            style={{
              border: "1px solid #d1d5db",
              padding: "0.25rem 0.5rem",
              margin: "0.25rem",
              background: filters.sizes.includes(size) ? "#e5e7eb" : "transparent",
            }}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div>
        <h3>Sort By</h3>
        <select onChange={handleSortChange}>
          <option>Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>
    </aside>
  );
};

export default FilterSidebar;
