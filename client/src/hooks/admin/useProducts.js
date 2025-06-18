
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../api/admin/getAllProductsApi";


export const useAdminProducts = () => {
  return useQuery({
    queryKey: ["admin-products"],
    queryFn: getAllProducts,
  });
};
