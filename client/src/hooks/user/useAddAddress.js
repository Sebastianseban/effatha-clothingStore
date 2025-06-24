import { useMutation } from "@tanstack/react-query";
import { addAddress } from "../../api/user/addAddressApi";

export const useAddAddress = () => {
  return useMutation({
    mutationFn: addAddress,
  });
};
