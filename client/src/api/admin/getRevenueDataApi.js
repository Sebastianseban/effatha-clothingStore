import axiosInstance from "../axiosInstance";


export const getRevenueData = async () => {
  const res = await axiosInstance.get("/admin/dashboard/revenue");
  return res.data.data;
};