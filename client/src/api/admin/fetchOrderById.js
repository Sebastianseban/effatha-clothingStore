
import axiosInstance from "../axiosInstance";
export const fetchOrderById = async (orderId) => {
  const { data } = await axiosInstance.get(`admin/orders/${orderId}`);
  return data.data;
};