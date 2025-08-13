export const getLowStockProducts = async () => {
  const res = await axiosInstance.get("/admin/dashboard/low-stock");
  return res.data.data;
};