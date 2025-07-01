
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAddress } from "../../api/user/updateAddress";
import { toast } from "react-hot-toast";

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      toast.success("Address updated successfully");
      queryClient.invalidateQueries(["user-addresses"]);
    },
    onError: () => {
      toast.error("Failed to update address");
    },
  });
};
