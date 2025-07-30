import React, { useState } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { PiHandCoins } from "react-icons/pi";
import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/user/useProduct";
import ProductImages from "../components/ProductImages";
import { useAddToCart } from "../hooks/user/useAddToCart";
import toast from "react-hot-toast"; // ✅ toast import

const ProductPage = () => {
  const { slug } = useParams();
  const { data: product, isLoading } = useProduct(slug);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [isAdding, setIsAdding] = useState(false); // ✅ state to handle loading

  const { mutate: addToCart } = useAddToCart();

  if (isLoading || !product) return <div className="p-10">Loading...</div>;

  const variants = product.variants || [];
  const selectedVariant =
    variants.find((v) => v.color === selectedColor) || variants[0];
  const sizes = selectedVariant?.sizes || [];
  const images = selectedVariant?.images || [];

  return (
    <div className="w-full flex flex-col xl:flex-row mt-5 px-8">
      <div className="xl:w-3/5">
        <ProductImages images={images} />
      </div>

      {/* Right Section */}
      <div className="xl:w-2/5 px-10">
        <div>
          {/* Title */}
          <div className="flex justify-between">
            <p className="text-xl text-gray-900 font-light tracking-widest">
              {product.brand}
            </p>
            <MdFavoriteBorder className="text-2xl" />
          </div>

          <h1 className="text-3xl text-black mt-2">{product.title}</h1>
          <p className="text-gray-500 text-sm">{product.description}</p>
          <h1 className="text-black text-2xl font-medium mt-1">
            ₹{product.price}
          </h1>

          {/* Color Selector */}
          <p className="text-gray-500 text-xl mt-4">Available Colors</p>
          <div className="flex gap-2 mt-2">
            {variants.map((variant) => (
              <div
                key={variant._id}
                onClick={() => {
                  setSelectedColor(variant.color);
                  setSelectedSize(null);
                }}
                className={`w-6 h-6 rounded-full border cursor-pointer ${
                  selectedColor === variant.color ||
                  (!selectedColor && variant === variants[0])
                    ? "border-black"
                    : "border-gray-400"
                }`}
                style={{ backgroundColor: variant.color }}
                title={variant.color}
              />
            ))}
          </div>

          {/* Size Selector */}
          <p className="text-gray-500 text-xl mt-6">Apparel Size</p>
          <div className="flex gap-2 mt-2">
            {sizes.map((sizeObj) => (
              <div
                key={sizeObj._id}
                onClick={() => setSelectedSize(sizeObj.size)}
                className={`border px-5 py-1 text-center cursor-pointer ${
                  selectedSize === sizeObj.size
                    ? "border-black"
                    : "border-gray-400"
                }`}
              >
                <p>{sizeObj.size}</p>
              </div>
            ))}
          </div>

          {/* Add to Cart */}
          <div className="my-5">
            <button
              className={`bg-black text-white w-full py-5 ${
                isAdding ? "opacity-60 cursor-not-allowed" : ""
              }`}
              disabled={isAdding}
              onClick={() => {
                if (!selectedColor || !selectedSize) {
                  toast.error("Please select both color and size.");
                  return;
                }

                setIsAdding(true);
                toast.promise(
                  new Promise((resolve, reject) => {
                    addToCart(
                      {
                        productId: product._id,
                        color: selectedColor,
                        size: selectedSize,
                        quantity: 1,
                      },
                      {
                        onSuccess: () => resolve(),
                        onError: () => reject(),
                        onSettled: () => setIsAdding(false),
                      }
                    );
                  }),
                  {
                    loading: "Adding to cart...",
                    success: "Product added to cart!",
                    error: "Failed to add to cart.",
                  }
                );
              }}
            >
              {isAdding ? "Adding..." : "Add to cart"}
            </button>
          </div>

          <div
            className="flex justify-between items-center border-b border-gray-400 pb-4 mt-4 cursor-pointer"
            onClick={() => setShowAbout(!showAbout)}
          >
            <p className="font-medium tracking-wide text-gray-800">
              ABOUT PRODUCT
            </p>
            {showAbout ? <FaMinus /> : <FaPlus />}
          </div>

          {showAbout && (
            <div className="text-sm text-gray-600 mt-4 leading-relaxed space-y-2">
              <p>
                The <strong>{product.title}</strong> is a stylish{" "}
                {product.gender}'s {product.category} by{" "}
                <strong>{product.brand}</strong>, part of their{" "}
                <strong>{product.highLightTypes.replace("_", " ")}</strong>{" "}
                collection.
                {product.description &&
                  " " + product.description.split("\r\n")[0]}
              </p>
              <p>
                Available in{" "}
                <strong>{variants.map((v) => v.color).join(", ")}</strong> with
                sizes like{" "}
                <strong>
                  {[
                    ...new Set(
                      variants.flatMap((v) => v.sizes.map((s) => s.size))
                    ),
                  ].join(", ")}
                </strong>
                .
              </p>
              <p>
                Currently priced at ₹{product.price} with a{" "}
                <strong>{product.discount}% discount</strong>. Perfect for bold
                and modern styles.
              </p>
            </div>
          )}

          {/* Service Icons */}
          <div className="flex justify-between items-center border-b border-gray-400 mt-6 pb-4 px-8">
            <div className="flex flex-col items-center">
              <FaShippingFast className="text-4xl" />
              <p className="text-sm">Free shipping</p>
            </div>
            <div className="flex flex-col items-center">
              <TfiReload className="text-4xl" />
              <p className="text-sm">No return</p>
            </div>
            <div className="flex flex-col items-center">
              <PiHandCoins className="text-4xl" />
              <p className="text-sm">COD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
