import { useProductStore } from "@/store/product-store";
import { Product } from "@/types/main-page";
import useSWR from "swr";

interface ProductDetailsResponse {
  success: boolean;
  product: Product;
}

interface ProductsResponse {
  success: boolean;
  products: Product[];
}

export const useProductDetails = (slug: string) => {
  const setter = useProductStore.setState;

  const data = useSWR<ProductDetailsResponse>(`/api/v1/products/${slug}`, {
    onSuccess(data, key, config) {
      const product = data.product;

      setter({
        productId: product._id,
        selectedVariant: {
          _id: product.sellers[0].variants[0]._id,
          selectedColor: product.sellers[0].variants[0].colors[0],
        },
        sellerId: (product.sellers[0].seller as any)._id,
      });
    },
  });

  return data;
};

export const useProducts = () => {
  const products = useSWR<ProductsResponse>("/api/v1/products");

  return products;
};
