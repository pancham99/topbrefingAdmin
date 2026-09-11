import axios from "axios";
import { base_url } from "../config/config";

const LIVE_BACKEND_URL = "https://bakendtopbrefing.vercel.app";

const axiosInstance = axios.create({
  baseURL: base_url,
  timeout: 15000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("newstoken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      (!error.response || error.code === "ERR_NETWORK") &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      if (originalRequest.baseURL !== LIVE_BACKEND_URL) {
        console.warn(
          `Local backend unreachable (${originalRequest.baseURL}). Retrying request via live API (${LIVE_BACKEND_URL})...`
        );
        originalRequest.baseURL = LIVE_BACKEND_URL;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
