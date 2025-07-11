import useSWR from "swr";
import { useState } from "react";
import Text from "@/components/ui/text";
import View from "@/components/ui/view";
import Hr from "../../../components/ui/hr";
import TopBanners from "./components/top-banners";
import Navbar from "../../../components/layout/navbar";
import FourthBanner from "./components/fourth-banner";
import { MainPageResponse } from "../../../types/main-page";
import { Ionicons } from "@expo/vector-icons";
import ProductsSlider from "../../../components/sliders/products-slider";
import SupermarketAmazing from "./components/supermarket-amazing";
import MainCategories from "./components/main-categories";
import PopularBrands from "./components/popular-brands";
import BottomNavigation from "@/components/layout/bottom-navigation";
import LoadingScreen from "@/components/common/loading-screen";
import { BottomNavigationHeight } from "@/utils/constants/styles";
import { RefreshControl, ScrollView, TouchableNativeFeedback } from "react-native";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, error, isLoading, mutate } = useSWR<MainPageResponse>("/api/v1/home-data");

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : error ? (
        <View className="flex-1 justify-center items-center" style={{ gap: 8 }}>
          <Text className="text-red-500" size="xl">
            خطا در دریافت دیتا
          </Text>
          <TouchableNativeFeedback onPress={() => mutate()}>
            <View className="flex-row" style={{ gap: 6 }}>
              <Text className="text-red-500" size="xl">
                تلاش دوباره
              </Text>
              <Ionicons name="refresh-outline" size={30} color="rgb(239 68 68)" />
            </View>
          </TouchableNativeFeedback>
        </View>
      ) : (
        data && (
          <View className="flex-1 bg-gray-100">
            <Navbar />
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => {
                    setRefreshing(true);
                    mutate().finally(() => {
                      setRefreshing(false);
                    });
                  }}
                />
              }
            >
              <View style={{ paddingBottom: BottomNavigationHeight, gap: 12 }}>
                <View className="mt-1">
                  <Hr />
                </View>
                <TopBanners />
                <ProductsSlider products={data.most_discount} />

                <SupermarketAmazing />
                <FourthBanner />
                <MainCategories />
                <PopularBrands />

                {/* <ProductsSlider products={data.cheapest} /> */}
                {/* <ProductsSlider products={data.highest_rate} /> */}
              </View>
            </ScrollView>

            <BottomNavigation />
          </View>
        )
      )}
    </>
  );
};

export default Home;
