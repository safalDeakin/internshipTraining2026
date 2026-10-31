import type { FoodItem } from "../types/OrderingTypes";

// Mock data for ordering frot page
export const foodItems: FoodItem[] = [
  {
    id: 1,
    image: "/images.jpg",
    label: "MoMo",
    date: "2083/01/22",
    status: "N/A",
    type: "food",
  },
  {
    id: 2,
    image: "/images.jpg",
    label: "MoMo",
    date: "2080/01/22",
    type: "food",
  },
  { id: 3, label: "Mojito", date: "2083/01/22", type: "beverage" },
  {
    id: 4,
    image: "/images.jpg",
    label: "MoMo",
    date: "2083/01/22",
    type: "extra",
  },
  {
    id: 5,
    image: "/images.jpg",
    label: "MoMo",
    date: "2083/01/22",
    type: "food",
  },
  {
    id: 6,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    type: "extra",
  },
  {
    id: 7,
    image: "/images.jpg",
    label: "Coke",
    date: "2083/01/22",
    type: "beverage",
  },
  {
    id: 8,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    type: "food",
  },
  {
    id: 9,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    status: "N/A",
    type: "food",
  },
  {
    id: 10,
    label: "Coke",
    date: "2083/01/22",
    status: "N/A",
    type: "beverage",
  },
  {
    id: 11,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    type: "extra",
  },
  {
    id: 12,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    type: "food",
  },
  {
    id: 13,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    type: "food",
  },
  {
    id: 14,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    type: "food",
  },
];

///for filter at top of page
export const ORDER_FILTERS = ["All", "Food", "Drinks", "Extras"] as const;
