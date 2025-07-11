import React, { useState } from "react";
import Hr from "@/components/ui/hr";
import Text from "@/components/ui/text";
import View from "@/components/ui/view";
import { useLocalSearchParams } from "expo-router";
import Container from "@/components/common/container";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LoadingScreen from "@/components/common/loading-screen";
import ProductsSlider from "@/components/sliders/products-slider";
import { Image, RefreshControl, ScrollView } from "react-native";
import ProductDetailsHeader from "./components/product-details-header";
import { useProductDetails, useProducts } from "@/hooks/fetching/products";
import ProductDetailsBottomNavbar from "./components/product-details-bottom-navbar";
import ProductSelectVariant from "./components/product-select-variant";

const ProductDetails = () => {
  const { slug } = useLocalSearchParams();
  const { data, isLoading, mutate } = useProductDetails(slug as string);
  const product = data?.product;
  const products = useProducts();
  const [refreshing, setRefreshing] = useState(false);

  return (
    <View className="flex-1">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        product && (
          <Container windowHeight withStatusBarOffset>
            {/* HEADER */}
            <ProductDetailsHeader />

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
              style={{ paddingTop: 20 }}
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
              <View style={{ gap: 20 }}>
                {/* BREDCRUMB */}
                <View className="flex-row" style={{ gap: 4 }}>
                  <Text size="sm" className="text-gray-500">
                    بهمان کالا
                  </Text>
                  <Text size="sm" className="text-gray-500">
                    /
                  </Text>
                  <Text size="sm" className="text-gray-500">
                    {product.category}
                  </Text>
                </View>

                {/* IMAGE */}
                <View className="w-full items-center">
                  <Image
                    style={{ objectFit: "contain" }}
                    source={{ uri: product.image }}
                    width={250}
                    height={250}
                  />
                </View>

                {/* TITLE */}
                <View style={{ gap: 4 }}>
                  <Text className="text-cyan-500" size="sm">
                    {product.category}
                  </Text>
                  <Text size="lg">{product.title}</Text>
                </View>

                {/* RATES */}
                <View className="flex-row items-center" style={{ gap: 15 }}>
                  {/* RATES */}
                  <View className="flex-row items-center" style={{ gap: 4 }}>
                    <MaterialCommunityIcons
                      style={{ marginTop: -3 }}
                      name="star"
                      color={"orange"}
                      size={22}
                    />
                    <View>
                      <Text className="text-gray-500" size="xs">
                        {product.rating.rate}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-gray-400" size="xs">
                        (امتیاز {product.rating.count} خریدار)
                      </Text>
                    </View>
                  </View>

                  <View className="rounded-full bg-gray-300 w-3 h-3 -mt-1" />

                  {/* COMMENTS COUNT */}
                  <View className="flex-row items-center" style={{ gap: 4 }}>
                    <Text size="xs" className="text-cyan-500">
                      {product.comments ? product.comments.length : 0}
                    </Text>
                    <Text size="xs" className="text-cyan-500">
                      دیدگاه
                    </Text>
                  </View>
                </View>

                {/* ATTRIBUTES */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 10, flexDirection: "row" }}
                >
                  {product.attributes.map((item) => (
                    <View key={item._id} className="px-3 py-1 bg-gray-200/60 rounded-lg">
                      <Text className="text-gray-500 capitalize" size="xs">
                        {item.name}
                      </Text>
                      <Text className="capitalize" size="sm">
                        {item.value}
                      </Text>
                    </View>
                  ))}
                </ScrollView>

                <View className="my-2">
                  <Hr />
                </View>

                {/* SELECT PRODUCT SIZE AND COLOR */}
                <ProductSelectVariant />

                {products.data?.products && (
                  <View>
                    <Text fontFamily="vazirBold" className="mb-2">
                      محصولات مرتبط
                    </Text>
                    <ProductsSlider
                      hasFirstBrandSlide={false}
                      products={products.data.products.filter(
                        (item) => item.category === product.category
                      )}
                    />
                  </View>
                )}
              </View>
            </ScrollView>

            {/* BOTTOM NAVIGATION IN PRODUCT DETAILS PAGES */}
            <ProductDetailsBottomNavbar />
          </Container>
        )
      )}
    </View>
  );
};

export default ProductDetails;
