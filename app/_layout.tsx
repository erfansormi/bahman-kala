import React from "react";
import { Stack, useNavigationContainerRef } from "expo-router";
import { useFonts } from "expo-font";
import * as SecureStore from "expo-secure-store";
import ToastProvider from "@/libs/toast-provider";
import { useIsAuthenticated } from "@/hooks/auth/useIsAuthenticated";
import { SWRConfig } from "swr";
import axiosInstance from "@/libs/axios";
import * as Updates from "expo-updates";
import { I18nManager } from "react-native";
import * as Sentry from "@sentry/react-native";
import { isRunningInExpoGo } from "expo";

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

Sentry.init({
  dsn: "https://622593318fe2f9a658db617beb7e2ebf@o4507510339731456.ingest.de.sentry.io/4507513919832144",
  debug: true,
  enableNative: true,
  enableNativeCrashHandling: true,
  tracesSampleRate: 1.0,
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
      enableNativeFramesTracking: !isRunningInExpoGo(),
      enableUserInteractionTracing: true,
    }),
  ],
});

const isLoggedIn = SecureStore.getItem("token");
export const unstable_settings = {
  initialRouteName: isLoggedIn ? "(home)/index" : "auth/login/index",
};

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

const Layout = () => {
  const ref = useNavigationContainerRef();
  I18nManager.allowRTL(true);
  I18nManager.swapLeftAndRightInRTL(false);

  React.useEffect(() => {
    const setRTL = async () => {
      if (!I18nManager.isRTL) {
        await I18nManager.forceRTL(true);
        await I18nManager.swapLeftAndRightInRTL(false);
        await Updates.reloadAsync();
      }
    };
    setRTL();
  }, []);

  useIsAuthenticated();

  React.useEffect(() => {
    if (ref) {
      routingInstrumentation.registerNavigationContainer(ref);
    }
  }, [ref]);

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

export default Sentry.wrap(Layout);
