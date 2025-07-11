import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import View from "../ui/view";
import { Pressable } from "react-native";
import Modal from "../ui/modal";
import Text from "../ui/text";
import NavbarSearch from "./navbar-search";

const Navbar = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <View className="justify-end px-3 py-2 bg-white">
        <View className="relative">
          <Pressable onPress={() => setIsOpenModal(true)}>
            <View className="flex h-10 flex-row justify-between items-center rounded-md bg-gray-200/70 px-4 text-right">
              <Text style={{ color: "#999" }}>جستجو در بهمان کالا</Text>
              <Feather name="search" size={24} color={"#aaa"} />
            </View>
          </Pressable>
        </View>
      </View>

      {/* SEARCH MODAL */}
      <Modal setOpen={setIsOpenModal} open={isOpenModal} title="جستجوی محصول">
        <NavbarSearch setIsOpenModal={setIsOpenModal} />
      </Modal>
    </>
  );
};

export default Navbar;
