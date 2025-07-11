import { create } from "zustand";
import moment from "moment-jalaali";

export const useShippingStore = create<ShippingStore>(() => ({
  activeDateTab: null,
  deliveryDate: null,
  deliveryHour: null,
  deliverTimeModal: false,
}));

interface ShippingStore {
  activeDateTab: null | number;
  deliverTimeModal: boolean;
  deliveryDate: moment.Moment | null;
  deliveryHour: null | `${number}${"am" | "pm"}-${number}${"am" | "pm"}`;
}
