import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { useProduct } from "../../hooks/user/useProduct";
import { useAddToCart } from "../../hooks/user/useAddToCart";



const AddtoCartPopup = ({ slug, onClose }) => {
  const { data: product, isLoading } = useProduct(slug);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const { mutate, isPending } = useAddToCart();

  const handleAddToCart = () => {
    if (!selectedSize || isPending) return;

    mutate(
      {
        productId: product._id,
        color: selectedColor || product.variants[0]?.color,
        size: selectedSize,
        quantity: 1,
      },
      {
        onSuccess: () => {
       
          onClose();
        },
        onError: () => {
          alert("Failed to add to cart");
        },
      }
    );
  };

  if (isLoading || !product) {
    return (
      <div className="fixed inset-0 z-50  bg-opacity-50 flex items-center justify-center">
        <div className="bg-white px-6 py-10 rounded-lg text-lg">Loading...</div>
      </div>
    );
  }

  const { title, brand, price, variants = [] } = product;

  const defaultColor = selectedColor || variants[0]?.color;
  const selectedVariant =
    variants.find((variant) => variant.color === defaultColor) || variants[0];
  const previewImage = selectedVariant?.images?.[0] || "/placeholder.png";
  const sizes = selectedVariant?.sizes || [];

  return (
    <div className="fixed inset-0 z-50  bg-[#11111160] backdrop-blur-xs  bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white w-[90%] sm:w-[700px] flex flex-col sm:flex-row p-6 shadow-lg rounded-lg overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
        >
          <FiX />
        </button>

        {/* Image */}
        <div className="sm:w-[300px] w-full h-[300px]">
          <img
            src={previewImage}
            alt={title}
            className="w-full h-full object-contain bg-gray-100 rounded hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="sm:ml-6 mt-4 sm:mt-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">{brand}</p>
          <p className="text-xl font-semibold text-black mt-2">₹{price}</p>

          {/* Color Picker */}
          <p className="text-gray-500 text-xl mt-6">Available Colors</p>
          <div className="flex gap-2 mt-2">
            {variants.map((variant) => (
              <div
                key={variant._id}
                onClick={() => {
                  setSelectedColor(variant.color);
                  setSelectedSize(null);
                }}
                className={`w-6 h-6 rounded-full cursor-pointer border ${
                  defaultColor === variant.color
                    ? "border-black"
                    : "border-gray-400"
                }`}
                style={{ backgroundColor: variant.color }}
              />
            ))}
          </div>

          {/* Size Selector */}
          <p className="text-gray-500 text-xl mt-6">Apparel Size</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {sizes.map((sizeObj) => (
              <div
                key={sizeObj._id}
                onClick={() => setSelectedSize(sizeObj.size)}
                className={`border px-4 py-1 rounded cursor-pointer ${
                  selectedSize === sizeObj.size
                    ? "border-black"
                    : "border-gray-400"
                }`}
              >
                {sizeObj.size}
              </div>
            ))}
          </div>

          {/* Add to Cart Button */}
          <div className="mt-6">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || isPending}
              className={`w-full py-4 text-lg font-semibold rounded transition ${
                selectedSize
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
             {isPending ? "Adding to cart..." : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddtoCartPopup;
