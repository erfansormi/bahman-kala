import useSWR from "swr";
import React, { useState } from "react";
import View from "@/components/ui/view";
import { Product } from "@/types/main-page";
import { RefreshControl, ScrollView } from "react-native";
import Navbar from "@/components/layout/navbar";
import Container from "@/components/common/container";
import LoadingScreen from "@/components/common/loading-screen";
import ProductCardV2 from "@/components/common/product-card-v2";
import BottomNavigation from "@/components/layout/bottom-navigation";
import { screenHeight } from "@/utils/dimensions";
import { BottomNavigationHeight } from "@/utils/constants/styles";

const Products = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, mutate } = useSWR<{
    success: boolean;
    products: Product[];
  }>("/api/v1/products");

  return (
    <View className="flex-1">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        data && (
          <>
            <Navbar />
            <Container screenHeight className="bg-gray-100 pt-4">
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
                <View className="flex-1" style={{ minHeight: screenHeight }}>
                  <View
                    className="flex-row flex-wrap"
                    style={{
                      gap: 10,
                      paddingBottom: BottomNavigationHeight + 10,
                    }}
                  >
                    {data.products.map((item, index) => (
                      <ProductCardV2 key={item._id} product={item} />
                    ))}
                  </View>
                </View>
              </ScrollView>
            </Container>
          </>
        )
      )}
      <BottomNavigation />
    </View>
  );
};

export default Products;
