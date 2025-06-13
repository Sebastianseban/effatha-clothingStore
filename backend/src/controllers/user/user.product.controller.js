import { asyncHandler } from "../../utils/asyncHandler.js";
import { Product } from "../../models/product.model.js";
import {ApiResponse} from "../../utils/ApiResponse.js"

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

  return res.status(200).json(
    new ApiResponse(200, formattedProducts, `Products for ${type} fetched`)
  );
});
