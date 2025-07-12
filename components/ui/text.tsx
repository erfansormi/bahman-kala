import { fontFamilies, fontSizes } from "@/utils/constants/styles";
import React from "react";
import { Text as NativeText, TextProps } from "react-native";

interface Props {
  size?: keyof typeof fontSizes | number;
  fontFamily?: keyof typeof fontFamilies;
}

const Text = ({
  size = "base",
  fontFamily = "vazir",
  className,
  style,
  ...props
}: TextProps & Props) => {
  return (
    <NativeText
      style={[
        {
          fontFamily,
          fontSize: typeof size === "number" ? size : fontSizes[size],
        },
        style,
      ]}
      className={`text-gray-800 ${className}`}
      {...props}
    >
      {props.children}
    </NativeText>
  );
};

export default Text;
