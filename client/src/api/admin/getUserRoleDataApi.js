import axiosInstance from "../axiosInstance";

export const getUserRoleData = async () => {
  const res = await axiosInstance.get("/admin/dashboard/user-roles");
  return res.data.data;
};