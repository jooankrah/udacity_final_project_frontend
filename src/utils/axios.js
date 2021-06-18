import axios from "axios";
import { SERVER_URL } from "../config";

export const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: 100000,
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
