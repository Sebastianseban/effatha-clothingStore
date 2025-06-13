// src/hooks/useHighlights.js
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

const fetchHighlights = async (type) => {
  const res = await axiosInstance.get(`/product/highlights/${type}`);
  return res.data.data; 
};

export const useHighlights = (type) => {
  return useQuery({
    queryKey: ["highlights", type],
    queryFn: () => fetchHighlights(type),
  });
};
