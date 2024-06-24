import axiosInstance from "@/libs/axios";
import { ProductStoreType } from "@/store/product-store";
import { CartActionResponse } from "@/types/cart";

export const addProductToCart = (body: ProductStoreType) =>
  axiosInstance.post<CartActionResponse>("/api/v1/users/cart/add-product", body);

export const removeProductFromCart = (body: ProductStoreType) =>
  axiosInstance.post<CartActionResponse>("/api/v1/users/cart/remove-product", body);
