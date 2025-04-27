import {create} from "zustand";

const useUserStore = create((set) =>({
    user:null,
    setUser:(userData) => set({ user:userData}),

}))
export default useUserStore;