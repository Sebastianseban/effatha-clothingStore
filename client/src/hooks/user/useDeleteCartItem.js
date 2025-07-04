
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItem } from "../../api/user/deleteCartItemApi";


export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
};
