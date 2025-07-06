import axiosInstance from "../axiosInstance";

export const updateCartItemQuantity = async ({ itemId, action }) => {
  const res = await axiosInstance.patch(`/cart/${itemId}`, { action });
  return res.data.data;
};
