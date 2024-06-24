import React from "react";
import { ActivityIndicator, View } from "react-native";
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
