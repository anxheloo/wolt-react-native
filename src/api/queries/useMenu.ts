import { useQuery } from "@tanstack/react-query";
import { menuService } from "../services/menuService";

/**
 * Hook to fetch menu for a restaurant
 */
export const useMenu = (restaurantId: string) => {
  return useQuery({
    queryKey: ["menu", restaurantId],
    queryFn: () => menuService.getMenu(restaurantId),
    enabled: !!restaurantId,
  });
};

/**
 * Hook to fetch a single dish by ID
 */
export const useDish = (dishId: number) => {
  return useQuery({
    queryKey: ["dish", dishId],
    queryFn: () => menuService.getDishById(dishId),
    enabled: !!dishId,
  });
};

/**
 * Hook to fetch popular dishes for a restaurant
 */
export const usePopularDishes = (restaurantId: string) => {
  return useQuery({
    queryKey: ["dishes", "popular", restaurantId],
    queryFn: () => menuService.getPopularDishes(restaurantId),
    enabled: !!restaurantId,
  });
};
