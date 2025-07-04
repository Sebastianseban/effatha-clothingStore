import axiosInstance from "../axiosInstance";

export const getCart = async () => {
  const res = await axiosInstance.get("cart")
  return res.data.data;
}