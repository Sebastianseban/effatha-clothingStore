

import axios from "axios";
import useUserStore from "../store/userStore";

const axiosInstance = axios.create({
 baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Needed for refresh-token cookie
});
// "http://localhost:3000/api/v1"
//  import.meta.env.VITE_API_URL || 
// Request Interceptor: Attach accessToken from localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle token expiry
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isRefreshRequest = originalRequest.url.includes("/users/refresh-token");

    // Prevent infinite loop
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry && 
      !isRefreshRequest 

    ) {
      originalRequest._retry = true;

      try {
        const res = await axiosInstance.get("/users/refresh-token");
        const newAccessToken = res.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        // Update the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest); // retry original request
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);

        // Optionally: Clear user and token
        useUserStore.getState().clearUser();
        localStorage.removeItem("accessToken");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

