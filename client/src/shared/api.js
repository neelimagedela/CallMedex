import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);
// Interceptor to attach access token if stored in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  const publicRoutes = [
    "/auth/register",
    "/auth/login",
    "/auth/verify-otp",
    "/auth/resend-otp",
    "/profile/onboard",
  ];

  const isPublicRoute = publicRoutes.some((route) =>
    config.url?.includes(route)
  );

  if (token && !isPublicRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});