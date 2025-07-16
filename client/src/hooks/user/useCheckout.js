import { toast } from "react-hot-toast";
import { usePlaceOrder } from "./usePlaceOrder";
import { useVerifyRazorpayPayment } from "./useVerifyRazorpayPayment";
import { launchRazorpay } from "../../utils/razorpay";

export const useCheckout = (user, address) => {
  const placeOrder = usePlaceOrder();
  const verifyPayment = useVerifyRazorpayPayment();

  const handleCheckout = async (paymentMethod) => {
    if (!address?._id) {
      toast.error("🚫 Please select an address before placing the order.");
      return;
    }

    try {
      const orderData = await placeOrder.mutateAsync({
        addressId: address._id,
        paymentMethod,
      });

      if (paymentMethod === "razorpay") {
        const { razorpayOrder, key } = orderData;

        launchRazorpay({
          key,
          order: razorpayOrder,
          user,
          onSuccess: async (response) => {
            try {
              await verifyPayment.mutateAsync({
                ...response,
                userId: user._id,
                addressId: address._id,
              });

              toast.success("✅ Payment successful!");
              // optionally navigate to success page
            } catch {
              toast.error("❌ Payment verification failed. Please try again.");
            }
          },
        });
      } else {
        toast.success("✅ COD order placed successfully!");
        // optionally navigate to success page
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong while placing your order.");
    }
  };

  return {
    handleCheckout,
    isLoading: placeOrder.isPending || verifyPayment.isPending,
  };
};
