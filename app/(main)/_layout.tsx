import LoadingScreen from "@/components/common/loading-screen";
import Text from "@/components/ui/text";
import View from "@/components/ui/view";
import { useIsAuthenticated } from "@/hooks/auth/useIsAuthenticated";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Slot } from "expo-router";
import { useEffect } from "react";
import { TouchableNativeFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";

export default function Layout() {
  const { token, isLoading, error, checkAuth } = useIsAuthenticated();
  const isGuest = !token;
  const toast = useToast();

  const showToast = () => {
    if (error === "Network Error" && !isLoading) {
      toast.show("لطفا اتصال خود به اینترنت را بررسی کنید", {
        type: "danger",
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    showToast();
  }, [error, isLoading]);

  if (isGuest) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {isLoading ? (
        <LoadingScreen />
      ) : error ? (
        <View className="flex-1 justify-center items-center" style={{ gap: 8 }}>
          <Text className="text-red-500" size="xl">
            خطا در دریافت دیتا
          </Text>
          <TouchableNativeFeedback
            onPress={() => {
              checkAuth();
              showToast();
            }}
          >
            <View className="flex-row" style={{ gap: 6 }}>
              <Text className="text-red-500" size="xl">
                تلاش دوباره
              </Text>
              <Ionicons name="refresh-outline" size={30} color="rgb(239 68 68)" />
            </View>
          </TouchableNativeFeedback>
        </View>
      ) : (
        <Slot />
      )}
    </SafeAreaView>
  );
}
