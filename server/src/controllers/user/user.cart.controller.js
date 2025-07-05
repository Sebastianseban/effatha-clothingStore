import { Cart } from "../../models/cart.model.js";
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

export const getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const cart = await Cart.findOne({ user: userId })
    .populate("items.product", "title brand price variants")
    .exec();

  if (!cart || cart.items.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, { items: [] }, "Cart is empty"));
  }

  const formattedItems = cart.items.map((item) => {
    const variant = item.product.variants.find((v) => v.color === item.color);

    return {
      _id: item._id,
      productId: item.product._id,
      title: item.product.title,
      brand: item.product.brand,
      price: item.product.price,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      image: variant?.images?.[0] || null,
    };
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, formattedItems, "User cart fetched successfully")
    );
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { itemId } = req.params;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const cart = await Cart.findOne({ user: userId });

  if (!cart || !cart.items?.length) {
    throw new ApiError(404, "Cart is empty or not found");
  }

  const itemIndex = cart.items.findIndex(
    (item) => item?._id?.toString() === itemId?.trim()
  );

  if (itemIndex === -1) {
    throw new ApiError(404, "Item not found in cart");
  }

  cart.items.splice(itemIndex, 1);
  await cart.save();

  return res.status(200).json(
    new ApiResponse(200, cart.items, "Item removed from cart")
  );
});
 
export const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { itemId } = req.params;
  const { action } = req.body;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  if (!itemId || !["increment", "decrement"].includes(action)) {
    throw new ApiError(400, "Invalid request data");
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const item = cart.items.find((item) => item._id.toString() === itemId);
  if (!item) {
    throw new ApiError(404, "Item not found in cart");
  }

  if (action === "increment") {
    item.quantity += 1;
  } else if (action === "decrement" && item.quantity > 1) {
    item.quantity -= 1;
  }

  await cart.save();

  return res
    .status(200)
    .json(new ApiResponse(200, cart.items, "Cart item quantity updated"));
});
