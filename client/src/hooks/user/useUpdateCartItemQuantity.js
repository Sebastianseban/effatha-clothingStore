import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartItemQuantity } from "../../api/user/updateCartItemQuantityApi";


export const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
};
