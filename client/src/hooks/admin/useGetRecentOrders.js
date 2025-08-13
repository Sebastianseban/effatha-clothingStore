
import { useQuery } from "@tanstack/react-query";
import { getRecentOrders } from "../../api/admin/ getRecentOrdersApi";

export const useGetRecentOrders = () =>
  useQuery({
    queryKey: ["recent-orders"],
    queryFn: getRecentOrders
  });
