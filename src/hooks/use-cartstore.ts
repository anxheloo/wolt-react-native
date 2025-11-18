import { Dish } from "@/data/restaurant_menu";

export interface CartItem {
  dish: Dish;
  quantity: number;
}
