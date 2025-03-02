// axiosInstance.ts
import axios, { AxiosInstance } from "axios";

// Create an Axios instance with the base URL and headers
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://gym-application-run4team5-sb-dev.shared.edp-dev.cloudmentor.academy",
  // baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
