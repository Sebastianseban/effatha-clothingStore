import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  isAuth: false,

  setUser: (userData) =>
    set({
      user: userData,
      isAuth: true,
    }),
  clearUser: () =>
    set({
      user: null,
      isAuth: false,
    }),
}));

export default useUserStore;
