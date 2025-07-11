import SectionTitle from "@/components/common/section-title";
import Text from "@/components/ui/text";
import View from "@/components/ui/view";
import { mainCategories } from "@/data/home-page";
import React from "react";
import { FlatList, Image, ScrollView } from "react-native";

const MainCategories = () => {
  return (
    <View style={{ backgroundColor: "white" }}>
      <SectionTitle title="خرید بر اساس دسته بندی" />
      <ScrollView horizontal className="mx-0.5">
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
      </ScrollView>
    </View>
  );
};

export default MainCategories;
