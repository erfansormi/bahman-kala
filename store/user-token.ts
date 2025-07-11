import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

interface UserTokenStore {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useUserTokenStore = create<UserTokenStore>((set) => ({
  token: SecureStore.getItem("token"),
  setToken: (token) => set(() => ({ token })),
}));
