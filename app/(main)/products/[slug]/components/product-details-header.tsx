import { router } from "expo-router";
import React, { useState } from "react";
import View from "@/components/ui/view";
import Text from "@/components/ui/text";
import { TouchableOpacity } from "react-native";
import { useCartStore } from "@/store/cart-store";
import { colors } from "@/utils/constants/styles";
import { useUserStore } from "@/store/user-store";
import { likeProductApi } from "@/services/profile";
import { useProductStore } from "@/store/product-store";
import { Toast } from "react-native-toast-notifications";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProductDetailsHeader = () => {
  const cart = useCartStore();
  const { setUser, user } = useUserStore();
  const { productId } = useProductStore();
  const [isLiked, setIsLiked] = useState(!!cart.products?.find((item) => item._id === productId));

  return (
    <View
      style={{ gap: 10 }}
      className="w-full pt-1 pb-4 border-b border-b-gray-200 items-center mt-1 flex-row justify-between"
    >
      <View className="flex-row items-center" style={{ gap: 10 }}>
        {/* Back Icon */}
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-right" size={26} color={colors.icon} />
        </TouchableOpacity>

        {/* Home Icon */}
        <TouchableOpacity onPress={() => router.navigate("/")}>
          <MaterialCommunityIcons name="home-outline" size={26} color={colors.icon} />
        </TouchableOpacity>
      </View>

      <View className="flex-row" style={{ gap: 20 }}>
        {/* CART ICON */}
        <TouchableOpacity onPress={() => router.navigate("/checkout/cart")}>
          <MaterialCommunityIcons name="cart-outline" size={24} color={colors.icon} />
          {cart.products_counts ? (
            <View className="absolute -bottom-2 -right-2.5 px-1 bg-primary rounded">
              <Text style={{ fontSize: 10, lineHeight: 16, color: "#fff" }}>
                {cart.products_counts}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>

        {/* LIKE ICON */}
        <TouchableOpacity
          onPress={() => {
            if (productId) {
              setIsLiked((prev) => !prev);
              likeProductApi(productId)
                .then((res) => {
                  if (user) setUser({ ...user, favorites_list: res.data.favorites_list });
                })
                .catch(() => {
                  setIsLiked((prev) => !prev);
                  Toast.show("!خطایی در لایک محصول رخ داده است", { type: "error" });
                });
            }
          }}
        >
          <View>
            <MaterialCommunityIcons
              size={24}
              name={isLiked ? "heart" : "heart-outline"}
              color={isLiked ? colors.primary : colors.icon}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailsHeader;
