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

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = await SecureStore.getItemAsync("token");

      if (!storedToken) {
        setIsLoading(false);
        setToken(null);
        return;
      }
      setToken(storedToken);

      try {
        const res = await getUserInfo();

        setUser(res.data);
        setError(null);
        cartSetter(res.data.cart as any);
      } catch (err: any) {
        console.log("err: ", err?.response?.data);
        setError(err?.response?.data?.message || err?.message || "خطایی رخ داده است");
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return {
    token,
    user,
    isLoading,
    error,
  };
};
