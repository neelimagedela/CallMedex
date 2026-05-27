import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true
});

// Interceptor to attach access token if stored in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
