import axios from "axios";
import * as SecureStore from "expo-secure-store";
const token = SecureStore.getItem("token");

const axiosInstance = axios.create({ baseURL: process.env.EXPO_PUBLIC_BASE_URL });
axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log("axios error: ", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
