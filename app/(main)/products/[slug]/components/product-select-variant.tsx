import ProductColorBadge from "@/components/common/product-color-badge";
import Text from "@/components/ui/text";
import View from "@/components/ui/view";
import { useProductDetails } from "@/hooks/fetching/products";
import { useProductStore } from "@/store/product-store";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, ScrollView } from "react-native";

const ProductSelectVariant = () => {
  const { slug } = useLocalSearchParams();
  const { data } = useProductDetails(slug as string);
  const product = data?.product;
  const productStore = useProductStore();
  const setter = useProductStore.setState;

  return (
    <>
      {/* SIZES */}
      {product?.sellers[0].variants.find((item) => item.size) ? (
        <View>
          <View className="mb-1">
            <Text>سایز</Text>
          </View>
          <View className="flex-row" style={{ gap: 10 }}>
            {product.sellers[0].variants.map((item) =>
              item.size ? (
                <Pressable
                  key={item._id}
                  onPress={() => {
                    setter({
                      selectedVariant: {
                        _id: item._id,
                        selectedColor: item.colors[0],
                      },
                    });
                  }}
                  className={`rounded-full border border-gray-200 px-3 py-2 ${
                    item._id === productStore.selectedVariant?._id && "border-2 !border-cyan-500"
                  }`}
                >
                  <Text size="sm" className="uppercase">
                    {item.size}
                  </Text>
                </Pressable>
              ) : null
            )}
          </View>
        </View>
      ) : null}

      {/* COLORS */}
      <View>
        <View className="mb-1">
          <Text>رنگ</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 6 }}
        >
          {product?.sellers[0].variants[0].colors.map((item) => (
            <Pressable
              key={item}
              onPress={() => {
                setter({
                  selectedVariant: {
                    ...productStore.selectedVariant,
                    selectedColor: item,
                  },
                });
              }}
            >
              <ProductColorBadge
                color={item}
                isActive={item === productStore.selectedVariant?.selectedColor}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default ProductSelectVariant;
