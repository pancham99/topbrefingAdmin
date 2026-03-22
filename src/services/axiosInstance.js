import axios from "axios";
import { base_url } from "../config/config";

const axiosInstance = axios.create({
  baseURL: base_url,
  timeout: 10000
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

export default axiosInstance;