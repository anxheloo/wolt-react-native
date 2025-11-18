import type { RestaurantMarker } from "@/data/restaurant_markers";
import { restaurantMarkers } from "@/data/restaurant_markers";
import type { Restaurant } from "@/data/restaurants";
import { restaurants } from "@/data/restaurants";

export const restaurantService = {
  /**
   * Get all restaurants
   */
  getAll: async (): Promise<Restaurant[]> => {
    // TODO: Replace with API call when backend is ready
    // return fetch('/api/restaurants').then(res => res.json());
    return Promise.resolve(restaurants);
  },

  /**
   * Get a single restaurant by ID
   */
  getById: async (id: string): Promise<Restaurant | undefined> => {
    // TODO: Replace with API call when backend is ready
    // return fetch(`/api/restaurants/${id}`).then(res => res.json());
    return Promise.resolve(restaurants.find((r) => r.id === id));
  },

  /**
   * Get all restaurant markers for map display
   */
  getMarkers: async (): Promise<RestaurantMarker[]> => {
    // TODO: Replace with API call when backend is ready
    // return fetch('/api/restaurants/markers').then(res => res.json());
    return Promise.resolve(restaurantMarkers);
  },

  /**
   * Search restaurants by query
   */
  search: async (query: string): Promise<Restaurant[]> => {
    // TODO: Replace with API call when backend is ready
    // return fetch(`/api/restaurants/search?q=${query}`).then(res => res.json());
    const lowerQuery = query.toLowerCase();
    return Promise.resolve(
      restaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(lowerQuery) ||
          r.description.toLowerCase().includes(lowerQuery) ||
          r.cuisine.some((c) => c.toLowerCase().includes(lowerQuery))
      )
    );
  },

  /**
   * Filter restaurants by cuisine
   */
  filterByCuisine: async (cuisine: string): Promise<Restaurant[]> => {
    // TODO: Replace with API call when backend is ready
    // return fetch(`/api/restaurants?cuisine=${cuisine}`).then(res => res.json());
    return Promise.resolve(
      restaurants.filter((r) => r.cuisine.includes(cuisine))
    );
  },
};
