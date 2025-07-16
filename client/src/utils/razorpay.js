
export const launchRazorpay = ({ key, order, user, onSuccess }) => {
  const options = {
    key,
    amount: order.amount,
    currency: "INR",
    name: "Effatha Store",
    description: "Complete your payment",
    order_id: order.id,
    handler: onSuccess,
    prefill: {
      name: user?.firstName || "",
      contact: user?.mobileNumber || "",
    },
    theme: { color: "#000000" },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};
