import { useQuery } from "@tanstack/react-query";
import { getOrderStatusData } from "../../api/admin/getOrderStatusDataApi";

export const useGetOrderStatusData = () =>
  useQuery({
    queryKey: ["order-status"],
    queryFn: getOrderStatusData
  });
