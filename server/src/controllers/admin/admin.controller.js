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
    parsedVariants = JSON.parse(variants);
  } catch (err) {
    throw new ApiError(400, "Variants must be a valid JSON array");
  }

  if (!Array.isArray(parsedVariants) || parsedVariants.length === 0) {
    throw new ApiError(400, "At least one product variant is required");
  }

  const processedVariants = [];
  const uploadedPublicIds = []; // for rollback

  for (let i = 0; i < parsedVariants.length; i++) {
    const variant = parsedVariants[i];
    const { color, sizes } = variant;

    if (!color?.trim() || !Array.isArray(sizes) || sizes.length === 0) {
      // Rollback any uploaded images
      await Promise.all(uploadedPublicIds.map((id) => deleteFromCloudinary(id)));
      throw new ApiError(400, `Color and sizes are required for variant ${i + 1}`);
    }

    const imageFiles = req.files?.[`images_${i}`];
    if (!imageFiles || imageFiles.length === 0) {
      await Promise.all(uploadedPublicIds.map((id) => deleteFromCloudinary(id)));
      throw new ApiError(400, `Images are required for variant ${i + 1}`);
    }

    const uploadedImages = [];

    for (let file of imageFiles) {
      const uploaded = await uploadToCloudinary(file.path);
      if (uploaded?.url) {
        uploadedImages.push(uploaded.url);
        uploadedPublicIds.push(uploaded.public_id);
      }
    }

    if (uploadedImages.length === 0) {
      await Promise.all(uploadedPublicIds.map((id) => deleteFromCloudinary(id)));
      throw new ApiError(500, `Failed to upload images for variant ${i + 1}`);
    }

    processedVariants.push({
      color,
      images: uploadedImages,
      sizes,
    });
  }

   const baseSlug = title.toLowerCase().replace(/\s+/g, "-");
  let slug = baseSlug;
  let count = 1;
  while (await Product.findOne({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  let product;

  try {
    product = await Product.create({
      title: title.trim(),
      brand: brand.trim(),
      description,
      price,
      category: category.trim(),
      highLightTypes: highLightTypes?.trim(),
      gender: gender.trim(),
      discount: discount || 0,
      tags: tags || [],
      slug,
      variants: processedVariants,
    });
  } catch (err) {
    // On DB error, rollback uploaded images
    await Promise.all(uploadedPublicIds.map((id) => deleteFromCloudinary(id)));
    throw new ApiError(500, "Failed to save product to database");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

export const getAdminProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .select("title price category highLightTypes variants slug")
    .sort({ createdAt: -1 });

  const formattedProducts = products.map((product) => {
    const totalStock = product.variants.reduce((acc, variant) => {
      const sizeQtySum = variant.sizes.reduce((sum, s) => sum + s.quantity, 0);
      return acc + sizeQtySum;
    }, 0);

    const firstVariant = product.variants[0];

    return {
      _id: product._id,
      title: product.title,
      price: product.price,
      category: product.category,
      highLightTypes: product.highLightTypes,
      color: firstVariant?.color || "-",
      sizes: firstVariant?.sizes?.map((s) => s.size) || [],
      stockNumber: totalStock,
      image: firstVariant?.images?.[0] || "", // fallback to empty if no image
    };
  });

  return res
    .status(200)
    .json(new ApiResponse(200, formattedProducts, "Admin products fetched"));
});
