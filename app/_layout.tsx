import { useIsAuthenticated } from "@/hooks/auth/useIsAuthenticated";
import axiosInstance from "@/libs/axios";
import ToastProvider from "@/libs/toast-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React from "react";
import { I18nManager, Platform } from "react-native";
import { SWRConfig } from "swr";
import "../global.css";
import SplashScreenController from "./splash";

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

const Layout = () => {
  if (Platform.OS !== "web" && !I18nManager.isRTL) {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
    I18nManager.swapLeftAndRightInRTL(false);
    // Updates.reloadAsync();
  }

  const [fontsLoaded] = useFonts({
    vazirLight: require("../assets/fonts/Vazirmatn-Light.ttf"),
    vazir: require("../assets/fonts/Vazirmatn-Medium.ttf"),
    vazirBold: require("../assets/fonts/Vazirmatn-Bold.ttf"),
    vazirBlack: require("../assets/fonts/Vazirmatn-Black.ttf"),
  });

  if (!fontsLoaded) return null;
  return (
    <SWRConfig value={{ errorRetryCount: 10, fetcher }}>
      <ToastProvider>
        <SplashScreenController />
        <RootNavigator />
      </ToastProvider>
    </SWRConfig>
  );
};

export default Layout;

function RootNavigator() {
  const { token } = useIsAuthenticated();
  const isGuest = !token;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#fff" },
        // navigationBarColor: "#fff",
        // statusBarColor: "#fff",
        statusBarStyle: "dark",
      }}
    >
      <Stack.Protected guard={isGuest}>
        <Stack.Screen name="auth" />
      </Stack.Protected>
      <Stack.Protected guard={!isGuest}>
        <Stack.Screen name="(main)" />
      </Stack.Protected>
    </Stack>
  );
}
