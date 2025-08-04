import axiosInstance from "../axiosInstance";

export const getColleactions = async () => {
  const res = await axiosInstance.get("/product/collections");

  return res.data.data;
};
