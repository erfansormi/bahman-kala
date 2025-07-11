import React from "react";
import Text from "../ui/text";
import View from "../ui/view";
import { Image, Pressable } from "react-native";
import { Product } from "../../types/main-page";
import DiscountPercentage from "./discount-percentage";
import { useLinkTo } from "@react-navigation/native";
import ProductPrice from "./product-price";

interface Props {
  index: number;
  product: Product;
  productsLength: number;
}

const ProductCard = ({ index, product, productsLength }: Props) => {
  const linkTo = useLinkTo();

  return (
    <Pressable
      onPress={() => linkTo(`/products/${product.slug}`)}
      key={product._id}
      testID={product._id}
      style={{
        flexBasis: 150,
        overflow: "hidden",
        marginEnd: index + 1 === productsLength ? 10 : 4,
        borderBottomStartRadius: index === 0 ? 10 : 2,
        borderTopStartRadius: index === 0 ? 10 : 2,
        borderBottomEndRadius: index + 1 === productsLength ? 10 : 2,
        borderTopEndRadius: index + 1 === productsLength ? 10 : 2,
      }}
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
          <Text numberOfLines={1} style={{ width: 150 }} size={"xs"} className="text-gray-600">
            {product.title}
          </Text>
        </View>

        {/* PRICE */}
        <View className="w-full h-10">
          <View
            className={`w-full flex-row items-center gap-1 text-3xl ${
              product.sellers[0].variants[0].discount_percentage ? "justify-between" : "justify-end"
            }`}
          >
            {/* PERCENTAGE DISCOUNT */}
            {product.sellers[0].variants[0].discount_percentage ? (
              <View>
                <DiscountPercentage
                  discountPercentage={product.sellers[0].variants[0].discount_percentage}
                />
              </View>
            ) : null}

            <ProductPrice price={product.sellers[0].variants[0].price} />
          </View>

          {/* OLD PRICE */}
          <ProductPrice oldPrice={product.sellers[0].variants[0].old_price} />
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCard;
