import View from "@/components/ui/view";
import React from "react";

interface Props {
  isActive?: boolean;
}

const RadioButton = ({ isActive = false }: Props) => {
  return (
    <>
      <View
        className={`w-5 h-5 rounded-full border-gray-700 border-2 ${
          isActive && "!border-cyan-500 border-4"
        }`}
      />
    </>
  );
};

export default RadioButton;
