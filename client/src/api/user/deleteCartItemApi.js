
import axiosInstance from "../axiosInstance";

export const deleteCartItem = async (itemId) => {
  const res = await axiosInstance.delete(`/cart/${itemId}`);
  return res.data;
};
