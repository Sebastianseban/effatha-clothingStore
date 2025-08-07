import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../../api/user/getProductApi";


const useSearchProducts = (query) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchProducts(query),
    enabled: !!query, 
  });
};

export default useSearchProducts;
