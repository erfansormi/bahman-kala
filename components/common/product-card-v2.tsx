import { useLinkTo } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, Pressable } from "react-native";
import { Product } from "../../types/main-page";
import Text from "../ui/text";
import View from "../ui/view";
import DiscountPercentage from "./discount-percentage";

interface Props {
  product: Product;
}

const ProductCardV2 = ({ product }: Props) => {
  const linkTo = useLinkTo();
  const width = Dimensions.get("window").width / 2 - 21;

  return (
    <Pressable
      onPress={() => linkTo(`/products/${product.slug}`)}
      key={product._id}
      testID={product._id}
      style={{
        flexBasis: width,
      }}
      className="overflow-hidden rounded-lg border border-gray-200"
    >
      <View className="flex-col items-center justify-center gap-y-4 bg-white px-3 pb-6 pt-4">
        {/* IMAGE */}
        <View>
          <Image
            className="h-32 w-32"
            source={{ uri: product.image }}
            style={{ objectFit: "contain" }}
          />
        </View>

        {/* TITLE */}
        <View>
          <Text
            size={"xs"}
            numberOfLines={1}
            style={{ width: width - 25 }}
            className="text-gray-600"
          >
            {product.title}
          </Text>
        </View>

        {/* PRICE */}
        <View className="w-full">
          <View className="w-full flex-row items-center justify-between gap-1 text-3xl">
            {/* PERCENTAGE DISCOUNT */}
            {product.sellers[0].variants[0].discount_percentage ? (
              <View>
                <DiscountPercentage
                  discountPercentage={product.sellers[0].variants[0].discount_percentage}
                />
              </View>
            ) : null}

            <View className="flex-row items-center">
              <Text fontFamily="vazirBold" className="text-gray-700">
                {Number(product.sellers[0].variants[0].price + "0000").toLocaleString("fa")}
              </Text>
              <Text size="2xs" fontFamily="vazirBold" className="mr-1">
                تومان
              </Text>
            </View>
          </View>

          {/* OLD PRICE */}
          <View className="h-5">
            <Text size="sm" fontFamily="vazirBold" className="ml-8 text-gray-400 line-through">
              {product.sellers[0].variants[0].old_price
                ? Number(product.sellers[0].variants[0].old_price + "0000").toLocaleString("fa")
                : null}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCardV2;
