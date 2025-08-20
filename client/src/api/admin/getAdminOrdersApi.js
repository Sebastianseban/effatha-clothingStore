import axiosInstance from "../axiosInstance";

export const getOrdersAdmin = async () => {
  const res = await axiosInstance.get("/admin/orders");
  return res.data.data;
};
