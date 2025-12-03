import { createMMKV } from "react-native-mmkv";
import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import { CartSlice, createCartSlice } from "./createCartSlice";
import { createUserSlice, UserSlice } from "./createUserSlice";

export type AppState = UserSlice & CartSlice;

// Create MMKV instance
const storage = createMMKV();

// Create zustand-compatible storage
const zustandStorage: StateStorage = {
  setItem: (name: string, value: string) => {
    storage.set(name, value);
  },
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name: string) => {
    storage.remove(name);
  },
};

export const useAppStore = create<AppState>()(
  persist(
    (...args) => ({
      ...createUserSlice(...args),
      ...createCartSlice(...args),
    }),
    {
      name: "wolt", // name of the item in storage
      storage: createJSONStorage(() => zustandStorage),
      // Optional: selectively persist only certain fields
      partialize: (state) => ({
        isGuest: state.isGuest,
        user: state.user,
        cart: state.items,
        total: state.total,
        totalItems: state.totalItems,
        selectedRestaurant: state.selectedRestaurant,
      }),
    }
  )
);
