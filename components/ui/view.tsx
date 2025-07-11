import React from "react";
import { View as NativeView, ViewProps } from "react-native";

const View = ({ style, ...props }: ViewProps) => {
  return <NativeView {...props} style={[{ direction: "rtl" }, style]} />;
};

export default View;
