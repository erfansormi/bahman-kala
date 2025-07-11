import React from "react";
import View from "@/components/ui/view";
import Card from "@/components/ui/card";
import Text from "@/components/ui/text";
import { useUserStore } from "@/store/user-store";
import ProfileLayout from "../components/profile-layout";
import FavoriteListProductCard from "./favorite-list-product-card";
import ProductsSlider from "@/components/sliders/products-slider";
import Hr from "@/components/ui/hr";
import { useActivitiesApi } from "@/hooks/fetching/profile";

const MyLists = () => {
  const { user } = useUserStore();
  const { data } = useActivitiesApi();

  return (
    <ProfileLayout>
      <Card emptyTitle="لیست مورد علاقه" isEmpty={!!user && user.favorites_list.length <= 0}>
        <Text fontFamily="vazirBold" className="mb-1 pb-3 border-b border-b-gray-200">
          لیست مورد علاقه
        </Text>

        {user?.favorites_list.map((item, index) => (
          <View key={item._id}>
            <FavoriteListProductCard product={item} index={index} />
          </View>
        ))}
      </Card>

      {data?.recentVisits && (
        <View className="mt-10" style={{ gap: 25 }}>
          <Hr />
          <View style={{ gap: 12 }}>
            <Text size={"lg"}>آخرین بازدید ها</Text>

            <ProductsSlider hasFirstBrandSlide={false} products={data.recentVisits.reverse()} />
          </View>
        </View>
      )}
    </ProfileLayout>
  );
};

export default MyLists;
