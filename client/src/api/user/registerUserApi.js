import axiosInstance from "../axiosInstance";


export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/users/register", userData);
  return response.data;
};