import axiosInstance from "../axiosInstance";


export const fetchHighlights = async (type) => {
  const res = await axiosInstance.get(`/product/highlights/${type}`);
  return res.data.data; 
};