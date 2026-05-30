import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true
});

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
