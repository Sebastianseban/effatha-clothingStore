import {useQuery }from "@tanstack/react-query";
import { getCart } from "../../api/user/getcartApi";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};
