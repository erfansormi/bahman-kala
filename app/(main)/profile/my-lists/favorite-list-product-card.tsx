import React, { useState } from "react";
import { router } from "expo-router";
import Text from "@/components/ui/text";
import View from "@/components/ui/view";
import Button from "@/components/ui/button";
import { useUserStore } from "@/store/user-store";
import Octicons from "@expo/vector-icons/Octicons";
import ProductPrice from "@/components/common/product-price";
import { Dimensions, Image, Pressable } from "react-native";
import DiscountPercentage from "@/components/common/discount-percentage";
import { colors } from "@/utils/constants/styles";
import { Toast } from "react-native-toast-notifications";
import { FavoritesList } from "@/types/user";
import { likeProductApi } from "@/services/profile";

const FavoriteListProductCard = ({
  product: item,
  index,
}: {
  product: FavoritesList;
  index: number;
}) => {
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(false);

  return (
    <View
      className={`border-b border-b-gray-300 py-5 ${
        user?.favorites_list.length === index + 1 && "border-b-0"
      }`}
    >
      <Pressable
        style={{ gap: 12 }}
        onPress={() => {
          router.navigate(`/products/${item.slug}`);
        }}
      >
        <View className="flex-row items-center" style={{ gap: 8 }}>
          <View style={{ flexBasis: 120 }}>
            <Image
              width={120}
              height={120}
              source={{ uri: item.image }}
              style={{ objectFit: "contain" }}
            />
          </View>

          <View style={{ flexBasis: Dimensions.get("window").width - 120 - 70 }}>
            <Text size={"sm"} numberOfLines={3}>
              {item.title}
            </Text>
          </View>
        </View>

        <View className="w-full justify-end">
          <View
            className={`flex-row w-full justify-between ${
              !item.sellers[0].variants[0]?.discount_percentage && "justify-end"
            }`}
          >
            {item.sellers[0].variants[0].discount_percentage && (
              <DiscountPercentage
                discountPercentage={item.sellers[0].variants[0].discount_percentage}
              />
            )}

            <View>
              <ProductPrice price={item.sellers[0].variants[0].price} />
            </View>
          </View>
          <ProductPrice oldPrice={item.sellers[0].variants[0].old_price} />
        </View>
      </Pressable>

      <View className="pt-3">
        <View className="py-1">
          <Button
            size="base2"
            variant="outline"
            loading={loading}
            onPress={() => {
              setLoading(true);
              likeProductApi(item._id)
                .then((res) => {
                  if (user) {
                    setUser({ ...user, favorites_list: res.data.favorites_list });
                  }
                })
                .catch(() => {
                  Toast.show("خطایی رخ داده است!", { type: "error" });
                })
                .finally(() => setLoading(false));
            }}
          >
            حذف از علاقه مندی ها
          </Button>
          <Octicons
            name="trash"
            size={22}
            color={colors.primary}
            style={{ position: "absolute", left: 20, top: 12 }}
          />
        </View>
      </View>
    </View>
  );
};

export default FavoriteListProductCard;
