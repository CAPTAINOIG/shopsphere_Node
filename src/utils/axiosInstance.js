import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://service.swiftsuite.app",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // timeout: 50000,
});

// ✅ Request interceptor to inject token dynamically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
   // ✅ Detect FormData automatically
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default axiosInstance;
