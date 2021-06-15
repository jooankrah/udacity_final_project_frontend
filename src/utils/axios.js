const axios = require("axios");

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 100000,
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
