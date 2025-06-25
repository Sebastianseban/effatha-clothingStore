import { useQuery } from "@tanstack/react-query";
import { getAddress } from "../../api/user/getaddress";

export const useGetAddress = () => {
  return useQuery({
    queryKey: ["user-addresses"],
    queryFn: getAddress,
  });
};
