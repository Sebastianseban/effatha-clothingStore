// src/hooks/useAddProduct.js
import { useMutation } from '@tanstack/react-query';
import { addProduct } from '../api/productApi';

export const useAddProduct = () => {
  return useMutation({
    mutationFn: addProduct,
  });
};