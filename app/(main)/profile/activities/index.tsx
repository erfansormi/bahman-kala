import React from "react";
import { router } from "expo-router";
import Card from "@/components/ui/card";
import Text from "@/components/ui/text";
import View from "@/components/ui/view";
import { Product } from "@/types/main-page";
import ProfileLayout from "../components/profile-layout";
import { useActivitiesApi } from "@/hooks/fetching/profile";
import { Dimensions, Image, Pressable } from "react-native";
import ProductPrice from "@/components/common/product-price";
import LoadingScreen from "@/components/common/loading-screen";
import DiscountPercentage from "@/components/common/discount-percentage";

const RecentVisits = () => {
  const { data, isLoading } = useActivitiesApi();
  const reversedData: Product[] = [];
  data?.recentVisits.forEach((item) => reversedData.push(item));

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ProfileLayout>
          <Card emptyTitle="اخرین بازدیدها" isEmpty={!!data && data.recentVisits.length <= 0}>
            <Text fontFamily="vazirBold" className="mb-1 pb-3 border-b border-b-gray-200">
              اخرین بازدیدها
            </Text>

            {reversedData.map((item, index) => (
              <Pressable
                key={item._id + index}
                onPress={() => {
                  router.navigate(`/products/${item.slug}`);
                }}
              >
                <View
                  className={`border-b border-b-gray-300 py-5 ${
                    reversedData.length === index + 1 && "border-b-0"
                  }`}
                  style={{ gap: 12 }}
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
                      <ProductPrice price={item.sellers[0].variants[0].price} />
                    </View>
                    <ProductPrice oldPrice={item.sellers[0].variants[0].old_price} />
                  </View>
                </View>
              </Pressable>
            ))}
          </Card>
        </ProfileLayout>
      )}
    </>
  );
};

export default RecentVisits;
