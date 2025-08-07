import axiosInstance from "../axiosInstance";

export const searchProducts = async (query) => {
  const res = await axiosInstance.get(`/product/search?q=${query}`);
  return res.data.data;
};
