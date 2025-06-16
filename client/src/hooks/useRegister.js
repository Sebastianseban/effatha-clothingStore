import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

const registerUser = async (userData) => {
  const response = await axiosInstance.post("/users/register", userData);
  return response.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};
