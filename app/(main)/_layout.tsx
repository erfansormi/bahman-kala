import { Redirect, Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsAuthenticated } from "@/hooks/auth/useIsAuthenticated";

export default function Layout() {
  const { token } = useIsAuthenticated();
  const isGuest = !token;

  if (isGuest) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Slot />
    </SafeAreaView>
  );
}
