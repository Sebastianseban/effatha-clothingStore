import axiosInstance from "../axiosInstance";

export const getProductBySlug = async (slug) => {
  const response = await axiosInstance.get(`/product/${slug}`);
  return response.data?.data;
};
