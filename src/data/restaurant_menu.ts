export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: ReturnType<typeof require>;
  isPopular?: boolean;
}

export interface MenuCategory {
  category: string;
  subtitle?: string;
  dishes: Dish[];
}

export const pizzaPerfettoMenu: MenuCategory[] = [
  {
    category: "Speciale",
    subtitle: "Speciale",
    dishes: [
      {
        id: 1,
        name: "Build your own Pizza",
        description:
          "Be individual and build your unique pizza according to your wishes",
        price: 11.75,
        image: require("@/assets/images/dummy/menu/1.png"),
        isPopular: true,
      },
      {
        id: 2,
        name: "Build your own Salad",
        description:
          "Build your own salad now. Be individual and create your unique combination",
        price: 10.95,
        image: require("@/assets/images/dummy/menu/2.png"),
      },
    ],
  },
  {
    category: "Menu della Casa",
    subtitle: "Menu della Casa",
    dishes: [
      {
        id: 3,
        name: "Insalata di Zucca",
        description:
          "Wild herb salad with roasted pumpkin, pomegranate seeds, toasted walnuts",
        price: 12.95,
        image: require("@/assets/images/dummy/menu/3.png"),
      },
      {
        id: 4,
        name: "Risotto alla Zucca e Rucola",
        description:
          "White wine risotto with pumpkin sauce, roasted pumpkin, arugula, toasted walnuts",
        price: 13.95,
        image: require("@/assets/images/dummy/menu/4.png"),
      },
      {
        id: 5,
        name: "Pizza Zucca e Spinaci",
        description:
          "With pumpkin sauce, cheese, roasted pumpkin, spinach, red onions, Italian herbs",
        price: 14.95,
        image: require("@/assets/images/dummy/menu/5.png"),
      },
    ],
  },
  {
    category: "Antipasti",
    subtitle: "Antipasti",
    dishes: [
      {
        id: 6,
        name: "Bruschetta",
        description: "Fresh tomatoes, garlic, basil",
        price: 8.75,
        image: require("@/assets/images/dummy/menu/6.png"),
      },
      {
        id: 7,
        name: "Pizza Pane",
        description: "Pizza bread with tomatoes and garlic",
        price: 6.5,
        image: require("@/assets/images/dummy/menu/7.png"),
      },
      {
        id: 8,
        name: "Focaccia Rosmarino",
        description: "Italian flatbread with rosemary and olive oil",
        price: 7.5,
        image: require("@/assets/images/dummy/menu/8.png"),
      },
    ],
  },
  {
    category: "Insalate",
    subtitle: "Insalate",
    dishes: [
      {
        id: 9,
        name: "Insalata Caprese",
        description: "Tomatoes, mozzarella, basil, olive oil",
        price: 9.95,
        image: require("@/assets/images/dummy/menu/9.png"),
      },
      {
        id: 10,
        name: "Insalata Mista",
        description: "Mixed salad with tomatoes, cucumbers, carrots",
        price: 8.5,
        image: require("@/assets/images/dummy/menu/10.png"),
      },
      {
        id: 11,
        name: "Caesar Salad",
        description:
          "Romaine lettuce, chicken breast, parmesan, Caesar dressing",
        price: 11.95,
        image: require("@/assets/images/dummy/menu/1.png"),
      },
    ],
  },
  {
    category: "Pizza Classiche",
    subtitle: "Pizza Classiche",
    dishes: [
      {
        id: 12,
        name: "Pizza Margherita",
        description: "Tomato sauce, mozzarella, basil",
        price: 9.9,
        image: require("@/assets/images/dummy/menu/2.png"),
        isPopular: true,
      },
      {
        id: 13,
        name: "Pizza Diavola",
        description: "Tomato sauce, mozzarella, spicy salami",
        price: 12.9,
        image: require("@/assets/images/dummy/menu/3.png"),
      },
      {
        id: 14,
        name: "Pizza Quattro Formaggi",
        description:
          "Four cheese varieties: mozzarella, gorgonzola, parmesan, taleggio",
        price: 13.5,
        image: require("@/assets/images/dummy/menu/4.png"),
      },
      {
        id: 15,
        name: "Pizza Prosciutto e Funghi",
        description: "Tomato sauce, mozzarella, ham, mushrooms",
        price: 12.9,
        image: require("@/assets/images/dummy/menu/5.png"),
      },
    ],
  },
  {
    category: "Pasta",
    subtitle: "Pasta",
    dishes: [
      {
        id: 16,
        name: "Spaghetti Carbonara",
        description: "Egg, bacon, parmesan, black pepper",
        price: 11.5,
        image: require("@/assets/images/dummy/menu/6.png"),
        isPopular: true,
      },
      {
        id: 17,
        name: "Penne Arrabbiata",
        description: "Spicy tomato sauce, garlic, chili",
        price: 9.9,
        image: require("@/assets/images/dummy/menu/7.png"),
      },
      {
        id: 18,
        name: "Tagliatelle al Ragù",
        description: "Traditional Bolognese sauce",
        price: 12.9,
        image: require("@/assets/images/dummy/menu/8.png"),
      },
      {
        id: 19,
        name: "Lasagne alla Bolognese",
        description: "Layered pasta with meat sauce and béchamel",
        price: 13.5,
        image: require("@/assets/images/dummy/menu/9.png"),
      },
    ],
  },
  {
    category: "Dolci",
    subtitle: "Dolci",
    dishes: [
      {
        id: 20,
        name: "Tiramisù",
        description: "Classic Italian dessert with mascarpone and espresso",
        price: 5.9,
        image: require("@/assets/images/dummy/menu/10.png"),
      },
      {
        id: 21,
        name: "Panna Cotta",
        description: "Vanilla cream with berry sauce",
        price: 4.9,
        image: require("@/assets/images/dummy/menu/1.png"),
      },
    ],
  },
];

export const getDishById = (id: number): Dish | undefined => {
  const allDishes = pizzaPerfettoMenu.flatMap((category) => category.dishes);
  return allDishes.find((dish) => dish.id === id);
};
