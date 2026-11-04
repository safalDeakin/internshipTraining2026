import { createContext } from "react";
import type { ProductGroup } from "../data/initialProductData";

export interface ProductContextType {
  data: ProductGroup[];
  filteredProducts: ProductGroup[];
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
}

export const ProductContext = createContext<ProductContextType | null>(null);
