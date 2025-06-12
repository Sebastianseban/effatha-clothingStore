import React, { useState } from "react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import AddProduct from "../../components/admin/AddProduct";

const products = [
  {
    id: 1,
    title: "Nike Air Max",
    price: 129.99,
    stockNumber: 25,
    category: "t-shirt",
    color: "Black",
    sizes: ["M", "L"],
    highLightTypes: "best_seller",
    image: "https://via.placeholder.com/100", // replace with actual image URL
  },
  {
    id: 2,
    title: "Adidas Hoodie",
    price: 79.99,
    stockNumber: 12,
    category: "hoodie",
    color: "Gray",
    sizes: ["S", "M", "L"],
    highLightTypes: "new_arrival",
    image: "https://via.placeholder.com/100",
  },
];

const AdminProductsPage = () => {
  const [showAddProduct, setAddProduct] = useState(false);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <button
          onClick={() => setAddProduct(prev => !prev)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          + Add Product
        </button>
      </div>

      {showAddProduct && <AddProduct onClose={() => setAddProduct(false)} />}

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Color</th>
              <th className="px-6 py-3">Sizes</th>
              <th className="px-6 py-3">Highlight</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map(product => (
                <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-12 rounded object-cover border"
                    />
                    <span className="font-medium">{product.title}</span>
                  </td>
                  <td className="px-6 py-4 capitalize">{product.category}</td>
                  <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">{product.stockNumber}</td>
                  <td className="px-6 py-4">{product.color}</td>
                  <td className="px-6 py-4">
                    {product.sizes?.join(", ") || "-"}
                  </td>
                  <td className="px-6 py-4 capitalize text-indigo-600 font-medium">
                    {product.highLightTypes || "-"}
                  </td>
                  <td className="px-6 py-4 flex justify-end gap-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FiEye size={18} />
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      <FiEdit2 size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductsPage;
