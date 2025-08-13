import { useQuery } from "@tanstack/react-query";
import { getRevenueData } from "../../api/admin/getRevenueDataApi";

export const useGetRevenueData = () =>
  useQuery({
    queryKey: ["revenue"],
    queryFn: getRevenueData
  });
