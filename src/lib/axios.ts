import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  withCredentials: true,
});

// Request interceptor (misal tambah token)
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("bt:token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.message ||
      error.message ||
      "Terjadi kesalahan.";

    if (error.response?.status === 401) {
      console.warn("Unauthorized, handle logout");
    }

    toast.error(message);
    return Promise.reject(error)
  }
);

// Response interceptor (global error handler)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.message ||
      error.message ||
      "Terjadi kesalahan.";

    if (error.response?.status === 401) {
      console.warn("Unauthorized, handle logout");
    }

    toast.error(message);
    return Promise.reject(error);
  }
);

export default api;
