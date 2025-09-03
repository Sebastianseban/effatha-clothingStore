import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminEditProduct } from "../../api/admin/adminEditProduct";

export const useAdminEditProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, productData, imageFiles }) =>
      adminEditProduct(productId, productData),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-products"]);
    },
  });
};
