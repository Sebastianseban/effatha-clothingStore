import axiosInstance from "../axiosInstance";


export const addProduct = async (formData) => {
  const response = await axiosInstance.post("/admin/add-product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
