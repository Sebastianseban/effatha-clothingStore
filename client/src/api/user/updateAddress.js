import axiosInstance from "../axiosInstance.js";

export const updateAddress = async ({addressId,formData}) => {
    const res = await axiosInstance.put(`/users/addresses/${addressId}`,formData)
    return res.data

}