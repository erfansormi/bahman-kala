import React from "react";
import View from "@/components/ui/view";
import DropDownPicker, { DropDownPickerProps } from "react-native-dropdown-picker";
import Text from "./text";

const DropdownPicker = ({ label, ...props }: DropDownPickerProps<any> & { label?: string }) => {
  return (
    <View style={{ flexDirection: "column", gap: 6 }}>
      {label && (
        <View>
          <Text>{label}</Text>
        </View>
      )}
      <DropDownPicker
        rtl
        style={{
          zIndex: 1,
          borderColor: "#ccc",
          backgroundColor: "#fafafa",
        }}
        autoScroll
        labelStyle={{ fontFamily: "vazir" }}
        textStyle={{ fontFamily: "vazirLight", textAlign: "left" }}
        disabledStyle={{ backgroundColor: "#ddd" }}
        arrowIconContainerStyle={{ display: props.disabled ? "none" : "flex" }}
        listItemContainerStyle={{ borderBottomWidth: 1, borderBottomColor: "#eee" }}
        dropDownContainerStyle={{ borderColor: "#ccc" }}
        {...props}
      />
    </View>
  );
};

export default DropdownPicker;
