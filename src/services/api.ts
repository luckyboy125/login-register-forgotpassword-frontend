import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

import { Credentials, AuthResult } from "../store/modules/auth/types";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URL,
  timeout: 2000,
});

axiosInstance.interceptors.request.use(
  async function (config: AxiosRequestConfig) {
    const token = await AsyncLocalStorage.getItem("token");
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  () => {}
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const msg = error.response?.data?.error || "Failed to connect to server";
    toast.error(msg);
  }
);

const api = {
  signin: (credentials: Credentials) =>
    axiosInstance.post<AuthResult>("auth/signin", credentials),
  signup: (credentials: Credentials) =>
    axiosInstance.post<AuthResult>("auth/signup", credentials),
};

export default api;
