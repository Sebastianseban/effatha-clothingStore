
import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../../api/user/getMyOrdersApi";


export const useGetMyOrders = () => {
  return useQuery({
    queryKey: ["my-orders"],
    queryFn: getMyOrders,
  });
};
