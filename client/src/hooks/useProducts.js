
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/getAllProducts";


export const useAdminProducts = () => {
  return useQuery({
    queryKey: ["admin-products"],
    queryFn: getAllProducts,
  });
};
