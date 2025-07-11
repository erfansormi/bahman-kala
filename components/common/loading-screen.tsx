import React from "react";
import View from "@/components/ui/view";
import { ActivityIndicator } from "react-native";
import BottomNavigation from "../layout/bottom-navigation";

const LoadingScreen = () => {
  return (
    <View className="flex-1">
      <View className="grow items-center justify-center">
        <ActivityIndicator size={60} color="#777" />
      </View>
      <BottomNavigation />
    </View>
  );
};

export default LoadingScreen;
