import axiosInstance from "../axiosInstance"


export const getDashboardStats = async () => {
    const res = await axiosInstance.get("/admin/dashboard/stats")
    return res.data.data
}