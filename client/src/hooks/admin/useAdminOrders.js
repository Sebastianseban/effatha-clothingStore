
import { useQuery } from "@tanstack/react-query";
import { getOrdersAdmin } from "../../api/admin/getAdminOrdersApi";

export const useGetAdminOrder = (filters) => {
  return useQuery({
    queryKey: ["admin-orders", filters], // cache per filter
    queryFn: () => getOrdersAdmin(filters),
    staleTime: 1000 * 60, // 1 min cache
    refetchInterval: 1000 * 30, // refresh every 30s
  });
};
