import { createContext } from "react";
import type { Pricelist } from "../data/initialPricelistData";

export interface PricelistContextType {
  data: Pricelist[];
  filteredPricelists: Pricelist[];
  loading: boolean;
  search: string;
  setSearch: (search: string) => void;
  addPricelist: (name: string) => Promise<boolean>;
}

export const PricelistContext = createContext<PricelistContextType | null>(
  null,
);
