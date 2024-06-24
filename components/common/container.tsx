import { StatusBar, View, ViewProps } from "react-native";
import React, { ReactNode } from "react";
import { BottomNavigationHeight } from "@/utils/constants/styles";
import { screenHeight as screenH, windowHeight as windowH } from "@/utils/dimensions";

interface Props {
  children: ReactNode;
  screenHeight?: boolean;
  windowHeight?: boolean;
  withStatusBarOffset?: boolean;
  withBottomNavigationOffset?: boolean;
}

const Container = ({
  style,
  children,
  screenHeight = false,
  windowHeight = false,
  withStatusBarOffset = false,
  withBottomNavigationOffset = false,
  ...props
}: Props & ViewProps) => {
  return (
    <View
      className="flex-1 px-4"
      style={[
        {
          // marginTop: withStatusBarOffset ? StatusBar.currentHeight : 0,
          paddingBottom: withBottomNavigationOffset ? BottomNavigationHeight : 0,
          maxHeight: screenHeight ? screenH : windowHeight ? windowH : "auto",
          direction: "rtl",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export default Container;
