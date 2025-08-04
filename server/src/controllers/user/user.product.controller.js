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


export const getFilteredHighlights = asyncHandler(async (req, res) => {
  const {
    type,
    inStock,
    minPrice = 0,
    maxPrice = 999999,
    sizes,
    sort,
  } = req.query;

  // Validate highlight type
  if (!["new_arrival", "best_seller", "popular"].includes(type)) {
    throw new ApiError(400, "Invalid highlight type");
  }

  // Build base query
  const query = {
    highLightTypes: type,
    price: { $gte: Number(minPrice), $lte: Number(maxPrice) },
  };

  // Fetch products with limited fields
  const allProducts = await Product.find(query).select(
    "title brand price variants slug createdAt"
  );

  // Format each product
  const formattedProducts = allProducts.map((product) => {
    const firstVariant = product.variants?.[0] || {};
    const sizesArray = firstVariant.sizes || [];

    const stock = sizesArray.reduce((sum, size) => sum + (size.quantity || 0), 0);

    return {
      _id: product._id,
      title: product.title,
      brand: product.brand,
      price: product.price,
      slug: product.slug,
      color: firstVariant.color || "-",
      image: firstVariant.images?.[0] || "",
      stock,
      availableSizes: sizesArray.map((s) => s.size).filter(Boolean),
      createdAt: product.createdAt,
    };
  });

  // Apply inStock filter
  let filtered = formattedProducts;
  if (inStock === "true") {
    filtered = filtered.filter((p) => p.stock > 0);
  } else if (inStock === "false") {
    filtered = filtered.filter((p) => p.stock <= 0);
  }

  // Filter by sizes if provided
  if (sizes) {
    const sizeArray = sizes.split(",");
    filtered = filtered.filter((product) =>
      product.availableSizes.some((s) => sizeArray.includes(s))
    );
  }

  // Sort results
  switch (sort) {
    case "price_asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    default:
      break;
  }

  // Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      filtered,
      `Filtered products for ${type} fetched`
    )
  );
});

export const getCollections = asyncHandler(async (req, res) => {
  const collections = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        products: {
          $push: {
            _id: "$_id",
            title: "$title",
            brand: "$brand",
            price: "$price",
            slug: "$slug",
            // Get the first image from the first variant
            image: { $arrayElemAt: [{ $arrayElemAt: ["$variants.images", 0] }, 0] },
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        products: { $slice: ["$products", 4] }, // Limit to 4 per category
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, collections, "Collections fetched successfully"));
});
