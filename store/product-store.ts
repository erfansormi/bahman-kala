import { create } from "zustand";

export interface ProductStoreType {
  productId?: string;
  sellerId?: string;
  selectedVariant?: {
    selectedColor?: string;
    _id?: string;
  };
}

export const useProductStore = create<ProductStoreType>((set) => ({}));
