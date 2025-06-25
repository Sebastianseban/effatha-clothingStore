import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setDefaultAddress } from "../../api/user/setDefaultAddressApi";
import toast from "react-hot-toast";

export const useSetDefaultAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setDefaultAddress,
    onSuccess: () => {
      toast.success("Default address updated");
      queryClient.invalidateQueries(["user-addresses"]);
    },
     onError: () => {
      toast.error("Failed to set default address");
    },
  });
};
