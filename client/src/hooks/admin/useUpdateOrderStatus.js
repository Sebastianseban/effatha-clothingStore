import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatusApi } from "../../api/admin/updateOrderStatusApi";

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }) => updateOrderStatusApi(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-orders"]); 
    },
  });
};
