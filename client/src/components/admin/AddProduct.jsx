
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import AdminInput from "./AdminInput";
import { FiTrash2 } from "react-icons/fi";
import { useAddProduct } from "../../hooks/admin/useAddProduct";

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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleImageChange = (e, variantIndex) => {
    const files = Array.from(e.target.files);
    const updated = [...variants];
    updated[variantIndex].images = [...updated[variantIndex].images, ...files];
    updated[variantIndex].imagePreviews = [
      ...updated[variantIndex].imagePreviews,
      ...files.map((file) => URL.createObjectURL(file)),
    ];
    setVariants(updated);
  };

  const handleRemoveImage = (variantIndex, imageIndex) => {
    const updated = [...variants];
    updated[variantIndex].images.splice(imageIndex, 1);
    updated[variantIndex].imagePreviews.splice(imageIndex, 1);
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
      {
        color: "",
        images: [],
        imagePreviews: [],
        sizes: [{ size: "", quantity: 0 }],
      },
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

  const isFormValid = () => {
    if (!title || !brand || !price || !description || !tags) return false;
    for (const variant of variants) {
      if (!variant.color || variant.images.length === 0) return false;
      for (const size of variant.sizes) {
        if (!size.size || size.quantity <= 0) return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Please fill in all required fields correctly.");
      return;
    }

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
        setTitle("");
        setBrand("");
        setPrice("");
        setDescription("");
        setTags("");
        setDiscount(0);
        setVariants([
          {
            color: "",
            images: [],
            imagePreviews: [],
            sizes: [{ size: "", quantity: 0 }],
          },
        ]);
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
                <option value="women">Women</option>
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
              <label htmlFor="inStock" className="text-sm font-medium text-gray-700">In Stock</label>
            </div>
          </div>

          <div className="space-y-6">
            {variants.map((variant, vIndex) => (
              <div
                key={vIndex}
                className="relative p-5 rounded-lg shadow-sm bg-gray-50 space-y-4 border"
              >
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
                  <label className="block cursor-pointer text-blue-500 hover:underline">
                    Upload Images
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleImageChange(e, vIndex)}
                      className="hidden"
                    />
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {variant.imagePreviews?.map((img, i) => (
                      <div key={i} className="relative group">
                        <img
                          src={img}
                          alt="preview"
                          className="w-16 h-16 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(vIndex, i)}
                          className="absolute top-[-6px] right-[-6px] bg-red-500 text-white rounded-full p-1 text-xs opacity-80 group-hover:opacity-100"
                        >
                          ×
                        </button>
                      </div>
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
                        onChange={(e) =>
                          handleSizeChange(vIndex, sIndex, "size", e.target.value)
                        }
                        className="border px-3 py-1 rounded w-1/2"
                      />
                      <input
                        type="number"
                        placeholder="Quantity"
                        value={s.quantity}
                        onChange={(e) =>
                          handleSizeChange(vIndex, sIndex, "quantity", e.target.value)
                        }
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

          {isError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
              Error: {error.message}
            </div>
          )}
          {isSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
              Product added successfully!
            </div>
          )}
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AddProduct;