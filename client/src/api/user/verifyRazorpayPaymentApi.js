import axiosInstance from "../axiosInstance";

export const verifyRazorpayPayment = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  userId,
  addressId,
}) => {
  const res = await axiosInstance.post("/order/verify-razorpay", {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId,
    addressId,
  });

  return res.data.data; 
};
