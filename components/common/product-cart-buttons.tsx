import React from "react";
import Text from "../ui/text";
import Button from "../ui/button";
import View from "@/components/ui/view";
import { useCart } from "@/hooks/cart";
import { useCartStore } from "@/store/cart-store";
import { ProductStoreType } from "@/store/product-store";

const ProductCartButtons = ({
  variantId,
  quantity,
  requestBody,
}: {
  variantId: string;
  quantity?: number;
  requestBody: ProductStoreType;
}) => {
  const cart = useCartStore();
  const { addToCart, loading, removeFromCart } = useCart();

  return (
    <View style={{ width: 165 }}>
      {cart?.products?.find((item) => item.variant._id === variantId) ? (
        <>
          {loading ? (
            <Button size="base2" loading>
              {" "}
            </Button>
          ) : (
            <View className="w-full flex-row justify-between items-center">
              <Button
                onPress={() => addToCart(requestBody)}
                style={{ width: 44, height: 44, alignItems: "center" }}
              >
                +
              </Button>
              <Text style={{ flexBasis: "33.33333%", textAlign: "center" }}>
                {quantity
                  ? quantity
                  : cart.products.find(
                      (item) => item.variant._id === requestBody.selectedVariant?._id
                    )?.variant.quantity || ""}
              </Text>
              <Button
                onPress={() => removeFromCart(requestBody)}
                style={{ width: 44, height: 44, alignItems: "center" }}
              >
                -
              </Button>
            </View>
          )}
        </>
      ) : (
        <Button
          size="base2"
          style={{ width: "100%" }}
          onPress={() => addToCart(requestBody)}
          loading={loading}
        >
          افزودن به سبد خرید
        </Button>
      )}
    </View>
  );
};

export default ProductCartButtons;
