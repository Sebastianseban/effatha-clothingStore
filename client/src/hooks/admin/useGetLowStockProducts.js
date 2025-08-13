import { useQuery } from "@tanstack/react-query";
import { getLowStockProducts } from "../../api/admin/getLowStockProductsApi";

export const useGetLowStockProducts = () =>
  useQuery({
    queryKey: ["low-stock"],
    queryFn: getLowStockProducts
  });
