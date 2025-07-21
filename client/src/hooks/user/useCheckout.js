import { toast } from "react-hot-toast";
import { usePlaceOrder } from "./usePlaceOrder";
import { useVerifyRazorpayPayment } from "./useVerifyRazorpayPayment";
import { launchRazorpay } from "../../utils/razorpay";
import { useNavigate } from "react-router-dom";

export const useCheckout = (user, address) => {
   const navigate = useNavigate();
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
               navigate("/order-success");
            
            } catch {
              toast.error("❌ Payment verification failed. Please try again.");
            }
          },
        });
      } else {
        toast.success("✅ COD order placed successfully!");
        navigate("/order-success");
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
