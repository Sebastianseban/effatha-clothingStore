import { useQuery } from "@tanstack/react-query";
import { getProductBySlug } from "../../api/user/productApi";

export const useProduct = (slug) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  });
};
