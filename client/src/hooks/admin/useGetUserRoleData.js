import { useQuery } from "@tanstack/react-query";
import { getUserRoleData } from "../../api/admin/getUserRoleDataApi";

export const useGetUserRoleData = () =>
  useQuery({
    queryKey: ["user-roles"],
    queryFn: getUserRoleData
  });
