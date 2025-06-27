import axiosInstance from "../axiosInstance";

export const deleteAddress = async (addressId) => {
  const res = await axiosInstance.delete(`/users/addresses/${addressId}`);
  return res.data;
};
