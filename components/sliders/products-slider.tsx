import React from "react";
import Text from "../ui/text";
import View from "../ui/view";
import { Product } from "../../types/main-page";
import ProductCard from "../common/product-card";
import { FlatList, I18nManager, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  products: Product[];
  hasFirstBrandSlide?: boolean;
}

const ProductsSlider = ({ products, hasFirstBrandSlide = true }: Props) => {
  return (
    <View className="bg-primary pr-2 py-2" style={{ direction: I18nManager.isRTL ? "rtl" : "ltr" }}>
      <FlatList
        horizontal
        data={products.map((item, index) => ({ ...item, index }))}
        decelerationRate={0.8}
        keyExtractor={(item, index) => item._id + index}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <View className="w-screen flex-1 items-center justify-center">
            <Text className="text-xl text-white">موردی برای نمایش وجود ندارد!</Text>
          </View>
        }
        renderItem={({ item, index }) => {
          return (
            <>
              {index === 0 && hasFirstBrandSlide ? (
                <View style={{ width: 170 }} className="flex-col items-center justify-around">
                  <View className="flex-col items-center">
                    <Text size="xl" className="text-white" fontFamily="vazirBlack">
                      پیشنهاد
                    </Text>
                    <Text size="xl" className="text-white" fontFamily="vazirBlack">
                      شگـفـت
                    </Text>
                    <Text size="xl" className="text-white" fontFamily="vazirBlack">
                      انــگـیــز
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={{
                        uri: "https://www.digikala.com/statics/img/png/specialCarousel/box.webp",
                      }}
                      className="h-32 w-32"
                    />
                  </View>
                  <View style={{ marginRight: 12 }} className="flex-row items-center gap-x-1">
                    <Text size="xs" className="text-white" fontFamily="vazirBold">
                      مشاهده همه
                    </Text>
                    <MaterialCommunityIcons size={20} color="#fff" name="chevron-left" />
                  </View>
                </View>
              ) : null}

              <ProductCard
                key={item._id}
                index={index}
                product={item}
                productsLength={products.length}
              />
            </>
          );
        }}
      />
    </View>
  );
};

export default ProductsSlider;
