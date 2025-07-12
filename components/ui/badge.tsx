import { fontSizes } from "@/utils/constants/styles";
import React from "react";
import { ViewProps } from "react-native";
import Text from "./text";
import View from "./view";

interface Props {
  fontSize?: keyof typeof fontSizes;
}
const Badge = ({ children, fontSize = "sm", style, className, ...props }: ViewProps & Props) => {
  return (
    <View
      className={`px-2.5 py-1 rounded-full bg-gray-200 ${className}`}
      style={[{}, style]}
      {...props}
    >
      <Text size={fontSize} className="text-gray-500">
        {children}
      </Text>
    </View>
  );
};

export default Badge;
