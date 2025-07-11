import ProductPrice from "@/components/common/product-price";
import Button from "@/components/ui/button";
import Text from "@/components/ui/text";
import { useCartStore } from "@/store/cart-store";
import { BottomNavigationHeight } from "@/utils/constants/styles";
import { router } from "expo-router";
import React from "react";
import View from "@/components/ui/view";

const CartBottomNavbar = () => {
  const cart = useCartStore();

  return (
    <View
      className="flex items-center border-t-2 bg-white border-t-gray-200 flex-row justify-between px-4"
      style={{
        position: "absolute",
        right: 0,
        left: 0,
        bottom: BottomNavigationHeight,
        height: 70,
      }}
    >
      <View>
        <Button size="base2" onPress={() => router.navigate("/checkout/shipping")}>
          تایید و تکمیل سفارش
        </Button>
      </View>

      <View>
        <Text size="sm" className="text-gray-500">
          جمع سبد خرید
        </Text>
        <View>
          <ProductPrice price={cart.products_prices} />
        </View>
      </View>
    </View>
  );
};

export default CartBottomNavbar;
