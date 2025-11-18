import {
  pizzaPerfettoMenu,
  type Dish,
  type MenuCategory,
} from "@/data/restaurant_menu";

export const menuService = {
  /**
   * Get menu for a specific restaurant
   */
  getMenu: async (restaurantId: string): Promise<MenuCategory[]> => {
    // TODO: Replace with API call when backend is ready
    // return fetch(`/api/restaurants/${restaurantId}/menu`).then(res => res.json());

    // For now, we only have menu data for Pizza Perfetto
    if (restaurantId === "rest_001") {
      return Promise.resolve(pizzaPerfettoMenu);
    }
    return Promise.resolve([]);
  },

  /**
   * Get a single dish by ID
   */
  getDishById: async (dishId: number): Promise<Dish | undefined> => {
    // TODO: Replace with API call when backend is ready
    // return fetch(`/api/dishes/${dishId}`).then(res => res.json());
    const allDishes = pizzaPerfettoMenu.flatMap((category) => category.dishes);
    const result = allDishes.find((dish) => dish.id === dishId);
    return Promise.resolve(result);
  },

  /**
   * Get all dishes across all categories
   */
  getAllDishes: async (restaurantId: string): Promise<Dish[]> => {
    // TODO: Replace with API call when backend is ready
    // return fetch(`/api/restaurants/${restaurantId}/dishes`).then(res => res.json());
    const menu = await menuService.getMenu(restaurantId);
    return Promise.resolve(menu.flatMap((category) => category.dishes));
  },

  /**
   * Get popular dishes for a restaurant
   */
  getPopularDishes: async (restaurantId: string): Promise<Dish[]> => {
    // TODO: Replace with API call when backend is ready
    // return fetch(`/api/restaurants/${restaurantId}/dishes/popular`).then(res => res.json());
    const allDishes = await menuService.getAllDishes(restaurantId);
    return Promise.resolve(allDishes.filter((dish) => dish.isPopular));
  },
};
