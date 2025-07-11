import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/services/auth";
import * as SecureStore from "expo-secure-store";
import { useUserStore } from "@/store/user-store";
import { useCartStore } from "@/store/cart-store";
import { useUserTokenStore } from "@/store/user-token";

export const useIsAuthenticated = () => {
  const cartSetter = useCartStore.setState;
  const { user, setUser } = useUserStore((state) => state);
  const { token, setToken } = useUserTokenStore((state) => state);
  const [isLoading, setIsLoading] = useState(true);

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
        cartSetter(res.data.cart as any);
      } catch (err: any) {
        console.log("err: ", (err as AxiosError)?.response?.data);
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
  };
};
