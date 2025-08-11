import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../../api/user/getProductApi";


const useSearchProducts = (query,filters) => {
  return useQuery({
    queryKey: ["search", query,filters],
    queryFn: () => searchProducts(query,filters),
    enabled: !!query, 
  });
};

export default useSearchProducts;
