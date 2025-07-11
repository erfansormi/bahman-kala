import Text from "@/components/ui/text";
import React from "react";
import View from "@/components/ui/view";
import { Image, ScrollView } from "react-native";
import ProfileLayout from "../components/profile-layout";
import { useUserStore } from "@/store/user-store";
import Card from "@/components/ui/card";
import Hr from "@/components/ui/hr";
import moment from "moment-jalaali";
import { jMonths } from "@/utils/date";
import ProductPrice from "@/components/common/product-price";
import ProductColorBadge from "@/components/common/product-color-badge";
import Badge from "@/components/ui/badge";
import "moment";
import "moment/locale/fa";
// import moment from "moment-timezone";

const OrdersPage = () => {
  const { user } = useUserStore();

  return (
    <ProfileLayout>
      <Card
        style={{ gap: 20 }}
        className="bg-gray-50"
        emptyTitle="تاریخچه سفارش ها"
        isEmpty={!user?.orders || !user?.orders.length}
      >
        <Text>تاریخچه سفارش ها</Text>

        {user
          ? user?.orders.map((item, index) => (
              <Card key={item._id + index}>
                <View style={{ gap: 22, paddingVertical: 10 }}>
                  {/* ORDER PRICE AND DATE INFO */}
                  <View style={{ gap: 6 }}>
                    <View className="flex-row items-center justify-between" style={{ gap: 10 }}>
                      <View style={{ gap: 5, flexDirection: "row" }}>
                        <Text size={"sm"}>{moment(item.order_date).locale("fa").jDate()}</Text>
                        <Text size={"sm"}>
                          {(jMonths as any)?.[moment(item.order_date).locale("fa").jMonth()]}
                        </Text>
                        <Text size={"sm"}>{moment(item.order_date).locale("fa").jYear()}</Text>
                      </View>

                      <View className="flex-row items-center" style={{ gap: 5 }}>
                        <Text className="text-gray-400" size={"sm"}>
                          مبلغ
                        </Text>
                        <ProductPrice priceSize={"sm"} price={item.total_prices_cart} />
                      </View>
                    </View>

                    <View className="flex-row items-center justify-between" style={{ gap: 10 }}>
                      <View className="flex-row items-center" style={{ gap: 5 }}>
                        <Text className="text-gray-400" size={"sm"}>
                          تخفیف
                        </Text>
                        <ProductPrice priceSize={"sm"} price={item.total_profit_percentage} />
                      </View>
                      <View className="flex-row items-center" style={{ gap: 5 }}>
                        <Text className="text-gray-400" size={"sm"}>
                          هزینه ارسال
                        </Text>
                        <ProductPrice priceSize={"sm"} price={item.shipping_cost} />
                      </View>
                    </View>
                  </View>

                  <Hr />

                  {/* ORDER EMAIL AND ADDRESS */}
                  <View style={{ gap: 6 }}>
                    <View className="flex-row items-center" style={{ gap: 5 }}>
                      <Text className="text-gray-400" size={"sm"}>
                        ایمیل
                      </Text>
                      <Text size={"sm"}>{user.email}</Text>
                    </View>

                    <View className="flex-row items-center" style={{ gap: 5 }}>
                      <Text className="text-gray-400" size={"sm"}>
                        آدرس
                      </Text>
                      <Text size={"sm"}>{item.address}</Text>
                    </View>
                  </View>

                  <Hr />

                  {/* PRODUCTS */}
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      minWidth: "100%",
                      paddingHorizontal: 4,
                      gap: 16,
                      flexDirection: "row",
                    }}
                  >
                    {item.products.map((item, index) => (
                      <View key={item._id} style={{ gap: 10, alignItems: "center" }}>
                        <View>
                          <Image
                            width={75}
                            height={75}
                            style={{ objectFit: "contain" }}
                            source={{ uri: item.product.image }}
                          />

                          <Badge
                            fontSize="xs"
                            className="absolute -bottom-1 -right-1 px-1.5 py-0.5"
                          >
                            {item.variant.quantity}
                          </Badge>
                        </View>

                        <View className="justify-center flex-row items-center" style={{ gap: 10 }}>
                          {/* SIZE */}
                          {item.variant?.size ? (
                            <View className="flex-row items-center" style={{ gap: 4 }}>
                              <Text size="2xs">سایز:</Text>
                              <Text size="xs">{item.variant.size}</Text>
                            </View>
                          ) : null}

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
                  </ScrollView>
                </View>
              </Card>
            ))
          : null}
      </Card>
    </ProfileLayout>
  );
};

export default OrdersPage;
