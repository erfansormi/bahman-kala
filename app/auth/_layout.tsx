import { Redirect, Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsAuthenticated } from "@/hooks/auth/useIsAuthenticated";
import { useEffect } from "react";
import { useUserTokenStore } from "@/store/user-token";
import { useUserStore } from "@/store/user-store";
import { useCartStore } from "@/store/cart-store";

export default function Layout() {
  const { token } = useIsAuthenticated();
  const isLoggedIn = !!token;
  const setCart = useCartStore.setState;
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserTokenStore((state) => state.setToken);

  useEffect(() => {
    if (!isLoggedIn) {
      setUser(null);
      setToken(null);
      setCart({
        products: undefined,
        products_counts: undefined,
        products_prices: undefined,
        total_prices_cart: undefined,
        total_profit: undefined,
        total_profit_percentage: undefined,
      });
    }
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return <Redirect href="/(main)/(home)" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Slot />
    </SafeAreaView>
  );
}
