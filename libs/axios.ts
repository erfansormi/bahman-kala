import { useCartStore } from "@/store/cart-store";
import { useUserStore } from "@/store/user-store";
import { useUserTokenStore } from "@/store/user-token";
import axios, { AxiosError } from "axios";
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

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError<{ message?: string }>) {
    if (error.status === 401 || error.response?.status === 401) {
      SecureStore.setItem("token", "");
      useUserTokenStore.setState({ token: null });
      useUserStore.setState({ user: null });
      useCartStore.setState({
        products: undefined,
        products_counts: undefined,
        products_prices: undefined,
        total_prices_cart: undefined,
        total_profit: undefined,
        total_profit_percentage: undefined,
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
