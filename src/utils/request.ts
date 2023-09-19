import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { BASE_URL, TIME_OUT } from "@/consts";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

// TODO: 扩充配置
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
