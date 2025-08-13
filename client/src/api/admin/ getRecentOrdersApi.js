import axiosInstance from "../axiosInstance";


export const getRecentOrders = async () => {
  const res = await axiosInstance.get("/admin/dashboard/recent-orders");
  return res.data.data;
};