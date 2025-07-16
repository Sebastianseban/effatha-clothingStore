import { useMutation } from "@tanstack/react-query";
import { placeOrder } from "../../api/user/placeOrderApi";

export const usePlaceOrder = () => {
  return useMutation({
    mutationFn: placeOrder,
  });
};
