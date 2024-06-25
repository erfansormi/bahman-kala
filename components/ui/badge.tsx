import { fontSizes } from "@/utils/constants/styles";
import Text from "./text";
import React from "react";
import { View, ViewProps } from "react-native";
import { cn } from "@/libs/utils";

interface Props {
  fontSize?: keyof typeof fontSizes;
}
const Badge = ({ children, fontSize = "sm", className, ...props }: ViewProps & Props) => {
  return (
    <View className={cn("px-2.5 py-1 rounded-full bg-gray-200", className)} {...props}>
      <Text size={fontSize} className="text-gray-500">
        {children}
      </Text>
    </View>
  );
};

export default Badge;
