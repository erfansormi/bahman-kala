import { fontSizes } from "@/utils/constants/styles";
import Text from "./text";
import React from "react";
import { View, ViewProps } from "react-native";

interface Props {
  fontSize?: keyof typeof fontSizes;
}
const Badge = ({ children, fontSize = "sm", style, className, ...props }: ViewProps & Props) => {
  return (
    <View className={"px-2.5 py-1 rounded-full bg-gray-200"} style={[{}, style]} {...props}>
      <Text size={fontSize} className="text-gray-500">
        {children}
      </Text>
    </View>
  );
};

export default Badge;
