import React from "react";
import { Image } from "react-native";
import View from "@/components/ui/view";
import { SvgUri } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import DiscountPercentage from "@/components/common/discount-percentage";

const SupermarketAmazing = () => {
  return (
    <View className="mx-3 rounded-lg bg-slate-100 p-5">
      <View className="flex-row items-center">
        <Image
          width={50}
          height={50}
          className="ml-3"
          source={{
            uri: "https://www.digikala.com/statics/img/png/amazing/fresh.webp",
          }}
        />
        <SvgUri uri={"https://www.digikala.com/statics/img/svg/typography/fresh.svg"} />
      </View>

      <View className="mt-3 flex-row items-center justify-between">
        {/* PRODUCTS */}
        <View className="flex-row">
          {products.map((item) => (
            <View
              key={item.image}
              className="ml-3 h-[75px] w-[75px] items-center justify-center rounded-full bg-white"
            >
              <Image className="rounded-full" source={{ uri: item.image, width: 55, height: 55 }} />

              <View className="absolute bottom-0 right-0">
                <DiscountPercentage discountPercentage={item.percentage} />
              </View>
            </View>
          ))}
        </View>

        <View className="h-11 w-11 items-center justify-center rounded-full bg-white">
          <Ionicons name="arrow-back" size={24} color={"rgb(90, 200, 22)"} />
        </View>
      </View>
    </View>
  );
};

export default SupermarketAmazing;

const products = [
  {
    image:
      "https://dkstatics-public.digikala.com/digikala-products/91307c19429c7b5bbec2249d1353af2c018a7427_1702724910.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
    percentage: 14,
  },
  {
    image:
      "https://dkstatics-public.digikala.com/digikala-products/111470538.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
    percentage: 21,
  },
  {
    image:
      "https://dkstatics-public.digikala.com/digikala-products/6fb85243834de4d7971256ff2560ce178e89cdf6_1643198371.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80",
    percentage: 15,
  },
];
