import { useMutation } from "@tanstack/react-query";
import { verifyRazorpayPayment } from "../../api/user/verifyRazorpayPaymentApi";

export const useVerifyRazorpayPayment = () => {
  return useMutation({
    mutationFn: verifyRazorpayPayment,
  });
};
