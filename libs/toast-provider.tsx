import React, { ReactNode } from "react";
import View from "@/components/ui/view";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import { ToastProvider as ToastP } from "react-native-toast-notifications";

const ToastProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ToastP
      placement="top"
      successColor="#10b981"
      warningColor="#f59e0b"
      dangerColor="#ef4444"
      textStyle={{ fontFamily: "vazir" }}
      offsetTop={StatusBar.currentHeight}
      successIcon={
        <View className="mr-1">
          <Ionicons name="checkmark-circle-outline" size={25} color="white" />
        </View>
      }
      warningIcon={
        <View className="mr-1">
          <Ionicons name="warning-outline" size={25} color="white" />
        </View>
      }
      dangerIcon={
        <View className="mr-1">
          <Ionicons name="close-circle-outline" size={25} color="white" />
        </View>
      }
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row-reverse",
      }}
    >
      {children}
    </ToastP>
  );
};

export default ToastProvider;
