import { Cart } from "@/types/cart";
import { create } from "zustand";

export const useCartStore = create<Partial<Cart>>((set) => ({}));
