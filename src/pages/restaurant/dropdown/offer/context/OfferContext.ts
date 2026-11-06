import { createContext } from "react";
import type { Offer } from "../data/initialOfferData";

export interface OfferContextType {
  data: Offer[];
  filteredOffers: Offer[];
  loading: boolean;
  search: string;
  setSearch: (search: string) => void;
  addOffer: (name: string) => Promise<boolean>;
}

export const OfferContext = createContext<OfferContextType | null>(null);
