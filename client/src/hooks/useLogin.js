
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

// Login API call
const loginUser = async (userData) => {
  const response = await axiosInstance.post("/users/login", userData);
  console.log(response)
  return response.data;
   // should contain user data
};

// Custom hook to use in components
export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
