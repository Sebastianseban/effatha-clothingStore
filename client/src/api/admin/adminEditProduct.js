import axiosInstance from "../axiosInstance";

export const adminEditProduct = async (productId, formData) => {
  const res = await axiosInstance.put(`admin/product/${productId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};
