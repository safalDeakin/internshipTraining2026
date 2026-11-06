import type { ProductType } from "../../types/DropdownTypes";

export const initialProductData: ProductType[] = [
  {
    id: "1",
    name: "Pizza",
    code: "PZ1212QW",
    status: "Active",
    items: [
      {
        id: "i1",
        name: "Margerita",
        sku: "PZ1212QW",
        description: "Made with Cheese, Pizza Sauce, Oregano, Rosemarry",
        calories: "2840Kcal",
        image: "https://placehold.co/80x80?text=Pizza",
      },
      {
        id: "i2",
        name: "Paperoni",
        sku: "PZ1212QW",
        description: "Made with Cheese, Pizza Sauce, Oregano, Rosemarry",
        calories: "2840Kcal",
        image: "https://placehold.co/80x80?text=Pizza",
      },
    ],
    attributes: [
      ["Small", "Large", "Family"],
      ["Thin Crust", "Thick Crust", "Cheesy"],
    ],
    tags: ["Italian", "Cheesy", "Famous"],
  },
];
