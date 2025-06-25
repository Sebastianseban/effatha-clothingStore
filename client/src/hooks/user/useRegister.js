import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/user/registerUserApi";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};
