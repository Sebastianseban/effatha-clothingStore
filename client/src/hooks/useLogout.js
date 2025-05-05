import { useMutation } from '@tanstack/react-query';
import { logoutUser } from '../api/user';
import useUserStore from '../store/userStore';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      clearUser();
      navigate('/login');
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });
};