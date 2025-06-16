// src/hooks/useHighlights.js
import { useQuery } from "@tanstack/react-query";
import { fetchHighlights } from "../../api/user/getHighlights";




export const useHighlights = (type) => {
  return useQuery({
    queryKey: ["highlights", type],
    queryFn: () => fetchHighlights(type),
  });
};
