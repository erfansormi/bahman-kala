import View from "@/components/ui/view";
import { ViewProps } from "react-native";
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
  className,
  ...props
}: Props & ViewProps) => {
  return (
    <View
      className={"flex-1"}
      style={[
        {
          // marginTop: withStatusBarOffset ? StatusBar.currentHeight : 0,
          paddingBottom: withBottomNavigationOffset ? BottomNavigationHeight : 0,
          paddingHorizontal: 16,
          maxHeight: screenHeight ? screenH : windowHeight ? windowH : "auto",
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
