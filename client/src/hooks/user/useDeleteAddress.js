import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddress } from "../../api/user/deleteAddressApi";
import { toast } from "react-hot-toast";

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      toast.success("Address deleted successfully");
      queryClient.invalidateQueries(["user-addresses"]);
    },
    onError: () => {
      toast.error("Failed to delete address");
    },
  });
};
