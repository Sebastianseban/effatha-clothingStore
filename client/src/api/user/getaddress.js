import axiosInstance from "../axiosInstance";

export const getAddress = async () => {
  const res = await axiosInstance.get("/users/addresses");
   return res.data.data;
};
