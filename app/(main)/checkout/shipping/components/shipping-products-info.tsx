import React from "react";
import { Image } from "react-native";
import Card from "@/components/ui/card";
import Text from "@/components/ui/text";
import View from "@/components/ui/view";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { useUserStore } from "@/store/user-store";
import { colors } from "@/utils/constants/styles";
import { useShippingStore } from "@/store/shipping-store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProductPrice from "@/components/common/product-price";
import ProductColorBadge from "@/components/common/product-color-badge";

const ShippingProductsInfo = () => {
  const { user } = useUserStore();
  const setter = useShippingStore.setState;
  const { deliveryDate, deliveryHour } = useShippingStore();

  return (
    <Card style={{ gap: 40 }}>
      {/* HEADER */}
      <View className="flex-row items-center" style={{ gap: 12 }}>
        <MaterialCommunityIcons name="truck-fast-outline" size={35} color={colors.primary} />
        <View>
          <View className="flex-row items-center" style={{ gap: 6 }}>
            <Text>ارسال عادی</Text>
            <Badge style={{ padding: 100 }}>{user?.cart.products_counts} کالا</Badge>
          </View>
          <Text size="sm" className="text-gray-500">
            3 روز
          </Text>
        </View>
      </View>

      {/* PRODUCTS */}
      <View className="px-1 flex-row flex-wrap justify-between" style={{ gap: 14 }}>
        {user?.cart.products.map((item, index) => (
          <View key={item._id} style={{ gap: 10 }}>
            <View>
              <Image
                width={85}
                height={85}
                style={{ objectFit: "contain" }}
                source={{ uri: item.product.image }}
              />

              <Badge fontSize="xs" className="absolute -bottom-1 -right-1 px-1.5 py-0.5">
                {item.variant.quantity}
              </Badge>
            </View>

            <View className="justify-center flex-row items-center" style={{ gap: 10 }}>
              {/* SIZE */}
              {item.variant.size && (
                <View className="flex-row items-center" style={{ gap: 4 }}>
                  <Text size="2xs">سایز:</Text>
                  <Text size="xs">{item.variant.size}</Text>
                </View>
              )}

              {/* COLOR */}
              <View className="flex-row items-center" style={{ gap: 4 }}>
                <ProductColorBadge
                  minimalClassName="w-4 h-4"
                  color={item.variant.color}
                  isMinimal
                  isActive
                />
                <Text size="2xs">{item.variant.color}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* FOOTER */}
      <View className="flex-row items-center justify-between">
        <View style={{ gap: 4 }}>
          {deliveryDate && deliveryHour && (
            <View className="flex-row items-center" style={{ gap: 10 }}>
              <Text className="text-gray-500" size="sm">
                زمان ارسال
              </Text>
              <View className="flex-row items-center" style={{ gap: 4 }}>
                <Text size={"sm"}>
                  {Intl.DateTimeFormat("fa", { weekday: "long" }).format(deliveryDate.toDate())}
                </Text>
                <Text>-</Text>
                <Text size={12}>
                  {deliveryHour.replaceAll("am", "").replaceAll("pm", "").replaceAll("-", " تا ")}
                </Text>
              </View>
            </View>
          )}
          <View className="flex-row items-center" style={{ gap: 10 }}>
            <Text className="text-gray-500" size="sm">
              هزینه ارسال
            </Text>
            <ProductPrice price={6} />
          </View>
        </View>

        <View>
          <Button onPress={() => setter({ deliverTimeModal: true })} fontSizes="sm">
            {deliveryDate && deliveryHour ? "تغییر زمان ارسال" : "انتخاب زمان ارسال"}
          </Button>
        </View>
      </View>
    </Card>
  );
};

export default ShippingProductsInfo;
