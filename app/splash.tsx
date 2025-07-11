import { useIsAuthenticated } from "@/hooks/auth/useIsAuthenticated";
import { SplashScreen } from "expo-router";

export default function SplashScreenController() {
  const { isLoading } = useIsAuthenticated();

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return null;
}
