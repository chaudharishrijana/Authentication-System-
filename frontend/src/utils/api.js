import axios from "axios";
import { getAccessToken, saveToken, removeToken } from "./auth";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: { "Content-Type": "application/json" },
});


api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && token !== "null") config.headers.Authorization = `Bearer ${token}`;
  return config;
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

 
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
            refresh: refreshToken,
          });
          saveToken(res.data.access, refreshToken);
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          return api(originalRequest); 
        } catch (err) {
          removeToken();
          window.location.href = "/login"; 
          console.error(err);
        }
      } else {
        removeToken();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
