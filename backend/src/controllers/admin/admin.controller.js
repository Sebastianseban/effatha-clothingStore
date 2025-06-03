import { Product } from "../../models/product.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { uploadToCloudinary } from "../../utils/cloudinary.js";

export const createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    brand,
    description,
    price,
    color,
    sizes,
    category,
    inStock,
    stockNumber,
    highLightTypes,
  } = req.body;

  // Validate required fields
  if (
    [title, brand, price, color, category].some(field => !field?.trim()) ||
    !sizes?.length ||
    stockNumber === undefined
  ) {
    throw new ApiError(400, "All required fields must be filled");
  }

  // Validate images
  if (!req.files || !req.files.images || req.files.images.length === 0) {
    throw new ApiError(400, "At least one product image is required");
  }

  // Upload images to Cloudinary
  const uploadedImages = [];
  for (let file of req.files.images) {
    const uploaded = await uploadToCloudinary(file.path);
    if (uploaded?.url) uploadedImages.push(uploaded.url);
  }

  if (uploadedImages.length === 0) {
    throw new ApiError(500, "Failed to upload images");
  }

  // Create product
  const product = await Product.create({
    title,
    brand,
    description,
    price,
    color,
    sizes,
    images: uploadedImages,
    category,
    inStock: inStock ?? true,
    stockNumber,
    highLightTypes,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});
