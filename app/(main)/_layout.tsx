import LoadingScreen from "@/components/common/loading-screen";
import Text from "@/components/ui/text";
import View from "@/components/ui/view";
import { useIsAuthenticated } from "@/hooks/auth/useIsAuthenticated";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Slot } from "expo-router";
import { TouchableNativeFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mutate } from "swr";

export default function Layout() {
  const { token, isLoading, error } = useIsAuthenticated();
  const isGuest = !token;

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
          <TouchableNativeFeedback onPress={() => mutate("/api/v1/users/me")}>
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
