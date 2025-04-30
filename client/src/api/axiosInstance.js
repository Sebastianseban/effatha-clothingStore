import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
        error.response?.status === 401 &&
        !originalRequest.__isRetryRequest
    ) {
        originalRequest.__isRetryRequest = true;
        try {
            await api.get("/users/refresh-token")
            return api(originalRequest);
            
        } catch (refreshError) {
            console.error("Refresh token failed");

            window.location.href = "/login";
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
  }
);

export default api;
