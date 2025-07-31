
import ProductCard from '../../components/ProductCard';
import { useHighlights } from '../../hooks/user/useHighlights';

const HighlightsPage = ({ title, type }) => {
  const { data = [], isLoading, isError } = useHighlights(type);

  return (
    <div className="flex w-full min-h-screen">
      {/* Sidebar Filters */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Availability</h3>
          <label className="block">
            <input type="checkbox" className="mr-2" /> In Stock
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Out of Stock
          </label>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Price</h3>
          <input type="range" min="0" max="5000" className="w-full" />
          <div className="text-xs text-gray-500 mt-1">₹0 - ₹5000</div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Size</h3>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL", "XXL"].map(size => (
              <button
                key={size}
                className="border px-2 py-1 text-xs rounded hover:bg-gray-100"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Sort By</h3>
          <select className="w-full border text-sm px-2 py-1 rounded">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>
      </aside>

      {/* Product Display */}
      <main className="flex-1 p-6 bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">
            {isLoading
              ? "Loading..."
              : isError
              ? "Failed to load products"
              : `${data.length} ${title}`}
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full h-64 bg-gray-200 animate-pulse rounded"
                />
              ))
            : data.length === 0
            ? (
              <p className="text-gray-500 col-span-full">
                No products found.
              </p>
            ) : (
              data.map(product => (
                <ProductCard
                  key={product._id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  brand={product.brand}
                  slug={product.slug}
                />
              ))
            )}
        </div>
      </main>
    </div>
  );
};

export default HighlightsPage;
