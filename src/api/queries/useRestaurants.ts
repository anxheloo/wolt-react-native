import { useQuery } from "@tanstack/react-query";
import { restaurantService } from "../services/restaurantService";

/**
 * Hook to fetch all restaurants
 */
export const useRestaurants = () => {
  return useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return restaurantService.getAll();
    },
  });
};

/**
 * Hook to fetch a single restaurant by ID
 */
export const useRestaurant = (id: string) => {
  return useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => restaurantService.getById(id),
    enabled: !!id,
  });
};

/**
 * Hook to fetch restaurant markers for map
 */
export const useRestaurantMarkers = () => {
  return useQuery({
    queryKey: ["restaurant-markers"],
    queryFn: restaurantService.getMarkers,
  });
};
