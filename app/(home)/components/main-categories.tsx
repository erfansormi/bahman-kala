import React from "react";
import Text from "@/components/ui/text";
import { mainCategories } from "@/data/home-page";
import SectionTitle from "@/components/common/section-title";
import { FlatList, Image, ScrollView, View } from "react-native";
import RTLScrollView from "@/components/ui/rtl-scrollview";

const MainCategories = () => {
  return (
    <View style={{ backgroundColor: "white" }}>
      <SectionTitle title="خرید بر اساس دسته بندی" />
      <RTLScrollView horizontal className="mx-0.5">
        <FlatList
          numColumns={5}
          data={mainCategories}
          renderItem={({ item }) => (
            <View key={item.id} className="mb-3 w-[116px] items-center">
              <Image width={80} height={80} source={{ uri: item.image }} />
              <Text size="2xs">{item.title}</Text>
            </View>
          )}
        />
      </RTLScrollView>
    </View>
  );
};

export default MainCategories;
