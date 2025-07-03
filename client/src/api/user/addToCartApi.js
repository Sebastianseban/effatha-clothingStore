import axiosInstance from "../axiosInstance";


export const AddToCart = async (cartData) => {
  const res = await axiosInstance.post("/cart", cartData);
  return res.data; 
};