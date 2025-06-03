// import React, { useState } from "react";
// import { createPortal } from "react-dom";

// const AddProduct = ({ onClose }) => {
//   const [title, setTitle] = useState("");
// const [brand, setBrand] = useState("");
// const [price, setPrice] = useState("");
// const [color, setColor] = useState("");
// const [stock, setStock] = useState("");
// const [category, setCategory] = useState("t-shirt");
// const [highlight, setHighlight] = useState("");
// const [description, setDescription] = useState("");
// const [sizes, setSizes] = useState([]);
// const [inStock, setInStock] = useState(false);
// const [images, setImages] = useState([]);

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImages((prev) => [...prev, ...files]);
//   };

//   const removeImage = (index) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   return createPortal(
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="relative w-full max-w-3xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh]">
//         {/* Header */}
//         <div className="sticky top-0 z-10 bg-white p-6 border-b flex justify-between items-center">
//           <h2 className="text-2xl font-semibold text-gray-800">
//             Add New Product
//           </h2>
//           <button
//             onClick={onClose}
//             aria-label="Close"
//             className="text-3xl font-light text-gray-500 hover:text-gray-800"
//           >
//             &times;
//           </button>
//         </div>

//         <form className="p-6 overflow-y-auto max-h-[calc(90vh-64px)] space-y-8">
//           {/* Basic Info */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Product Title
//               </label>
//               <input
//                 value={title}
//                 onChange={(e)=>setTitle(e.target)}
//                 type="text"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Brand
//               </label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Price (₹)
//               </label>
//               <input
//                 type="number"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Color
//               </label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Stock Number
//               </label>
//               <input
//                 type="number"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description
//             </label>
//             <textarea
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               rows="4"
//             />
//           </div>

//           {/* Options */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Category
//               </label>
//               <select className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <option value="t-shirt">T-Shirt</option>
//                 <option value="hoodie">Hoodie</option>
//                 <option value="jeans">Jeans</option>
//                 <option value="jacket">Jacket</option>
//                 <option value="shorts">Shorts</option>
//                 <option value="accessories">Accessories</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Highlight Type
//               </label>
//               <select className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <option value="">None</option>
//                 <option value="new_arrival">New Arrival</option>
//                 <option value="best_seller">Best Seller</option>
//                 <option value="popular">Popular</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Sizes
//               </label>
//               <div className="flex flex-wrap gap-3">
//                 {["S", "M", "L", "XL", "XXL"].map((size) => (
//                   <label
//                     key={size}
//                     className="inline-flex items-center gap-2 text-sm text-gray-600"
//                   >
//                     <input
//                       type="checkbox"
//                       value={size}
//                       className="accent-blue-600"
//                     />
//                     {size}
//                   </label>
//                 ))}
//               </div>
//             </div>
//             <div className="flex items-center gap-2 mt-6 sm:mt-0">
//               <input type="checkbox" id="inStock" className="accent-blue-600" />
//               <label
//                 htmlFor="inStock"
//                 className="text-sm font-medium text-gray-700"
//               >
//                 In Stock
//               </label>
//             </div>
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Product Images
//             </label>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleImageChange}
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               You can select multiple images
//             </p>

//             {/* Image Previews */}
//             {images.length > 0 && (
//               <div className="mt-4 flex flex-wrap gap-4">
//                 {images.map((img, index) => (
//                   <div
//                     key={index}
//                     className="relative w-24 h-24 rounded overflow-hidden border shadow"
//                   >
//                     <img
//                       src={URL.createObjectURL(img)}
//                       alt={`Preview ${index}`}
//                       className="object-cover w-full h-full"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-bl px-1 hover:bg-red-600"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Actions */}
//           <div className="flex justify-end gap-3 pt-6 border-t">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//             >
//               Add Product
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default AddProduct;
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useAddProduct } from "../hooks/useAddProduct";
import AdminInput from "./AdminInput";

const AddProduct = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [stockNumber, setStockNumber] = useState(""); // renamed from stock
  const [category, setCategory] = useState("t-shirt");
  const [highLightTypes, setHighLightTypes] = useState(""); // renamed from highlight
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState([]);
  const [inStock, setInStock] = useState(false);
  const [images, setImages] = useState([]);

  const { mutate, isLoading, isSuccess, isError, error } = useAddProduct();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSizeChange = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("color", color);
    formData.append("stockNumber", stockNumber); // key matches backend
    formData.append("category", category);
    formData.append("highLightTypes", highLightTypes); // key matches backend
    formData.append("description", description);
    formData.append("inStock", inStock.toString()); // boolean as string

    sizes.forEach((size) => formData.append("sizes[]", size));
    images.forEach((img) => formData.append("images", img));

    mutate(formData, {
      onSuccess: () => {
        onClose(); // Close modal
      },
    });
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh]">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Add New Product</h2>
          <button
            onClick={onClose}
            className="text-3xl font-light text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-64px)] space-y-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <AdminInput label="Product Title" value={title} onChange={setTitle} />
            <AdminInput label="Brand" value={brand} onChange={setBrand} />
            <AdminInput
              label="Price (₹)"
              type="number"
              value={price}
              onChange={setPrice}
            />
            <AdminInput label="Color" value={color} onChange={setColor} />
            <AdminInput
              label="Stock Number"
              type="number"
              value={stockNumber}
              onChange={setStockNumber}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>

          {/* Dropdowns & Checkboxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="t-shirt">T-Shirt</option>
                <option value="hoodie">Hoodie</option>
                <option value="jeans">Jeans</option>
                <option value="jacket">Jacket</option>
                <option value="shorts">Shorts</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Highlight Type
              </label>
              <select
                value={highLightTypes}
                onChange={(e) => setHighLightTypes(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">None</option>
                <option value="new_arrival">New Arrival</option>
                <option value="best_seller">Best Seller</option>
                <option value="popular">Popular</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sizes
              </label>
              <div className="flex flex-wrap gap-3">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <label
                    key={size}
                    className="inline-flex items-center gap-2 text-sm text-gray-600"
                  >
                    <input
                      type="checkbox"
                      checked={sizes.includes(size)}
                      onChange={() => handleSizeChange(size)}
                      className="accent-blue-600"
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-6 sm:mt-0">
              <input
                type="checkbox"
                id="inStock"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="accent-blue-600"
              />
              <label htmlFor="inStock" className="text-sm font-medium text-gray-700">
                In Stock
              </label>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            {images.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 rounded overflow-hidden border shadow"
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Preview ${index}`}
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-bl px-1 hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Product"}
            </button>
          </div>

          {/* Feedback */}
          {isError && <p className="text-red-600">Error: {error.message}</p>}
          {isSuccess && (
            <p className="text-green-600">Product added successfully!</p>
          )}
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AddProduct;
