// src/hooks/useAddProduct.js
import { useMutation } from '@tanstack/react-query';
import { addProduct } from '../../api/admin/addProductApi'

export const useAddProduct = () => {
  return useMutation({
    mutationFn: addProduct,
  });
};