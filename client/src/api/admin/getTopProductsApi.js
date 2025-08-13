import axiosInstance from "../axiosInstance";

export const getTopProducts = async () => {
  const res = await axiosInstance.get("/admin/dashboard/top-products");
  return res.data.data;
};