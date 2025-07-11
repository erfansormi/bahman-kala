import React from "react";
import Text from "../ui/text";
import View from "@/components/ui/view";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  color: string;
  isActive?: boolean;
  isMinimal?: boolean;
  minimalClassName?: string;
}

const ProductColorBadge = ({ color, isActive, isMinimal = false, minimalClassName }: Props) => {
  if (isMinimal) {
    return (
      <View
        className={`w-5 h-5 rounded-full border border-gray-300 ${
          colors[color] ? colors[color] : ""
        } ${minimalClassName}`}
      />
    );
  }

  return (
    <View
      style={{ gap: 4 }}
      className={`rounded-full px-3 py-2 border border-gray-200 flex-row items-center ${
        isActive && "border-cyan-500 border-2"
      } `}
    >
      <View
        className={`w-6 h-6 rounded-full border border-gray-300 ${
          colors[color] ? colors[color] : ""
        }`}
      >
        {isActive ? (
          <View className={`justify-center items-center`}>
            <Ionicons
              size={20}
              name="checkmark-sharp"
              color={blackCheck[color] ? "#000" : "#fff"}
            />
          </View>
        ) : null}
      </View>
      <Text size="sm" className="capitalize">
        {color}
      </Text>
    </View>
  );
};

export default ProductColorBadge;

const colors: any = {
  sky: "bg-sky-500",
  cyan: "bg-cyan-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
  slate: "bg-slate-500",
  gray: "bg-gray-500",
  lime: "bg-lime-500",
  blue: "bg-blue-500",
  rose: "bg-rose-500",
  teal: "bg-teal-500",
  red: "bg-red-500",
  black: "bg-black",
  white: "bg-white",
  "light gray": "bg-gray-300",
};

const blackCheck: any = {
  white: true,
  "light gray": true,
};
