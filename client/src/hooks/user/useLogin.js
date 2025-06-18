
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/user/loginUserApi";


export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
