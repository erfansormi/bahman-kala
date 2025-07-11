import React from "react";
import Swiper from "react-native-swiper";
import View from "../ui/view";
import { Image } from "react-native";
import { Entypo } from "@expo/vector-icons";

interface Props {
  images: { src: string; id: string }[];
}

const BannersSlider = ({ images }: Props) => {
  return (
    <View>
      <Swiper
        loop
        autoplay
        autoplayTimeout={3}
        nextButton={
          <View className="h-7 w-7 items-center justify-center rounded-full bg-white">
            <Entypo
              style={{
                width: 30,
                height: 30,
              }}
              name="chevron-small-right"
              size={30}
              color="black"
            />
          </View>
        }
        prevButton={
          <View className="h-7 w-7 items-center justify-center rounded-full bg-white">
            <Entypo
              style={{
                width: 30,
                height: 30,
              }}
              name="chevron-small-left"
              size={30}
              color="black"
            />
          </View>
        }
        showsPagination={false}
        className="h-[268px]"
      >
        {images.map((item) => (
          <View key={item.id} testID={item.id} className="h-full bg-white">
            <Image alt="تصویر بنر" source={{ uri: item.src }} className="h-full w-screen" />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default BannersSlider;
