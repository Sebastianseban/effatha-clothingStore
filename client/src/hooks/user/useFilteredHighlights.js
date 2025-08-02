import { useQuery } from "@tanstack/react-query";
import { getFilteredHighlights } from "../../api/user/getFilteredHighlights";


export const useFilteredHighlights = (filters) => {
  return useQuery({
    queryKey: ["filtered-highlights", filters],
    queryFn: () => getFilteredHighlights(filters),
    enabled: !!filters?.type, // Only fetch when `type` is provided
  });
};
