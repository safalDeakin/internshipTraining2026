import { createContext } from "react";
import type { PricelistType } from "../../types/DropdownTypes";

export interface PricelistContextType {
  data: PricelistType[];
  filteredPricelists: PricelistType[];
  loading: boolean;
  search: string;
  setSearch: (search: string) => void;
  addPricelist: (name: string) => Promise<boolean>;
}

export const PricelistContext = createContext<PricelistContextType | null>(
  null,
);
