import { asyncHandler } from "../../utils/asyncHandler.js";
import { Product } from "../../models/product.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";

export const getHighlightedProducts = asyncHandler(async (req, res) => {
  const { type } = req.params;

  if (!["new_arrival", "best_seller", "popular"].includes(type)) {
    throw new ApiError(400, "Invalid highlight type");
  }

  const products = await Product.find({ highLightTypes: type })
    .select("title brand price variants slug")
    .sort({ createdAt: -1 })
    .limit(10); // Optional: limit results

  const formattedProducts = products.map((product) => {
    const firstVariant = product.variants?.[0] || {};
    const stock = firstVariant.sizes?.reduce(
      (sum, size) => sum + size.quantity,
      0
    );

    return {
      _id: product._id,
      title: product.title,
      brand: product.brand,
      price: product.price,
      slug: product.slug,
      color: firstVariant.color || "-",
      image: firstVariant.images?.[0] || "",
      stock: stock || 0,
    };
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, formattedProducts, `Products for ${type} fetched`)
    );
});

export const getProductBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const product = await Product.findOne({
    slug: { $regex: new RegExp(`^${slug}$`, "i") },
  }).select("-__v");

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(
    new ApiResponse(200, product, "Product found successfully")
  );
});

export const getNewArrivals = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .select("title brand price variants slug createdAt")
    .sort({ createdAt: -1 });

  const formattedProducts = products.map((product) => {
    const firstVariant = Array.isArray(product.variants) && product.variants[0] ? product.variants[0] : {};
    const image = Array.isArray(firstVariant.images) && firstVariant.images.length > 0 ? firstVariant.images[0] : "";
    const color = firstVariant.color || "-";
    const stock = Array.isArray(firstVariant.sizes)
      ? firstVariant.sizes.reduce((acc, size) => acc + (size.quantity || 0), 0)
      : 0;

    return {
      _id: product._id,
      title: product.title,
      brand: product.brand,
      price: product.price,
      slug: product.slug,
      color,
      image,
      stock,
    };
  });

  return res
    .status(200)
    .json(new ApiResponse(200, formattedProducts, "New arrivals fetched"));
});

