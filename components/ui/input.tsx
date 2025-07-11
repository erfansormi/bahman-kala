import Text from "./text";
import View from "./view";
import React, { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";

interface Props {
  label?: string;
  error?: string;
  required?: boolean;
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  fontFamily?: keyof typeof fontFamilies;
}

const Input = forwardRef<TextInput, Props & TextInputProps>(
  (
    {
      style,
      label,
      error,
      required,
      size = "sm",
      variant = "filled",
      fontFamily = "vazir",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <View>
        {label && (
          <View className="flex-row items-center" style={{ gap: 4 }}>
            <Text size="sm" className="mb-1">
              {label}
            </Text>
            {required ? <Text className="text-red-500">*</Text> : null}
          </View>
        )}
        <TextInput
          ref={ref}
          style={[{ fontFamily, paddingVertical: 0, paddingHorizontal: 12 }, style]}
          className={`rounded-lg px-3 ${variants[variant]} ${sizes[size]}`}
          {...props}
        />

        <View className="mt-1 h-5">
          {error && (
            <Text style={{ fontSize: 11 }} className="text-red-500">
              {error}
            </Text>
          )}
        </View>
      </View>
    );
  }
);

Input.displayName = "Input";
export default Input;

const sizes = {
  base: "py-2.5",
  sm: "py-2",
};

const variants = {
  filled: "bg-gray-50 border-gray-300 border",
  white: "bg-white border border-gray-200",
};

const fontFamilies = {
  vazirLight: "vazirLight",
  vazir: "vazir",
  vazirBold: "vazirBold",
  vazirBlack: "vazirBlack",
};
