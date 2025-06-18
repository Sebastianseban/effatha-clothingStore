import axiosInstance from "../axiosInstance"


export const getAllProducts = async () => {
    const response = await axiosInstance.get("/admin/products")
    return response.data?.data;
}