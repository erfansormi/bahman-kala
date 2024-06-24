import "../global.css";
import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SecureStore from "expo-secure-store";
import ToastProvider from "@/libs/toast-provider";
import { useIsAuthenticated } from "@/hooks/auth/useIsAuthenticated";
import { SWRConfig } from "swr";
import axiosInstance from "@/libs/axios";
import { I18nManager } from "react-native";

const isLoggedIn = SecureStore.getItem("token");
export const unstable_settings = {
  initialRouteName: isLoggedIn ? "(home)/index" : "auth/login/index",
};

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

const Layout = () => {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
  I18nManager.swapLeftAndRightInRTL(false);
  useIsAuthenticated();

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
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#fff" },
            navigationBarColor: "#fff",
            statusBarColor: "#fff",
            statusBarStyle: "dark",
          }}
        />
      </ToastProvider>
    </SWRConfig>
  );
};

export default Layout;
