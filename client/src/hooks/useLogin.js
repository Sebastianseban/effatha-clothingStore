import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

const loginUser = async (userData) => {
    const response = await axiosInstance.post("/users/login",userData)
    return response.data;

}

export const useLogin = () => {
    return useMutation({
        mutationFn:loginUser,
    })
}