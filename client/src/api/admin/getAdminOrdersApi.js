
import axiosInstance from "../axiosInstance";

export const getOrdersAdmin = async ({ status, search, dateFrom, dateTo }) => {
  const params = {};

  if (status && status !== "All") params.status = status;
  if (search) params.search = search;
  if (dateFrom) params.dateFrom = dateFrom;
  if (dateTo) params.dateTo = dateTo;

  const res = await axiosInstance.get("/admin/orders", { params });
  return res.data.data;
};
