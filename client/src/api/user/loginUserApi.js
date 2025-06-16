import axiosInstance from "../axiosInstance";


export const loginUser = async (userData) => {
  const response = await axiosInstance.post("/users/login", userData);
  console.log(response)
  return response.data;
   // should contain user data
};