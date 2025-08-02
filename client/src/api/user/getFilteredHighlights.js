import axiosInstance from "../axiosInstance";

export const getFilteredHighlights = async (filters) => {
  const res = await axiosInstance.get("/product/highlights", {
    params: filters,
  });
  return res.data.data;
};
