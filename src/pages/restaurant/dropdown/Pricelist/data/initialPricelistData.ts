export type PricelistItem = {
  id: number;
  name: string;
  variant: string;
  code: string;
  type: string;
  price: string;
};

export type Pricelist = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  tax: string;
  status: "Active" | "Inactive";
  items: PricelistItem[];
};

export const initialPricelistData: Pricelist[] = [
  {
    id: "1",
    name: "2024-Winter Special",
    description:
      "Special winter pricelist with selected food and beverage items at promotional prices.",
    startDate: "2082/01/12",
    endDate: "2083/02/22",
    tax: "Tax I",
    status: "Active",
    items: [
      {
        id: 1,
        name: "Pizza Margherita",
        variant: "Small",
        code: "#AF7899",
        type: "Food",
        price: "Rs. 200",
      },
      {
        id: 2,
        name: "Pizza Margherita",
        variant: "Small",
        code: "#AF7899",
        type: "Food",
        price: "Rs. 200",
      },
      {
        id: 3,
        name: "Pizza Pepperoni",
        variant: "Small",
        code: "#AF7899",
        type: "Food",
        price: "Rs. 200",
      },
      {
        id: 4,
        name: "Momo Buff",
        variant: "Fry / Half",
        code: "#AF7899",
        type: "Food",
        price: "Rs. 200",
      },
    ],
  },
  {
    id: "2",
    name: "2024-Summer Special",
    description:
      "Summer special pricelist featuring selected seasonal food and beverage offers.",
    startDate: "2082/03/01",
    endDate: "2082/06/30",
    tax: "Tax I",
    status: "Active",
    items: [
      {
        id: 5,
        name: "Cold Coffee",
        variant: "Regular",
        code: "#CF4582",
        type: "Beverage",
        price: "Rs. 180",
      },
      {
        id: 6,
        name: "Mojito",
        variant: "Large",
        code: "#CF4583",
        type: "Beverage",
        price: "Rs. 250",
      },
    ],
  },
  {
    id: "3",
    name: "Festival Special",
    description:
      "Festival promotional pricelist with special prices for selected restaurant items.",
    startDate: "2082/07/01",
    endDate: "2082/10/30",
    tax: "Tax II",
    status: "Inactive",
    items: [
      {
        id: 7,
        name: "Chicken Momo",
        variant: "Steam / Full",
        code: "#DF7899",
        type: "Food",
        price: "Rs. 300",
      },
      {
        id: 8,
        name: "Fresh Juice",
        variant: "Regular",
        code: "#DF7890",
        type: "Beverage",
        price: "Rs. 150",
      },
    ],
  },
];
