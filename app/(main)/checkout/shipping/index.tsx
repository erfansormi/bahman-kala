import Container from "@/components/common/container";
import ProductPrice from "@/components/common/product-price";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Text from "@/components/ui/text";
import View from "@/components/ui/view";
import { useShippingStore } from "@/store/shipping-store";
import { useUserStore } from "@/store/user-store";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Toast } from "react-native-toast-notifications";
import ShippingSelectDateModal from "./components/shipping-delivery-time-modal";
import ShippingProductsInfo from "./components/shipping-products-info";

const Shipping = () => {
  const { user } = useUserStore();
  const { deliveryDate, deliveryHour } = useShippingStore();

  return (
    <>
      <Container withStatusBarOffset windowHeight className="bg-gray-100 !px-0">
        <ScrollView contentContainerStyle={{ gap: 8, paddingBottom: 98, height: "100%" }}>
          {/* HEADER */}
          <Card className="pt-2 pb-3 bg-white !border-x-0 !border-t-0">
            <Text fontFamily="vazirBold" size="xl" className="text-primary text-center">
              بهمان کالا
            </Text>

            <TouchableOpacity onPress={() => router.navigate("/checkout/cart")}>
              <View className="flex-row items-center" style={{ gap: 4 }}>
                <AntDesign name="arrowright" size={20} color="#555" />
                <Text>سبد خرید</Text>
              </View>
            </TouchableOpacity>
          </Card>

          {/* SELECTED ADDRESS */}
          {/* <Card className="bg-white flex-row items-center" style={{ gap: 5 }}>
            <MaterialCommunityIcons name="map-marker-outline" size={24} color={colors.icon} />
            <View style={{ gap: 5 }}>
              <Text className="text-gray-600" size="sm">
                آدرس تحویل سفارش
              </Text>
              <Text>{user?.addresses?.[0].postal_address}</Text>
              <Text className="text-gray-600" size="sm">
                {user?.first_name} {user?.last_name}
              </Text>
            </View>
          </Card> */}

          {/* SELECTED PRODUCTS INFO */}
          <ShippingProductsInfo />

          {/* PAYMENT INFO */}
          <Card>
            <View className="flex-row py-2.5 justify-between items-center border-b border-b-gray-300">
              <Text className="text-gray-500" size="sm">
                قیمت کالاها ({user?.cart.products_counts})
              </Text>
              <ProductPrice price={user?.cart.products_prices} />
            </View>
            <View className="flex-row py-2.5 justify-between items-center border-b border-b-gray-300">
              <Text className="text-gray-500" size="sm">
                هزینه ارسال
              </Text>
              <ProductPrice price={6} />
            </View>
            <View className="flex-row py-2.5 justify-between items-center">
              <Text className="text-gray-500" size="sm">
                قابل پرداخت
              </Text>
              <ProductPrice
                price={user?.cart.products_prices ? user.cart.products_prices + 6 : undefined}
              />
            </View>
          </Card>
        </ScrollView>
        {/* BOTTOM PAYMENT BUTTONS */}
        <Card
          style={{ height: 90 }}
          className="flex-row justify-between absolute bottom-0 inset-x-0 border-t border-t-gray-300 items-center"
        >
          <View className="py-1">
            {deliveryDate && deliveryHour ? (
              <Button
                onPress={() => {
                  Toast.show(
                    "بدلیل تحریم ها و عدم امکان استفاده از گوگل مپ و نیاز بکند این پروژه به ثبت آدرس قبل از ارسال سفارش، فعلا امکان ثبت سفارش نمی‌باشد!",
                    {
                      type: "danger",
                      textStyle: {
                        width: Dimensions.get("window").width - 100,
                        fontFamily: "vazir",
                      },
                      duration: 7000,
                    }
                  );
                }}
                size={"base2"}
                fontSizes={14}
              >
                ثبت سفارش
              </Button>
            ) : (
              <Button
                size={"base2"}
                fontSizes={14}
                variant="outline"
                onPress={() => useShippingStore.setState({ deliverTimeModal: true })}
              >
                انتخاب زمان ارسال
              </Button>
            )}
          </View>
          <View>
            <Text size="sm">جمع سبد خرید</Text>
            <ProductPrice
              price={user?.cart.products_prices ? user.cart.products_prices + 6 : undefined}
            />
          </View>
        </Card>

        {/* DELIVERY TIME MODAL */}
        <ShippingSelectDateModal />
      </Container>
    </>
  );
};

export default Shipping;
