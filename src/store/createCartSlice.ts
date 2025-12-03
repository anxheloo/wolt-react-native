import { Dish } from "@/data/restaurant_menu";
import { Restaurant } from "@/data/restaurants";
import { StateCreator } from "zustand";

export interface CartItem {
  dish: Dish;
  quantity: number;
}

export interface CartSlice {
  items: CartItem[];
  selectedRestaurant: Restaurant | null;
  setSelectedRestaurant: (restaurant: Restaurant | null) => void;

  total: number;
  totalItems: number;

  addItem: (dish: Dish, quantity?: number) => void;
  removeItem: (dishId: number) => void;
  incrementItem: (dishId: number) => void;
  decrementItem: (dishId: number) => void;
  clearCart: () => void;

  getItemQuantity: (dishId: number) => number;
}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
};

const calculateTotalItems = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

export const createCartSlice: StateCreator<CartSlice> = (set, get) => ({
  items: [],
  total: 0,
  totalItems: 0,
  selectedRestaurant: null,
  setSelectedRestaurant: (restaurant: Restaurant | null) =>
    set({ selectedRestaurant: restaurant }),
  addItem: (dish: Dish, quantity = 1) =>
    set((state) => {
      if (quantity <= 0) return state;
      const existingItem = state.items.find((item) => item.dish.id === dish.id);

      let newItems: CartItem[];
      if (existingItem) {
        // Increase quantity if item exists
        newItems = state.items.map((item) =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        newItems = [...state.items, { dish, quantity }];
      }

      return {
        items: newItems,
        total: calculateTotal(newItems),
        totalItems: calculateTotalItems(newItems),
      };
    }),

  removeItem: (dishId: number) =>
    set((state) => {
      const newItems = state.items.filter((item) => item.dish.id !== dishId);
      return {
        items: newItems,
        total: calculateTotal(newItems),
        totalItems: calculateTotalItems(newItems),
      };
    }),

  incrementItem: (dishId: number) =>
    set((state) => {
      const newItems = state.items.map((item) =>
        item.dish.id === dishId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return {
        items: newItems,
        total: calculateTotal(newItems),
        totalItems: calculateTotalItems(newItems),
      };
    }),

  decrementItem: (dishId: number) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.dish.id === dishId);
      if (!existingItem) return state;

      let newItems: CartItem[];
      if (existingItem.quantity <= 1) {
        // Remove item if quantity would be 0
        newItems = state.items.filter((item) => item.dish.id !== dishId);
      } else {
        // Decrease quantity
        newItems = state.items.map((item) =>
          item.dish.id === dishId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

      return {
        items: newItems,
        total: calculateTotal(newItems),
        totalItems: calculateTotalItems(newItems),
      };
    }),

  clearCart: () =>
    set({ items: [], total: 0, totalItems: 0, selectedRestaurant: null }),

  getItemQuantity: (dishId: number) => {
    const item = get().items.find((item) => item.dish.id === dishId);
    return item ? item.quantity : 0;
  },
});
