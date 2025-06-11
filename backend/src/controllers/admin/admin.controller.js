
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
    category,
    highLightTypes,
    gender,
    discount,
    tags,
    variants, 
  } = req.body;

 
  if (
    [title, brand, price, category, gender].some((field) => !field?.trim()) ||
    !variants
  ) {
    throw new ApiError(400, "All required fields must be filled");
  }

  let parsedVariants;

  try {
    parsedVariants = JSON.parse(variants); // Parse from string
  } catch (err) {
    throw new ApiError(400, "Variants must be a valid JSON array");
  }

  if (!Array.isArray(parsedVariants) || parsedVariants.length === 0) {
    throw new ApiError(400, "At least one product variant is required");
  }

  const processedVariants = [];

  for (let i = 0; i < parsedVariants.length; i++) {
    const variant = parsedVariants[i];
    const { color, sizes } = variant;

    if (!color?.trim() || !Array.isArray(sizes) || sizes.length === 0) {
      throw new ApiError(
        400,
        `Color and sizes are required for variant ${i + 1}`
      );
    }
    console.log("req files" + req.files.images_0);
    const imageFiles = req.files?.[`images_${i}`];
    if (!imageFiles || imageFiles.length === 0) {
      throw new ApiError(400, `Images are required for variant ${i + 1}`);
    }

    const uploadedImages = [];
    for (let file of imageFiles) {
      const uploaded = await uploadToCloudinary(file.path);
      if (uploaded?.url) uploadedImages.push(uploaded.url);
    }

    if (uploadedImages.length === 0) {
      throw new ApiError(500, `Failed to upload images for variant ${i + 1}`);
    }

    processedVariants.push({
      color,
      images: uploadedImages,
      sizes,
    });
  }

  // Create slug
  const slug = title.toLowerCase().replace(/\s+/g, "-");

  const product = await Product.create({
    title: title.trim(),
    brand: brand.trim(),
    description,
    price,
    category: category.trim(),
    highLightTypes: highLightTypes?.trim(), // fix here
    gender: gender.trim(), // and here
    discount: discount || 0,
    tags: tags || [],
    slug,
    variants: processedVariants,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});
