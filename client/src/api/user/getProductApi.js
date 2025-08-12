
import axiosInstance from "../axiosInstance";

export const searchProducts = async (query, filters = {}) => {
  const params = new URLSearchParams({ q: query, ...filters });
  const res = await axiosInstance.get(`/product/search?${params.toString()}`);
  return res.data.data;
};
