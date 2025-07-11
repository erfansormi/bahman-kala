import { router } from "expo-router";
import React, { useState } from "react";
import Text from "@/components/ui/text";
import View from "@/components/ui/view";
import LogoutModal from "./logout-modal";
import { useUserStore } from "@/store/user-store";
import { useRoute } from "@react-navigation/native";
import { TouchableNativeFeedback } from "react-native";
import LoadingScreen from "@/components/common/loading-screen";
import { FontAwesome5, FontAwesome6, FontAwesome, Ionicons, AntDesign } from "@expo/vector-icons";

const ProfilePanel = () => {
  const { user } = useUserStore();
  const route = useRoute();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  if (!user) return <LoadingScreen />;
  return (
    <View className="mb-5 rounded-lg border bg-white border-gray-200 pt-3">
      {/* USER DETAILS */}
      <View className="px-3" style={{ gap: 8 }}>
        <View className="flex-row">
          <View className="h-14 w-14 items-center justify-center rounded-full bg-gray-300 p-2">
            <FontAwesome5 name="user-alt" size={30} color="#fff" />
          </View>
        </View>

        {/* FULL NAME */}
        <View className="mt-1 flex-row" style={{ gap: 8 }}>
          <Text fontFamily="vazirBold" className="capitalize">
            {user.first_name}
          </Text>
          <Text fontFamily="vazirBold" className="capitalize">
            {user.last_name}
          </Text>
        </View>

        {/* EMAIL */}
        <View className="flex-row">
          <Text size="sm" className="text-gray-500">
            {user.email}
          </Text>
        </View>
      </View>

      {/* LINKS */}
      <View className="pt-4">
        {profileLinks.map((item) => (
          <TouchableNativeFeedback
            key={item.link}
            background={TouchableNativeFeedback.Ripple("#e0e0e0", false)}
            onPress={() => router.navigate(`/profile/${item.link}`)}
          >
            <View
              style={{ gap: 6 }}
              className={`flex-row items-center border-t border-t-gray-200 py-4 pl-2 pr-5 ${
                route.name.match(item.link) && "rounded-r-md border-r-4 border-r-rose-500"
              }`}
            >
              <View className="w-7 items-center">{item.icon}</View>
              <Text size="sm">{item.text}</Text>
            </View>
          </TouchableNativeFeedback>
        ))}

        {/* LOGOUT */}
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#e0e0e0", false)}
          onPress={() => setOpenLogoutModal(true)}
        >
          <View
            style={{ gap: 6 }}
            className="flex-row items-center border-t border-t-gray-200 py-4 pl-2 pr-5"
          >
            <View className="w-7 items-center">
              <Ionicons name="exit-outline" size={24} color="#222" />
            </View>

            <Text>خروج</Text>
          </View>
        </TouchableNativeFeedback>
      </View>

      {/* LOGOUT MODAL */}
      <LogoutModal open={openLogoutModal} setOpen={setOpenLogoutModal} />
    </View>
  );
};

export default ProfilePanel;

const profileLinks = [
  {
    text: "فعالیت ها",
    link: "activities",
    icon: <AntDesign style={{ marginTop: -4 }} name="home" size={22} color="#222" />,
  },
  {
    text: "سفارش ها",
    link: "orders",
    icon: <Ionicons style={{ marginTop: -4 }} name="bag-handle-outline" size={22} color="#222" />,
  },
  {
    text: "لیست های من",
    link: "my-lists",
    icon: <AntDesign name="hearto" size={22} color="#222" />,
  },
  {
    text: "آدرس ها",
    link: "addresses",
    icon: <FontAwesome name="address-card-o" size={20} color="#222" />,
  },
  {
    text: "اطلاعات شخصی",
    link: "personal-info",
    icon: <FontAwesome6 name="user" size={19} color="#222" />,
  },
] as const;
