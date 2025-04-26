
import React from 'react';

import ProductCard from '../components/ProductCard';

const NewArrivals = () => {
  return (
    <div className="flex w-full min-h-screen">
      {/* Sidebar Filters */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Availability</h3>
          <div>
            <label className="block">
              <input type="checkbox" className="mr-2" /> In Stock
            </label>
            <label className="block">
              <input type="checkbox" className="mr-2" /> Out of Stock
            </label>
          </div>
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

      {/* Main Product Area */}
      <main className="flex-1 p-6 bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">35 Products</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 35 }).map((_, i) => (
            <ProductCard image="./tshirt.png" key={i} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default NewArrivals;
