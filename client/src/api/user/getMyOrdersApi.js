import axiosInstance from "../axiosInstance";



export const getMyOrders = async () => {
  const res = await axiosInstance.get("/order/my");
  return res.data;
};
