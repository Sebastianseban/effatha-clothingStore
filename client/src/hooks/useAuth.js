import { useQuery } from "@tanstack/react-query";
import useUserStore from "../store/userStore";
import api from "../api/axiosInstance";

export const useAuth = () => {
  const setUser = useUserStore((state) => state.setUser);

  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/users/me");
      return res.data.user;
    },
    onSuccess: (data) => {
      setUser(data);
    },
    retry: false,
  });
};
