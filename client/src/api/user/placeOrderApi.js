import axiosInstance from "../axiosInstance";

export const placeOrder = async ({ addressId, paymentMethod }) => {
  const res = await axiosInstance.post("/order", {
    addressId,
    paymentMethod,
  });

  return res.data.data;
};
