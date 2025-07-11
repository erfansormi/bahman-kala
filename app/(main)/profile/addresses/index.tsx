import React from "react";
import Card from "@/components/ui/card";
import Text from "@/components/ui/text";
import View from "@/components/ui/view";
import { Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ProfileLayout from "../components/profile-layout";

const Addresses = () => {
  return (
    <ProfileLayout>
      <Card className="bg-yellow-100/80">
        <View className="flex-row" style={{ gap: 8 }}>
          <AntDesign name="warning" size={24} color={"rgb(113 63 18)"} />
          <View className="ml-1" style={{ width: Dimensions.get("window").width - 95 }}>
            <Text className="text-yellow-800 pr-2" style={{ lineHeight: 26 }}>
              متاستفانه، بدلیل تحریم های موجود در استفاده sdk نقشه گوگل برای کشورمون ایران مانند
              نیاز به credit card واقعی یا ناسازگاری با ip ایران و... موفق به استفاده از
              react-native-maps نشدم!
            </Text>
          </View>
        </View>
      </Card>
    </ProfileLayout>
  );
};

export default Addresses;
