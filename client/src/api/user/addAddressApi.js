import axiosInstance from "../axiosInstance";


export const addAddress = async (addressData) => {
   const res = await axiosInstance.post("/users/addresses", addressData);
   res.data
}