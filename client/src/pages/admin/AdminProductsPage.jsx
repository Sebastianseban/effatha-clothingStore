import React from "react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

const products = [
  {
    id: 1,
    name: "Nike Air Max",
    price: "$129.99",
    stock: 25,
    category: "Shoes",
    image: "https://www.nike.com/in/w/air-max-shoes-a6d8hzy7ok",
  },
  {
    id: 2,
    name: "Adidas Hoodie",
    price: "$79.99",
    stock: 12,
    category: "Apparel",
    image: "https://via.placeholder.com/100x100",
  },
];

const AdminProductsPage = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          + Add Product
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <span className="font-medium">{product.name}</span>
                </td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.stock}</td>
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
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
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
