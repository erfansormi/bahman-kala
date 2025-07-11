import { fontSizes } from "@/utils/constants/styles";
import Text from "./text";
import View from "./view";
import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  ViewProps,
  ViewStyle,
} from "react-native";

interface Props {
  loading?: boolean;
  style?: ViewStyle;
  children: ReactNode;
  onPress?: () => void;
  viewProps?: ViewProps;
  fontSizes?: keyof typeof fontSizes | number;
  size?: keyof typeof viewVariants.size;
  variant?: keyof typeof viewVariants.variant;
  touchableProps?: TouchableNativeFeedbackProps;
}

const Button = (props: Props) => {
  const { size = "sm", variant = "primary", fontSizes = "sm" } = props;

  return (
    <TouchableNativeFeedback
      disabled={props.loading}
      onPress={props.onPress}
      {...props.touchableProps}
    >
      <View
        {...props.viewProps}
        className={`rounded-lg items-center justify-center ${viewVariants.variant[variant]} ${viewVariants.size[size]}`}
        style={[{ opacity: props.loading ? 0.8 : 1 }, props.style]}
      >
        <Text
          style={{
            fontSize: typeof fontSizes === "number" ? fontSizes : textVariants.fontSizes[fontSizes],
          }}
          className={`text-center ${textVariants.variant[variant]}`}
        >
          {props.loading ? (
            <ActivityIndicator
              size={30}
              color={variant === "outline" ? "rgb(239, 64, 86)" : "#fff"}
            />
          ) : (
            props.children
          )}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Button;

const viewVariants = {
  variant: {
    primary: "bg-rose-500 text-white",
    outline: "bg-white border border-solid border-rose-500 text-rose-500",
  },
  size: {
    base: "h-12 px-5",
    base2: "h-11 px-[18px]",
    sm: "h-10 px-4",
    xs: "h-9 px-3",
  },
};

const textVariants = {
  variant: {
    primary: "text-white",
    outline: "text-rose-500",
  },
  fontSizes,
};
