
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useAddProduct } from "../hooks/useAddProduct";
import AdminInput from "./AdminInput";
import { FiTrash2 } from "react-icons/fi";

const AddProduct = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("t-shirt");
  const [highLightTypes, setHighLightTypes] = useState("");
  const [gender, setGender] = useState("men");
  const [inStock, setInStock] = useState(false);
  const [tags, setTags] = useState("");
  const [discount, setDiscount] = useState(0);
  const [variants, setVariants] = useState([
    {
      color: "",
      images: [],
      imagePreviews: [],
      sizes: [{ size: "", quantity: 0 }],
    },
  ]);

  const { mutate, isLoading, isSuccess, isError, error } = useAddProduct();

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleImageChange = (e, variantIndex) => {
    const files = Array.from(e.target.files);
    const updated = [...variants];
    updated[variantIndex].images = files;
    updated[variantIndex].imagePreviews = files.map((file) => URL.createObjectURL(file));
    setVariants(updated);
  };

  const handleSizeChange = (variantIndex, sizeIndex, field, value) => {
    const updated = [...variants];
    updated[variantIndex].sizes[sizeIndex][field] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      { color: "", images: [], imagePreviews: [], sizes: [{ size: "", quantity: 0 }] },
    ]);
  };

  const addSize = (variantIndex) => {
    const updated = [...variants];
    updated[variantIndex].sizes.push({ size: "", quantity: 0 });
    setVariants(updated);
  };

  const removeVariant = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("highLightTypes", highLightTypes);
    formData.append("gender", gender);
    formData.append("inStock", inStock.toString());
    formData.append("tags", tags);
    formData.append("discount", discount);

    const variantData = variants.map((variant, index) => {
      variant.images.forEach((img) => {
        formData.append(`images_${index}`, img);
      });
      return {
        color: variant.color,
        sizes: variant.sizes,
      };
    });

    formData.append("variants", JSON.stringify(variantData));

    mutate(formData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto max-h-screen">
      <div className="relative w-full max-w-5xl mx-4 my-8 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto bg-white">
        <div className="sticky top-0 z-10 bg-white p-5 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
          <button
            onClick={onClose}
            className="text-3xl font-light text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto h-full space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <AdminInput label="Product Title" value={title} onChange={setTitle} />
            <AdminInput label="Brand" value={brand} onChange={setBrand} />
            <AdminInput type="number" label="Price (₹)" value={price} onChange={setPrice} />
            <AdminInput label="Tags (comma-separated)" value={tags} onChange={setTags} />
            <AdminInput label="Discount (%)" type="number" value={discount} onChange={setDiscount} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="t-shirt">T-Shirt</option>
                <option value="hoodie">Hoodie</option>
                <option value="jeans">Jeans</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="men">Men</option>
                <option value="women">Women</option>–
                <option value="unisex">Unisex</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Highlight Type</label>
              <select
                value={highLightTypes}
                onChange={(e) => setHighLightTypes(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="">None</option>
                <option value="new_arrival">New Arrival</option>
                <option value="best_seller">Best Seller</option>
                <option value="popular">Popular</option>
              </select>
            </div>
            <div className="flex items-center gap-2 mt-8">
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

          <div className="space-y-6">
            {variants.map((variant, vIndex) => (
              <div key={vIndex} className="relative p-5 rounded-lg shadow-sm bg-gray-50 space-y-4 border">
                <button
                  type="button"
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => removeVariant(vIndex)}
                >
                  <FiTrash2 size={18} />
                </button>
                <AdminInput
                  label={`Variant ${vIndex + 1} Color`}
                  value={variant.color}
                  onChange={(val) => handleVariantChange(vIndex, "color", val)}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageChange(e, vIndex)}
                    className="block w-full border rounded-4xl "
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {variant.imagePreviews?.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="preview"
                        className="w-16 h-16 object-cover rounded border"
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sizes & Quantity</label>
                  {variant.sizes.map((s, sIndex) => (
                    <div key={sIndex} className="flex gap-4 mb-2">
                      <input
                        type="text"
                        placeholder="Size (e.g., M)"
                        value={s.size}
                        onChange={(e) => handleSizeChange(vIndex, sIndex, "size", e.target.value)}
                        className="border px-3 py-1 rounded w-1/2"
                      />
                      <input
                        type="number"
                        placeholder="Quantity"
                        value={s.quantity}
                        onChange={(e) => handleSizeChange(vIndex, sIndex, "quantity", e.target.value)}
                        className="border px-3 py-1 rounded w-1/2"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addSize(vIndex)}
                    className="text-blue-600 text-sm hover:underline mt-1"
                  >
                    + Add Size
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addVariant}
              className="text-blue-600 hover:underline text-sm"
            >
              + Add Variant
            </button>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mb-20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {isLoading ? "Adding..." : "Add Product"}
            </button>
          </div>
          {isError && <p className="text-red-600">Error: {error.message}</p>}
          {isSuccess && <p className="text-green-600">Product added successfully!</p>}
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AddProduct;
