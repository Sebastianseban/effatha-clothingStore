import axiosInstance from "../axiosInstance";


export const getOrderStatusData = async () => {
  const res = await axiosInstance.get("/admin/dashboard/order-status");
  return res.data.data;
};