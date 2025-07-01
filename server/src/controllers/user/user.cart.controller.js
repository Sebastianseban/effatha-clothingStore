import { Cart } from "../../models/cart.model.js"
import { Product } from "../../models/product.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { productId, color, size, quantity = 1 } = req.body;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  if ((!productId, !color, !size, !quantity)) {
    throw new ApiError(404, "product not found");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "product not found");
  }

  const variant = product.variants.find((v) => v.color === color);
  if (!variant) {
    throw new ApiError(404, "Color variant not found");
  }

  const sizeEntry = variant.sizes.find((s) => s.size === size);
  if (!sizeEntry) {
    throw new ApiError(404, "Size not available");
  }

  if (sizeEntry.quantity < quantity) {
    throw new ApiError(400, "Not enough stock");
  }

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const existingItem = cart.items.find(
    (item) =>
      item.product.toString() === productId &&
      item.color === color &&
      item.size === size
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, color, size, quantity });
  }

  await cart.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        cart,
        existingItem ? "Quantity updated in cart" : "Item added to cart"
      )
    );
});
