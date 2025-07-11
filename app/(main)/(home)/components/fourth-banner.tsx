import React from "react";
import View from "@/components/ui/view";
import { Dimensions, Image } from "react-native";

const FourthBanner = () => {
  return (
    <View className="flex-row flex-wrap px-3" style={{ gap: 12 }}>
      <Image
        className="h-44"
        style={{
          height: 130,
          flexBasis: Dimensions.get("window").width / 2 - 18,
          borderRadius: 8,
        }}
        source={{
          uri: "https://dkstatics-public.digikala.com/digikala-adservice-banners/09d1d22d40cd3a2ef6107c44a49fbe0cdc205c97_1710584636.jpg?x-oss-process=image/quality,q_95/format,webp",
        }}
      />
      <Image
        className="h-44"
        style={{
          height: 130,
          flexBasis: Dimensions.get("window").width / 2 - 18,
          borderRadius: 8,
        }}
        source={{
          uri: "https://dkstatics-public.digikala.com/digikala-adservice-banners/38e80f45bf3df522cf2c6a0dd69cebafd6ca7d83_1711435981.jpg?x-oss-process=image/quality,q_95/format,webp",
        }}
      />
      <Image
        className="h-44"
        style={{
          height: 130,
          flexBasis: Dimensions.get("window").width / 2 - 18,
          borderRadius: 8,
        }}
        source={{
          uri: "https://dkstatics-public.digikala.com/digikala-adservice-banners/8ecee55902a588dbd3b84564990410284ef20e00_1711117697.jpg?x-oss-process=image/quality,q_95/format,webp",
        }}
      />
      <Image
        className="h-44"
        style={{
          height: 130,
          flexBasis: Dimensions.get("window").width / 2 - 18,
          borderRadius: 8,
        }}
        source={{
          uri: "https://dkstatics-public.digikala.com/digikala-adservice-banners/88d33c1b7e894e9fc24d20fe81998f34342967f5_1710593556.jpg?x-oss-process=image/quality,q_95/format,webp",
        }}
      />
    </View>
  );
};

export default FourthBanner;
