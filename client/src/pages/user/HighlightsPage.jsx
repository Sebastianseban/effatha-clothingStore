
import ProductCard from '../../components/ProductCard'
import { useHighlights } from '../../hooks/user/useHighlights'

const HighlightsPage = ({ title, type }) => {
  const { data = [], isLoading, isError } = useHighlights(type);

  return (
    <div className="flex w-full min-h-screen">

      <aside className="w-64 bg-white border-r border-gray-200 p-6">
      
      </aside>

   
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
                <div key={i} className="w-full h-64 bg-gray-200 animate-pulse rounded" />
              ))
            : data.length === 0
            ? <p className="text-gray-500 col-span-full">No products found.</p>
            : data.map(product => (
                <ProductCard
                  key={product._id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  brand={product.brand}
                  slug={product.slug}
                />
              ))}
        </div>
      </main>
    </div>
  );
};

export default HighlightsPage;
