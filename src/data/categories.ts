export interface Category {
  id: string;
  name: string;
  placesCount: number;
  image: any;
  backgroundColor: string;
}

export const categories: Category[] = [
  {
    id: "cat_street_food",
    name: "Street Food",
    placesCount: 2,
    image: require("../../assets/images/dummy/categories/street_food.png"),
    backgroundColor: "#E8DCD9",
  },
  {
    id: "cat_burger",
    name: "Burger",
    placesCount: 26,
    image: require("../../assets/images/dummy/categories/burger.png"),
    backgroundColor: "#F5EFCF",
  },
  {
    id: "cat_american",
    name: "American",
    placesCount: 17,
    image: require("../../assets/images/dummy/categories/american.png"),
    backgroundColor: "#F5EFCF",
  },
  {
    id: "cat_chicken",
    name: "Chicken",
    placesCount: 10,
    image: require("../../assets/images/dummy/categories/chicken.png"),
    backgroundColor: "#F4D7C7",
  },
  {
    id: "cat_pizza",
    name: "Pizza",
    placesCount: 42,
    image: require("../../assets/images/dummy/categories/pizza.png"),
    backgroundColor: "#E5E5E5",
  },
  {
    id: "cat_bbq",
    name: "BBQ",
    placesCount: 8,
    image: require("../../assets/images/dummy/categories/bbq.png"),
    backgroundColor: "#E5E5E5",
  },
];
