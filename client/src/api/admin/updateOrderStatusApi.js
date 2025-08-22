import axiosInstance from "../axiosInstance";

export const updateOrderStatusApi = async (orderId, status) => {
  const res = await axiosInstance.patch(`/admin/orders/${orderId}`, { status });
  return res.data;
};
