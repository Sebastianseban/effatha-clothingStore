import { useMutation } from '@tanstack/react-query';
import { logoutUser } from '../../api/user/logoutApi';
import useUserStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const useLogout = () => {
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      clearUser();
      localStorage.removeItem('accessToken');
      Cookies.remove('refreshToken');
      navigate('/login');
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });
};