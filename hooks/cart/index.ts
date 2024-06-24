import { addProductToCart, removeProductFromCart } from "@/services/cart";
import { useCartStore } from "@/store/cart-store";
import { ProductStoreType } from "@/store/product-store";
import { AxiosError } from "axios";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";

export const useCart = () => {
  const cart = useCartStore();
  const toast = useToast();
  const cartSetter = useCartStore.setState;
  const [loading, setLoading] = useState(false);

  const addToCart = (productStore: ProductStoreType) => {
    setLoading(true);
    addProductToCart(productStore)
      .then((res) => {
        cartSetter({ ...cart, ...res.data.user.cart });
      })
      .catch((err: AxiosError<{ message: any }>) => {
        toast.show(err.response?.data?.message || err.message, { type: "error" });
      })
      .finally(() => setLoading(false));
  };

  const removeFromCart = (productStore: ProductStoreType) => {
    setLoading(true);
    removeProductFromCart(productStore)
      .then((res) => {
        cartSetter({ ...cart, ...res.data.user.cart });
      })
      .catch((err: AxiosError<{ message: any }>) => {
        toast.show(err.response?.data?.message || err.message, { type: "error" });
      })
      .finally(() => setLoading(false));
  };

  return {
    removeFromCart,
    addToCart,
    loading,
  };
};
