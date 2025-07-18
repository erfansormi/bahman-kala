import { getUserInfo } from "@/services/auth";
import { useCartStore } from "@/store/cart-store";
import { useUserStore } from "@/store/user-store";
import { useUserTokenStore } from "@/store/user-token";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export const useIsAuthenticated = () => {
  const cartSetter = useCartStore.setState;
  const { user, setUser } = useUserStore((state) => state);
  const { token, setToken } = useUserTokenStore((state) => state);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>();

  const checkAuth = async () => {
    setIsLoading(true);
    const storedToken = await SecureStore.getItemAsync("token");

    if (!storedToken) {
      setIsLoading(false);
      setToken(null);
      return;
    }
    setToken(storedToken);

    try {
      const res = await getUserInfo();
      console.log("hiiii");

      setUser(res.data);
      setError(null);
      cartSetter(res.data.cart as any);
    } catch (err: any) {
      console.log("err: ", err?.response?.data || err?.message);
      setError(err?.response?.data?.message || err?.message || "خطایی رخ داده است");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    token,
    user,
    isLoading,
    error,
    checkAuth,
  };
};
