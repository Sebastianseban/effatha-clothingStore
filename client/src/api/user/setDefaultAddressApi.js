import axiosInstance from "../axiosInstance";

export const setDefaultAddress = async (addressId) => {
  const res = await axiosInstance.patch(`users/addresses/${addressId}/default`);
  return res.data;
};
