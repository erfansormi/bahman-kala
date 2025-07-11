import React from "react";
import Text from "../ui/text";
import View from "@/components/ui/view";

const DiscountPercentage = ({ discountPercentage }: { discountPercentage: number }) => {
  return (
    <View className="rounded-full bg-primary px-2.5 py-0.5 flex justify-center items-center">
      <Text className="text-white" size="2xs" fontFamily="vazirBlack">
        {discountPercentage.toLocaleString("fa")}%
      </Text>
    </View>
  );
};

export default DiscountPercentage;
