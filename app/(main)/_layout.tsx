import LoadingScreen from "@/components/common/loading-screen";
import { useIsAuthenticated } from "@/hooks/auth/useIsAuthenticated";
import { Redirect, Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  const { token, isLoading } = useIsAuthenticated();
  const isGuest = !token;

  if (isGuest) {
    return <Redirect href="/auth/login" />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Slot />
    </SafeAreaView>
  );
}
