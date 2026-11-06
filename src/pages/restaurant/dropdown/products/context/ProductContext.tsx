import { createContext } from "react";
import type { ProductType } from "../../types/DropdownTypes";

export interface ProductContextType {
  data: ProductType[];
  filteredProducts: ProductType[];
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
}

export const ProductContext = createContext<ProductContextType | null>(null);
