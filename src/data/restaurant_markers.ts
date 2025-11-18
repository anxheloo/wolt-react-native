export interface RestaurantMarker {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  cuisine: string[];
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
}

export const restaurantMarkers: RestaurantMarker[] = [
  {
    id: "rest_001",
    name: "Pizza Perfetto",
    latitude: 51.9625,
    longitude: 7.6257,
    cuisine: ["Italian", "Pizza"],
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: 1.9,
  },
  {
    id: "rest_002",
    name: "Burgerhaven",
    latitude: 51.9618,
    longitude: 7.6289,
    cuisine: ["American", "Burgers"],
    rating: 4.8,
    deliveryTime: "20-30 min",
    deliveryFee: 2.5,
  },
  {
    id: "rest_003",
    name: "Sushi Takumi",
    latitude: 51.9635,
    longitude: 7.6234,
    cuisine: ["Japanese", "Sushi", "Asian"],
    rating: 4.7,
    deliveryTime: "30-40 min",
    deliveryFee: 2.9,
  },
  {
    id: "rest_004",
    name: "Döner Palace",
    latitude: 51.9642,
    longitude: 7.6312,
    cuisine: ["Turkish", "Kebab", "Mediterranean"],
    rating: 4.5,
    deliveryTime: "15-25 min",
    deliveryFee: 1.5,
  },
  {
    id: "rest_005",
    name: "Pad Thai House",
    latitude: 51.9598,
    longitude: 7.6401,
    cuisine: ["Thai", "Asian", "Vegetarian"],
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: 2.2,
  },
  {
    id: "rest_006",
    name: "Salad Bar Fresh",
    latitude: 51.9611,
    longitude: 7.6298,
    cuisine: ["Healthy", "Salads", "Vegetarian"],
    rating: 4.4,
    deliveryTime: "20-30 min",
    deliveryFee: 2.0,
  },
  {
    id: "rest_007",
    name: "Curry Corner",
    latitude: 51.9589,
    longitude: 7.6445,
    cuisine: ["Indian", "Curry", "Asian"],
    rating: 4.7,
    deliveryTime: "30-40 min",
    deliveryFee: 2.4,
  },
  {
    id: "rest_008",
    name: "Poke Bowl Paradise",
    latitude: 51.9603,
    longitude: 7.6311,
    cuisine: ["Hawaiian", "Healthy", "Seafood"],
    rating: 4.5,
    deliveryTime: "25-35 min",
    deliveryFee: 2.7,
  },
  {
    id: "rest_009",
    name: "La Baguette",
    latitude: 51.9628,
    longitude: 7.6278,
    cuisine: ["French", "Bakery", "Café"],
    rating: 4.8,
    deliveryTime: "20-30 min",
    deliveryFee: 1.8,
  },
  {
    id: "rest_010",
    name: "Taco Loco",
    latitude: 51.9711,
    longitude: 7.6189,
    cuisine: ["Mexican", "Tacos", "Latin American"],
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: 2.3,
  },
];
