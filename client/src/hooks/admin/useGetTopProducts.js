import { useQuery } from "@tanstack/react-query";
import { getTopProducts } from "../../api/admin/getTopProductsApi";

export const useGetTopProducts = () =>
  useQuery({
    queryKey: ["top-products"],
    queryFn: getTopProducts
  });
