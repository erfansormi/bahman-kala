import Button from "@/components/ui/button";
import Text from "@/components/ui/text";
import { useProductDetails } from "@/hooks/fetching/products";
import { addProductToCart, removeProductFromCart } from "@/services/cart";
import { useCartStore } from "@/store/cart-store";
import { useProductStore } from "@/store/product-store";
import { AxiosError } from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import View from "@/components/ui/view";
import { useToast } from "react-native-toast-notifications";

const ProductDetailsBottomNavbar = () => {
  const toast = useToast();
  const productStore = useProductStore();
  const cartStore = useCartStore();
  const cartSetter = useCartStore.setState;
  const { slug } = useLocalSearchParams();
  const { data } = useProductDetails(slug as string);
  const product = data?.product;
  const [loading, setLoading] = useState(false);
  const isProductInCart =
    cartStore &&
    cartStore.products &&
    cartStore.products.find(
      (item) =>
        item.variant._id === productStore.selectedVariant?._id &&
        item.variant.color === productStore.selectedVariant.selectedColor
    );

  const addToCart = () => {
    setLoading(true);
    addProductToCart(productStore)
      .then((res) => {
        console.log("reaponse: ", res.data.user.cart);
        cartSetter({ ...cartStore, ...res.data.user.cart });
      })
      .catch((err: AxiosError<{ message: any }>) => {
        toast.show(err.response?.data?.message || err.message, { type: "error" });
      })
      .finally(() => setLoading(false));
  };

  const removeFromCart = () => {
    setLoading(true);
    removeProductFromCart(productStore)
      .then((res) => {
        cartSetter({ ...cartStore, ...res.data.user.cart });
      })
      .catch((err: AxiosError<{ message: any }>) => {
        toast.show(err.response?.data?.message || err.message, { type: "error" });
      })
      .finally(() => setLoading(false));
  };

  return (
    <View className="border-t-2 border-t-gray-200 basis-[70px] inset-x-0 ">
      <View className="flex-row items-center justify-between w-full h-full px-5">
        <View style={{ width: 170 }}>
          {!!isProductInCart ? (
            <React.Fragment>
              {loading ? (
                <Button size="base" loading>
                  {" "}
                </Button>
              ) : (
                <View className="w-full flex-row justify-between items-center">
                  <Button size="base" onPress={addToCart} style={{ flexBasis: "33.33333%" }}>
                    +
                  </Button>
                  <Text style={{ flexBasis: "33.33333%", textAlign: "center" }}>
                    {isProductInCart.variant.quantity}
                  </Text>
                  <Button size="base" onPress={removeFromCart} style={{ flexBasis: "33.33333%" }}>
                    -
                  </Button>
                </View>
              )}
            </React.Fragment>
          ) : (
            <Button size="base" style={{ width: "100%" }} onPress={addToCart} loading={loading}>
              افزودن به سبد خرید
            </Button>
          )}
        </View>
        <View>
          <View className="flex-row">
            <Text>{Number(product?.sellers[0].variants[0].price + "0000").toLocaleString()}</Text>
            <Text size="sm" className="mr-1">
              تومان
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailsBottomNavbar;
