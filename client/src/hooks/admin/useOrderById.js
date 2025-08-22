
import { useQuery } from "@tanstack/react-query";
import { fetchOrderById } from "../../api/admin/fetchOrderById";

export const useOrderById = (orderId, enabled = false) => {
  return useQuery({
    queryKey: ["orderById", orderId],
    queryFn: () => fetchOrderById(orderId),
    enabled: enabled && !!orderId,
  });
};
