

export const convertCartToOrderItems = (cart) => {
  if (!cart || cart.items.length === 0) return [];

  return cart.items.map((item) => {
    const variant = item.product.variants.find(v => v.color === item.color);
    return {
      product: item.product._id,
      title: item.product.title,
      brand: item.product.brand,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
      price: item.product.price,
      image: variant?.images?.[0] || null,
    };
  });
};
