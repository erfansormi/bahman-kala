import React from "react";
import { View as NativeView, ViewProps } from "react-native";

const View = ({ style, ...props }: ViewProps) => {
  return <NativeView style={[{ direction: "rtl" }, style]} {...props} />;
};

export default View;
