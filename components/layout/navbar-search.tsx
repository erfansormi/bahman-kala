import React from "react";
import View from "../ui/view";
import { Feather } from "@expo/vector-icons";
import { windowHeight } from "@/utils/dimensions";
import { Toast } from "react-native-toast-notifications";
import { TextInput, TouchableOpacity } from "react-native";

const NavbarSearch = ({
  setIsOpenModal,
}: {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <View className="flex-1" style={{ height: windowHeight - 114 }}>
      <View className="flex-row items-center" style={{ gap: 8 }}>
        <TextInput
          autoFocus
          cursorColor={"#888"}
          placeholderTextColor={"#999"}
          placeholder="جستجو در بهمان کالا"
          className="flex h-10 flex-row justify-center rounded-md bg-gray-200/70 pl-10 pr-3 text-right"
          style={{
            fontFamily: "vazir",
            paddingHorizontal: 0,
            paddingVertical: 0,
            flexGrow: 1,
          }}
        />
        <View className="bg-primary rounded-full p-2">
          <TouchableOpacity
            onPress={() => {
              setIsOpenModal(false);
              Toast.show("به زودی!", { type: "warning" });
            }}
          >
            <Feather name="search" size={24} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NavbarSearch;
